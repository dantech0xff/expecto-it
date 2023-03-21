import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
const requestIp = require("request-ip");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const identifier = requestIp.getClientIp(req);
    const { expecto_it } = req.query;
    console.log(req.query);
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: expecto_it,
                    },
                ],
                temperature: 0.1,
                user: identifier,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`,
                },
            }
        );

        let generatedText = "";
        response.data.choices[0].message.content.split("\n").forEach((text: string) => {
            if (text.length > 0) {
                generatedText += text + "\r\n";
            }
        });
        res.status(200).json({ generatedText });
    } catch (error) {
        res.status(500).json({
            generatedText:
                "You're spelling too much at a same time. Stay calm my Wiz, Magic loves you <3!",
        });
    }
}
