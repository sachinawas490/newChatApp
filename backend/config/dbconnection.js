import mongoose from "mongoose";

const db=async ()=>{

    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log("connected successfully")})
    .catch((err)=>{console.log(`error occured ${err}`)})
     
}

export default db;