import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONG_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDB connected successfully');
        });

        connection.on('error',(err)=>{
            console.log('MongoDB Connection error. Please make sure MongoDB is running' + err);
            process.exit();
        })
    }
    catch(error){
        console.log('Something goes Wrong' + error);
    }
}