import express from 'express'
import multer from 'multer'
import File from '../models/File'
import {UploadApiResponse, v2 as cloudinary} from 'cloudinary'


const router = express.Router();

const storage = multer.diskStorage({});
let upload = multer({
    storage,
})



router.post('/upload',upload.single('myFile'), async (req,res)=>{
    try{

  if(!req.file) return res.status(400).json({message:'Please add the file!!'})
      console.log(req.file)

      let uploadedFile: UploadApiResponse;
      try{
       uploadedFile =  await cloudinary.uploader.upload(req.file.path,{
              folder:"shareBro",
              resource_type:"auto"
          })
      }catch(err){
          console.log(err.message)
          return res.status(400).json({message:'cloudinary error'})
      }

      const {originalname}  = req.file;
      const {secure_url,bytes,format} = uploadedFile;

      const file = await File.create({
          fileName:originalname,
          fileSize: bytes,
          fileUrl: secure_url,
          fileType:format,
      })
    return res.status(200).json(file)
    }catch(err){
return res.status(500).json({message: 'Server error'})
    }
})

export default router;