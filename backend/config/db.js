import mongoose from "mongoose"

export const connectToDB = async () => {
    try {
        const uri = process.env.MONGO_URI
        if(!uri) throw new Error("MONGO_URI not defined!")
        const conn = await mongoose.connect(uri);
        console.log(`Mongo DB connected successfully! ${conn.connection.host}`);
        
        
    } catch (error) {
        console.error("Mongo DB connection error:", error.message);
        process.exit(1);
    }
    
}