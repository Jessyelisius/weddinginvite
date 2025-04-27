const mongoose = require("mongoose")


const DBconnection = async() =>{
    try {
        const dbcon = await mongoose.connect(process.env.dbconn);
        console.log('connection established');
    } catch (error) {
        console.log('error trying to connect', error);
        process.exit(1);
    }
}

module.exports = DBconnection;