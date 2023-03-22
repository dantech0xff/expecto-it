import Head from "next/head";
import React, { useState } from "react";
import { Radio, Text } from "@nextui-org/react";
import { TypeAnimation } from "react-type-animation";
import "react-circular-progressbar/dist/styles.css";
import TextPromptComponent from "@/components/text-prompt/TextPromptComponent";
import ImagePromptComponent from "@/components/image-prompt/ImagePromptComponent";
import CodePromptComponent from "@/components/code-prompt/CodePromptComponent";
export default function Home() {
    //text, art, code
    const [checkedFeature, setCheckedFeature] = useState("text");

    const [textPromptState, setTextPromptState] = useState({
        text: "",
        textResult: "",
    });

    let imagePrompt = { text: "", image: "", imageResult: "" };
    let codePrompt = { text: "", code: "", codeResult: "" };

    return (
        <>
            <Head>
                <title>Expecto.It - Lazy but magic</title>
                <meta name="description" content="Powerful spell cast with OpenAI!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="max-w-7xl min-h-[calc(100vh-5rem)] mx-auto py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 sm:flex sm:flex-col sm:items-center">
                <div className="flex justify-center w-full mx-auto">
                    <h1 className="text-5xl font-extrabold sm:text-center inline-flex items-center select-none">
                        <span>Expecto</span>
                        <span>.</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                            it
                        </span>
                    </h1>
                </div>
                <div className="mx-auto pt-2 text-center sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
                    <TypeAnimation
                        sequence={[
                            "summons knowledge",
                            2000,
                            "acquires subjects",
                            2000,
                            "helps you write",
                            2000,
                            "is fun and smart",
                            2000,
                            "powered by OpenAI",
                            2000,
                        ]}
                        wrapper="h3"
                        deletionSpeed={69}
                        speed={69}
                        cursor={true}
                        repeat={Infinity}
                    />
                </div>
                <div className="py-5">
                    <Radio.Group
                        aria-label="radio-group"
                        orientation="horizontal"
                        value={checkedFeature}
                        onChange={setCheckedFeature}
                    >
                        <Radio value="text" color="primary">
                            <Text>Text</Text>
                        </Radio>
                        <Radio value="art" color="secondary">
                            <Text>Art</Text>
                        </Radio>
                        <Radio value="code" color="success">
                            <Text>Code</Text>
                        </Radio>
                    </Radio.Group>
                </div>
                {checkedFeature == "text" ? (
                    <TextPromptComponent
                        textPrompt={textPromptState.text}
                        textResult={textPromptState.textResult}
                        updateTextPrompt={(text) => {
                            textPromptState.text = text;
                        }}
                        updateTextResult={(text) => {
                            textPromptState.textResult = text;
                        }}
                    ></TextPromptComponent>
                ) : checkedFeature == "art" ? (
                    <ImagePromptComponent textPrompt={""} />
                ) : checkedFeature == "code" ? (
                    <CodePromptComponent textPrompt={""} />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
