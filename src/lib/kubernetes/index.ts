import { sortObjectsByDate } from '../utils';
import k8s from '@kubernetes/client-node';

const newKubernetesClient = () => {
  try {
    const kc = new k8s.KubeConfig()
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    return k8sApi
  } catch (e) {
    console.log('ERROR', e)
  }
}

const calculateDeploymentStatus = (status) => {
  const { availableReplicas, replicas } = status

  if (availableReplicas === replicas && availableReplicas > 0) {
    return 'Available'
  }
  
  if (availableReplicas === 0) {
    return 'Offline'
  } 
  
  return 'Transitioning'
}

const calculateDnsName = (domain = 'example.com') => (app) => `${app}-internal.${domain}`

const getLastStatusUpdate = (conditions) => {
  const dates = conditions.reduce((acc, c) => {
    if (c.status === "True") return acc.concat(c)
    return acc
  }, [])

  const sorted = sortObjectsByDate(dates, 'lastUpdateTime')
  return sorted.reverse()[0].lastUpdateTime
}

const listifyLabels = (labels) => {
  return Object.keys(labels).map((label) => ({ name: label, value: labels[label] }))
}

const listAllAppDeployments = async (application = '') => {
  const kube = newKubernetesClient()
  const res = await kube.listDeploymentForAllNamespaces()
  const items = res.body.items
  const deployments = items.reduce((acc, item) => {
    if (item.metadata.name === application) {
      return acc.concat([{
        dnsName: item.metadata.labels['app.kubernetes.io/dnsname'] || calculateDnsName(application),
        environment: item.metadata.namespace,
        labels: listifyLabels(item.metadata.labels),
        lastStatusUpdate: getLastStatusUpdate(item.status.conditions),
        status: calculateDeploymentStatus(item.status),
        version: item.metadata.labels['app.kubernetes.io/version'] || item.spec.template.spec.containers[0].image.split(':')[1],
      }])
    }
    return acc
  }, [])
  return deployments
}

const listPods = async (namespace = 'dev', name = '') => {
  const kc = new k8s.KubeConfig()
  kc.loadFromDefault();
  const kube = kc.makeApiClient(k8s.CoreV1Api);
  const res = await kube.listNamespacedPod(namespace)
  const pods = res.body.items
  if (name) return pods.filter(pod => pod.metadata.name.includes(name))
  return pods
}

export {
  calculateDeploymentStatus,
  getLastStatusUpdate,
  listifyLabels,
  listPods,
  listAllAppDeployments
}