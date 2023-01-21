import { ECRClient, DescribeImagesCommand } from "@aws-sdk/client-ecr"
import { sortObjectsByDate } from '../utils'

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1'

const getImageData = async (repositoryName, imageTag = '', imageDigest = '') => {
  const imageIdentifier = []
  if (imageTag) {
    imageIdentifier.push(imageTag)
  }
  if (imageDigest) imageIdentifier.push(imageDigest)
  const ecr = new ECRClient({ region })
  const descCmdInput = {
    repositoryName,
    filter: {
      tagStatus: 'TAGGED',
    },
    imageIdentifier,
    maxResults: 1000,
  }
  const containerDescCmd = new DescribeImagesCommand(descCmdInput)
  try {
    const data = await (await ecr.send(containerDescCmd))
    const images = data.imageDetails.reduce((i, d) => {
      const img = {
        image: d.repositoryName,
        version: d.imageTags.filter(t => t.match(/^\d+\.\d+\.\d+((\-alpha|\-rc)\.\d+)?$/))[0],
        buildNumber: d.imageTags.filter(t => t.match(/^build-.*$/))[0],
        prNumber: d.imageTags.filter(t => t.match(/^pr-.*$/))[0],
        commit: d.imageTags.filter(t => t.match(/^main-.*$/))[0]?.split('-')[1],
        digest: d.imageDigest,
        publishDate: d.imagePushedAt,
      }
      if (img.image && img.version && img.publishDate) return i.concat([img])
      return i
    }, [])
    const sorted = sortObjectsByDate(images, 'publishDate')
    return sorted
  } catch (error) {
    console.log('Error gathering image list from ECR repo: ', error)
  }
  return []
}

export const getPrNumberFromImageVersion = async (version, repositoryName = '') => {
  if (!repositoryName) return undefined
  try {
    const imageTag = version
    const data = await getImageData(repositoryName, imageTag)
    const images = data.filter((img) => !!img.prNumber)
    if (images.length > 0) return images[0].prNumber
    return undefined
  } catch (error) {
    console.log('Error gathering image list from ECR repo: ', error)
  }
  return []
}

export default getImageData