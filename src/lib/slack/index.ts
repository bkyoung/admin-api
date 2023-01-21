import { App } from '@slack/bolt';
import { WebClient } from '@slack/web-api';

// Just a bare Slack App
const newSlackApp = ({ token, signingSecret, socketMode, appToken } = {
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  token: process.env.SLACK_BOT_TOKEN,
}) => {
  return new App({
    token,
    signingSecret,
    socketMode,
    appToken,
  })
}

// Just a bare Slack Web Client
const newSlackWebClient = (...args: any) => {
  const { token, loggingLevel } = args
  const slackToken = token || process.env.SLACK_BOT_TOKEN || ''
  const logLevel = loggingLevel || process.env.SLACK_LOG_LEVEL || undefined // e.g. SLACK_LOG_LEVEL=LogLevel.DEBUG
  const slackClient = new WebClient(slackToken, {
    logLevel,
  })
  return slackClient
}

// A reusable Web Client for a single channel, great for single messages/notifications
const newSlackChannelClient = async (channel: string, ...clientOpts: any) => async (text) => {
  const slackClient = newSlackWebClient(...clientOpts)
  try {
    const { ok } = await slackClient.chat.postMessage({
      channel,
      text,
    })
    if (ok) return true;
    return false;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

export { newSlackApp, newSlackWebClient, newSlackChannelClient }