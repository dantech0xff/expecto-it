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
import { SendIcon } from "@/components/SendIcon";
import { TypeAnimation } from "react-type-animation";
import { Progress } from "@nextui-org/react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Home() {
    const MAX_SPELL = 64;

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
                <div className="flex justify-center w-full mx-auto">
                    <div className="w-full">
                        <Input
                            readOnly={loading ? true : false}
                            bordered={false}
                            animated={true}
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
                    </div>

                    <Spacer x={0.3} />
                    <Button
                        shadow={true}
                        animated={true}
                        auto={true}
                        color="primary"
                        onClick={handleSubmit}
                    >
                        <div style={{ width: 35, height: 35 }}>
                            {loading ? (
                                <Loading type="points" color="currentColor" />
                            ) : (
                                // create the div that child items will draw on over others
                                <CircularProgressbarWithChildren
                                    strokeWidth={5}
                                    value={(inputText.length * 100) / MAX_SPELL}
                                    styles={buildStyles({
                                        pathColor: `rgba(171, 196, 255, ${1})`,
                                        trailColor: `rgba(255, 255, 255, ${
                                            (inputText.length * 100) / MAX_SPELL / 100
                                        })`,
                                    })}
                                >
                                    <SendIcon />
                                </CircularProgressbarWithChildren>
                            )}
                        </div>
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
