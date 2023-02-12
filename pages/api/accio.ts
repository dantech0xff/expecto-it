import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { accio_spell_text } = req.query;
	console.log(req.query);
	try {
		const response = await axios.post(
			"https://api.openai.com/v1/completions",
			{
				prompt:
					"I want to know " +
					'"' +
					accio_spell_text +
					'"' +
					" in 256 words or less",
				model: "text-davinci-003",
				max_tokens: 350,
				temperature: 0,
				stop: ".\n",
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer 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`,
				},
			}
		);
		const generatedText = response.data.choices[0].text;
		console.log(response.data);
		res.status(200).json({ generatedText });
	} catch (error) {
		res.status(500).json({ error: error });
	}
}
