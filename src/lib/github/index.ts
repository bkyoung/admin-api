import { Octokit } from 'octokit'

const defaultGithubOwner = process.env.GITHUB_DEFAULT_OWNER || ''

const newGithubClient = (authConfig?: any) => {
  const auth = authConfig || process.env.GITHUB_TOKEN
  if (!auth && Object.keys(auth).length === 0) {
    throw Error('No auth config object was provided and the environment variable GITHUB_TOKEN is not set')
  }
  const github = new Octokit({ auth })
  return github
}

