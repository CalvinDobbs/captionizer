import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
    userAgent: "https://www.npmjs.com/package/create-replicate",
});
const model =
    "yorickvp/llava-13b:b5f6212d032508382d61ff00469ddda3e32fd8a0e75dc39d8a4191bb742157fb";

const imageToText = async (image, prompt) => {
    console.log("Processing Image");
    const input = { image, prompt };
    const output = await replicate.run(model, { input });
    return output.join("");
};

export default imageToText;
