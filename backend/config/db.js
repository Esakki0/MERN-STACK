import mongoose from "mongoose";

export const connectDB = async () => {
    (await mongoose.connect('mongodb+srv://root:root@cluster0.yu7ad.mongodb.net/online?retryWrites=true&w=majority&appName=Cluster0')).isObjectIdOrHexString(()=>console.log("DB Connected"));
}