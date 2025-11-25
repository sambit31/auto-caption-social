import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export async function uploadToImageKit(fileBuffer, fileName) {
    const res = await imagekit.upload({
        file: fileBuffer,
        fileName: fileName,
        folder:"caption-generator-images"
    });

    return res;
}
