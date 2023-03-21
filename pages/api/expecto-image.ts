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
    const { expecto_it } = req.query;
    console.log(expecto_it);
    try {
        const response = await openai.createImage({
            prompt: expecto_it,
            n: 10,
            size: "1024x1024",
            user: identifier,
        });

        let imgUrl = "";
        response.data.data.forEach((element: any) => {
            imgUrl += element.url + "\n";
        });
        console.log(imgUrl);
        res.status(200).json({ imgUrl });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            imgUrl: "https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png",
        });
    }
}
