const axios = require("axios");

//Peer Registration
/*
let peerInfo = {
    "userName":"Sourabh 4",
    "url": url,
    "isActive": true
}
//registering peer as soon as tunnel connection is made
registerPeer(url, peerInfo, (err, data)=>{
    if(err){
        console.log("Registration failed, err is:%j", err);
    }else{
        console.log("Successfully registered");
    }
});
*/
const registerPeer = (url, peerInfo, callback) => {
    if(url && peerInfo && peerInfo.userName && peerInfo.url && peerInfo.isActive){
        var data = JSON.stringify({
            "userName": peerInfo.userName,
            "url": peerInfo.url,
            "isActive": peerInfo.isActive
        });
        var config = {
            method: 'post',
            url: `${url}/peer/register`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.registrationStatus){
                callback(null, response.data)
            }
        })
        .catch(function (err) {
            console.log("error while registration is:%j", err);
            callback(err);
        });
    }else{
        console.log("Proper registration info is not provided");
        callback(new Error("Proper registration info is not provided"));
    }
}

//Getting Peers based upon peerStatus
/*
let peerRetrievalParameters = {
    "peerStatus": 1
}
//registering peer as soon as tunnel connection is made
getPeers(url, peerRetrievalParameters, (err, data)=>{
    if(err){
        console.log("Failed to get peers, error is:%j", err);
    }else{
        console.log("Successfully retrieved peers");
    }
});
*/
const getPeers = (url, peerRetrievalParameters, callback) => {
    if(url && peerRetrievalParameters && peerRetrievalParameters.peerStatus){
        var data = JSON.stringify({
            "peerStatus": peerRetrievalParameters.peerStatus
        });
        var config = {
            method: 'post',
            url: `${url}/peer/getPeers`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.peersRetrievalSuccessful){
                callback(null, response.data)
            }
        })
        .catch(function (err) {
            console.log("error while registration is:%j", err);
            callback(err);
        });
    }else{
        console.log("Proper registration info is not provided");
        callback(new Error("Failed to get peers"));
    }
}


module.exports = { registerPeer, getPeers };