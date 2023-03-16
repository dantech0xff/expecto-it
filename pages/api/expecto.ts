import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
const requestIp = require("request-ip");

const redis = new Redis({
    url: "chief-pipefish-33349.upstash.io",
    token: "885c36ef32e842a5bfd10c3488cad875",
});
// Create a new ratelimiter, that allows 5 requests per 5 seconds
const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(1, "60 s"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const identifier = requestIp.getClientIp(req);
    // const result = await ratelimit.limit(identifier);

    // if (!result.success) {
    //     res.status(200).json({
    //         generatedText:
    //             "You're spelling too much at a same time. Stay calm my Wiz, Magic loves you <3!",
    //     });
    //     return;
    // }

    // res.setHeader("X-RateLimit-Limit", result.limit);
    // res.setHeader("X-RateLimit-Remaining", result.remaining);

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
                        content:
                            "You are master of the topic me asking, help me " +
                            '"' +
                            expecto_it +
                            '"',
                    },
                ],
                temperature: 0.1,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`,
                },
            }
        );

        let generatedText = response.data.choices[0].message.content;
        generatedText.trim();
        const costInfo = response.data.usage;
        console.log(costInfo);
        console.log(generatedText);

        res.status(200).json({ generatedText });
    } catch (error) {
        res.status(500).json({
            generatedText:
                "You're spelling too much at a same time. Stay calm my Wiz, Magic loves you <3!",
        });
    }
}
