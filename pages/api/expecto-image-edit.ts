import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
const requestIp = require("request-ip");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const identifier = requestIp.getClientIp(req);
    const { expecto_it, image_file } = req.query;

    try {
        const response = await openai.createImageEdit({
            prompt: expecto_it,
            image: image_file,
            n: 1,
            size: "256x256",
            user: identifier,
        });
        const imgUrl = response.data[0].url;
        res.status(200).json({ imgUrl });
    } catch (error) {
        res.status(500).json({
            generatedText:
                "You're spelling too much at a same time. Stay calm my Wiz, Magic loves you <3!",
        });
    }
}
