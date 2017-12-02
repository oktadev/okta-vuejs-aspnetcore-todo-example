import OktaAuth from '@okta/okta-auth-js'

const org = 'https://atko-corporation-application.oktapreview.com',
      clientId = '0oad3vg4xopdgrdZI0h7',
      redirectUri = 'http://localhost:5000',
      authorizationServer = 'default'

const oktaAuthClient = new OktaAuth({
  url: org,
  issuer: authorizationServer,
  clientId,
  redirectUri
})

export default {
  client: oktaAuthClient
}
