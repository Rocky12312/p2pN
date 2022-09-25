const mongoose = require('mongoose');

const peersSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true
    }
}//,
// {
//     capped: { size: 1024 },
//     bufferCommands: false,
//     autoCreate: false // disable `autoCreate` since `bufferCommands` is false
// }
)

const peerDataModel = mongoose.model('peers', peersSchema);

// (async()=>{
//     await peerDataModel.createCollection();
// })()

module.exports = peerDataModel;