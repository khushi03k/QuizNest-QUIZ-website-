import mongoose from 'mongoose';

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://khushi30ksharma_db_user:wXa8Elb2i3OSo9wx@cluster0.oduh8w0.mongodb.net/?appName=Cluster0')
    .then(() =>{console.log('DB CONNECTED')})

}