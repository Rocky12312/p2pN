const express = require('express');
const peerDataModel = require('../entityModels/peersSchema.js');

const registerPeer = async (req, res) => {
    const { userName, url, isActive } = req.body;
    const peerRegistrationInfo = new peerDataModel({ userName, url, isActive });
    console.log("peerRegistrationInfo:%j", peerRegistrationInfo);

    try {
        await peerRegistrationInfo.save();
        res.status(201).json({ registrationStatus: 1, peerRegistrationInfo, message: "Registration Successfull" });
    } catch (err) {
        console.log("Peer active registration failed, error is:%s", err);
        res.status(409).json({ registrationStatus: 0, peerRegistrationInfo, message: err.message });
    }
}

const getPeers = async (req, res) => {
    const { peerStatus } = req.body;
    //peerStatus == 1, means active(online) peers
    //peerStatus == 0, means non-active(offline) peers
    //peerStatus == -1, means getting all(online and offline) peers
    try{
        let peers = []
        if(peerStatus==-1){
            peers = await peerDataModel.find();
        }else{
            peers = await peerDataModel.find({"isActive": peerStatus});
        }
        res.status(200).json({ peersRetrievalSuccessful: true, peers: peers });
    }catch(err){
        console.log("Failed to get peers having isActive status:%s", peerStatus);
        res.status(409).json({ peersRetrievalSuccessful: false, err: err });
    }
}


module.exports = { registerPeer, getPeers };