const fs = require('fs');
const jose = require('jose');
const { isKubernetes } = require('../utils');

const VAULT_AUTH_METHOD = process.env.VAULT_AUTH_METHOD

/**
 * Kubernetes auth method for Vault
 * 
 * @params serviceAccount - a string specifying the service account name to use when authenticating to Vault,
 *                          if different than the service account the service is actually running under, as 
 *                          this is the role in Vault that will be assumed upon authenticating.
 * @params token - can be either:
 *                 (a) a filesystem path to a file whose contents is a token, or 
 *                 (b) a string that is the token itself
 */
const kubernetes = ({ serviceAccount = '', token = '/run/secrets/kubernetes.io/serviceaccount/token' } = {}) => {
  if (!isKubernetes()) throw Error('Skipping vault login: we do not appear to be on a Kubernetes system')
  const ca = fs.readFileSync('/vault/tls/ca.crt')
  const vault = require('node-vault')({
    endpoint: 'https://vault.secret.svc.cluster.local',
    requestOptions: { ca }
  });
  const jwt = fs.existsSync(token) ? fs.readFileSync(token).toString() : token
  const role = serviceAccount || jwt ? jose.decodeJwt(jwt)["kubernetes.io"]["serviceaccount"]["name"] : ''
  return vault.kubernetesLogin({ role, jwt })
}

const newVaultClient = ({ authMethod = VAULT_AUTH_METHOD, ...args } = {}) => {
  switch (authMethod) {
    case 'kubernetes':
      return kubernetes({ ...args });
    default:
      return Error(`Login method '${authMethod}' unsupported by this lib.  Add it.`)
  }
}

export {
  newVaultClient
}