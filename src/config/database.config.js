import mongoose from "mongoose";




const connect = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("DATABASE CONNECTED SUCCESSFULLY ")
    }).catch((reason) => {
        console.log('DATABASE ERROR:');
        console.log(reason);
    }) 
}

export {
    connect
}