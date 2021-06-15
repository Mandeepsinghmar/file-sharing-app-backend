import { timeStamp } from 'console';
import mongoose,{Document} from 'mongoose'
const {Schema } = mongoose;

const FileSchema = new Schema({
    fileName:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    fileSize:{
    type:String,
    required:true
    },
    sender:String,
    receiver:String,
},
{timestamps:true}
)

interface IFile extends Document{
    fileName:string
    fileUrl:string
    fileType:string
    fileSize:string
    sender?:string
    receiver?:string
  
}

export default mongoose.model<IFile>("File",FileSchema)