import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { expecto_it } = req.query;
	console.log(req.query);
	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{	
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": "You are master of the topic me asking, help me explain " +
				'"' +
				expecto_it +
				'"' +
				" in 512 words. Please provide some more urls to help me understand the topic better."}],
				max_tokens: 1024,
				temperature: 0.1,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer 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`,
				},
			}
		);

		const generatedText = response.data.choices[0].message.content;
        const costInfo = response.data.usage

		console.log(response.data.choices[0]);
        console.log(costInfo)

		res.status(200).json({ generatedText });
	} catch (error) {
		res.status(500).json({ error: error });
	}
}
