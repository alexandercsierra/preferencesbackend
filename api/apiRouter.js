const express = require('express');
require('dotenv')
const router = express.Router();
const restricted = require('../middleware/restricted')
const authRouter = require('../auth/authRouter')
const listsRouter = require ('../lists/listsRouter')
const itemsRouter = require('../items/itemsRouter')
const friendsRouter = require('../friends/friendsRouter')
const OktaJwtVerifier = require('@okta/jwt-verifier');
const sampleConfig = require('../config');


const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: sampleConfig.resourceServer.oidc.clientId,
    issuer: sampleConfig.resourceServer.oidc.issuer,
    assertClaims: sampleConfig.resourceServer.assertClaims,
    testing: sampleConfig.resourceServer.oidc.testing
  });


  function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    // const match = authHeader.match(/Bearer (.+)/);

  
    // if (!match) {
    //   res.status(401);
    //   return next('Unauthorized');
    // }
  
    const accessToken = JSON.parse(authHeader).accessToken.accessToken;
    const audience = sampleConfig.resourceServer.assertClaims.aud;
    return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
      .then((jwt) => {
        req.jwt = jwt;
        // console.log(jwt)
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
  }

router.use('/auth', authenticationRequired, authRouter);
router.use('/lists', authenticationRequired, listsRouter);
router.use('/items', authenticationRequired, itemsRouter);
router.use('/friends', authenticationRequired, friendsRouter);

module.exports = router;