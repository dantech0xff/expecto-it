import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Container, Button, Input, Spacer, Text, Link, Textarea, Loading } from "@nextui-org/react";
import axios from "axios";
import AccioResult from "@/components/AccioResult";
import { SendButton } from "@/components/SendButton";
import { SendIcon } from "@/components/SendIcon";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
    const [generatedText, setGeneratedText] = useState("");
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: any) => {
        setLoading(true);
        const response = await axios.get(`/api/accio?accio_spell_text=${inputText}`);
        console.log(response.data.generatedText);
        setGeneratedText(response.data.generatedText);
        setLoading(false);
    };
    return (
        <>
            <Head>
                <title>accio.how - Lazy but magic</title>
                <meta name="description" content="Powerful spell cast with OpenAI!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="max-w-7xl min-h-[calc(100vh-5rem)] mx-auto py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 sm:flex sm:flex-col sm:items-center">
                <div className="flex justify-center w-full mx-auto">
                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center inline-flex items-center select-none">
                        <span>Accio</span>
                        <span>.</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500">
                            spell!
                        </span>
                    </h1>
                </div>
                <div className="mx-auto py-1 text-gray-900 text-center sm:text-lg">
                    <TypeAnimation
                        sequence={[
                            "Accio acquires knowledge",
                            1000,
                            "Accio summons subjects",
                            1000,
                            "Accio is funny but smart",
                            1000,
                            "Accio is powerful spell",
                            1000,
                            "Accio is lazy but magic",
                            1000,
                            "Accio is powered by OpenAI",
                            1000,
                        ]}
                        wrapper="span"
                        deletionSpeed={75}
                        speed={50}
                        cursor={true}
                        repeat={Infinity}
                    />
                </div>
                <div className="w-full flex justify-center">
                    <Input
                        className="my-4"
                        clearable={loading ? false : true}
                        readOnly={loading ? true : false}
                        bordered
                        size="lg"
                        width="80%"
                        color="primary"
                        type="text"
                        contentRightStyling={false}
                        onChange={(event) => {
                            if (event.target.value == "") {
                                setGeneratedText("");
                            }
                            setInputText(event.target.value);
                        }}
                        placeholder="Summon success with the power of Accio.spell!"
                        contentRight={
                            loading == false ? (
                                <SendButton onClick={handleSubmit}>
                                    <SendIcon fill="white"></SendIcon>
                                </SendButton>
                            ) : (
                                <Loading size="xs" className="pr-5" />
                            )
                        }
                    />
                </div>
                <AccioResult
                    className="mx-auto text-justify w-10/12 m-1"
                    text={generatedText}
                ></AccioResult>
            </div>
        </>
    );
}
