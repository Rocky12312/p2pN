const express = require('express');

const { registerPeer, getPeers } = require('../Peers/peersEP.js');

const router = express.Router();

//router.get('/', getPosts);
router.post('/register', registerPeer);//registerPeer handles both peer registration and deregistration
router.get('/getPeers', getPeers);//gets all the peers based on req.peerStatus

module.exports = router;