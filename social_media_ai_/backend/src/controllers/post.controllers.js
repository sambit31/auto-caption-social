import { PostModel } from "../models/post.models.js";
import { generateCaption } from "../service/ai.service.js";
import { uploadToImageKit } from "../service/storage.service.js";
import { v4 as uuidv4 } from "uuid";

export const createPostController = async (req, res) => {
    try{

        const file = req.file;   
        console.log("File received:", file);

        if(!file) return res.status(400).json({ message: "No file uploaded" });

        // convert to base64
        const base64ImageFile = Buffer.from(file.buffer).toString('base64');

        // generate caption
        const caption = await generateCaption(base64ImageFile);

        // upload image
        const uploaded = await uploadToImageKit(file.buffer,`${uuidv4()}-${file.originalname}`);

        res.json({
            caption: caption,
            imageUrl: uploaded.url,   // <-- IMPORTANT
        });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
