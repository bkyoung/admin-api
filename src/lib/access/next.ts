import * as jose from 'jose';
import type { NextRequest } from 'next/server';

// https://developers.cloudflare.com/cloudflare-one/identity/users/validating-json/
/**
 * Accepts a Cloudflare Access token as input and performs verification against the public JWKS
 * @parameter jwt - the token being verified
 * @returns - boolean indicating jwt passed verification (true) or not (false)
 */
export const validAccessJwt = async (jwt: string) => {
  const audience = process.env.CLOUDFLARE_APPLICATION_AUDIENCE || '4425dcdf30537e738c615659...91fbc2'
  const issuer = process.env.CLOUDFLARE_ACCESS_URL || 'https://yourteam.cloudflareaccess.com'
  const jwks_uri = process.env.CLOUDFLARE_CERTS_URL || `${issuer}/cdn-cgi/access/certs`
  const JWKS = jose.createRemoteJWKSet(new URL(jwks_uri))
  
  const { payload } = await jose.jwtVerify(jwt, JWKS, {
    issuer,
    audience,
  })

  if (!payload || Object.keys(payload).length === 0) {
    return false
  }

  return true
}

/**
 * Pluck the Cloudflare token from either the header or cookie of the incoming request
 * @returns - the token as a string or throws if a token is not found
 */
export const getAccessJwt = (req: NextRequest) => {
  let token = req.headers.get('Cf-Access-Jwt-Assertion') || req.cookies.get("CF_Authorization")?.value
  if (!token) {
    throw Error('No token on request')
  }
  return token
}
