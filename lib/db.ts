import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please define monodb_uri in env variables")
}

let cached = global.mongoose;

if(!cached){
    global.module = {conn: null, promise: null}
}

export async function connectToDB(){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        mongoose
        .connect(MONGODB_URI)
        .then(()=> mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error       
    }
    return cached.conn;
}