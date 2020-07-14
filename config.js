module.exports = {

  resourceServer: {
    port: 8000,
    oidc: {
      clientId: process.env.SPA_CLIENT_ID,
      issuer: process.env.ISSUER,
      testing: {
        disableHttpsCheck: process.env.OKTA_TESTING_DISABLEHTTPSCHECK
      }
    },
    assertClaims: {
      aud: 'api://default',
      cid: process.env.SPA_CLIENT_ID
    }
  }
};