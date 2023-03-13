import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import {
    Container,
    Button,
    Input,
    Spacer,
    Text,
    Link,
    Textarea,
    Loading,
    Card,
} from "@nextui-org/react";
import axios from "axios";
import AccioResult from "@/components/AccioResult";
import { SendButton } from "@/components/SendButton";
import { SendIcon } from "@/components/SendIcon";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
    const MAX_SPELL = 255;

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
                    <h1 className="text-5xl font-extrabold sm:text-center inline-flex items-center select-none">
                        <span>Accio</span>
                        <span>.</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500">
                            spell!
                        </span>
                    </h1>
                </div>
                <div className="mx-auto py-1 text-center sm:text-lg">
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
                <Input
                    className="my-4"
                    readOnly={loading ? true : false}
                    bordered={false}
                    animated={false}
                    shadow={true}
                    size="lg"
                    width="100%"
                    color="primary"
                    value={inputText}
                    onChange={(event) => {
                        if (event.target.value == "") {
                            setGeneratedText("");
                        }
                        if (event.target.value.length <= MAX_SPELL) {
                            setInputText(event.target.value);
                        } else {
                            setInputText(event.target.value.substring(0, MAX_SPELL));
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.key == "Enter") {
                            handleSubmit(event);
                        }
                    }}
                    placeholder="Type in the power of Accio.Spell"
                />
                {/* center the div below */}
                <div className="flex justify-center w-full mx-auto">
                    <Button shadow={true} color="gradient" onClick={handleSubmit}>
                        {loading ? (
                            <Loading className="m-5" type="points" color="currentColor" size="sm" />
                        ) : (
                            <SendIcon className="m-5" fill="white"></SendIcon>
                        )}
                        <span>Expecto Patronum!!!!</span>
                    </Button>
                </div>

                <AccioResult
                    className="mx-auto text-justify m-1"
                    text={generatedText}
                ></AccioResult>
            </div>
        </>
    );
}
