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
    Row,
    Tooltip,
    Popover,
} from "@nextui-org/react";
import axios from "axios";
import { SendIcon } from "@/components/SendIcon";
import { TypeAnimation } from "react-type-animation";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoCopy } from "react-icons/io5";
import { HiExternalLink } from "react-icons/hi";
import { RiBugLine } from "react-icons/ri";
import { WhisperSpinner, RingSpinner } from "react-spinners-kit";
export default function Home() {
    const MAX_SPELL = 256;

    const [generatedText, setGeneratedText] = useState("");
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: any) => {
        setLoading(true);
        const response = await axios.get(`/api/expecto?expecto_it=${inputText}`);
        console.log(response.data.generatedText);
        setGeneratedText(response.data.generatedText);
        setLoading(false);
    };

    const handleCopy = (event: any) => {
        let resultText = "";
        generatedText.split("\n").forEach((text) => {
            if (text.length > 0) {
                resultText += text + "\r\n";
            }
        });
        navigator.clipboard.writeText(resultText);
    };

    const handleOpenExternal = (event: any) => {};

    const handleReportBug = (event: any) => {
        window.open("https://forms.gle/xp1WATtqCXp5LBS96", "_blank");
    };

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
                <div className="mx-auto py-2 text-center sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
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
                            placeholder="Type in the power of Expecto.it"
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

                <Spacer y={0.5} />
                <Card
                    className="shadow hover:shadow-2xl"
                    isHoverable={true}
                    isPressable={false}
                    variant="bordered"
                    borderWeight={"light"}
                >
                    <div className="ml-5 mr-5 mt-2">
                        {inputText.length == 0 ? (
                            <div>
                                <div className="flex justify-center w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-500 mr-1">
                                    <TypeAnimation
                                        sequence={[
                                            "Expecto is a powerful spell that summons everything from the Internet",
                                        ]}
                                        wrapper="h3"
                                        speed={69}
                                        cursor={false}
                                        repeat={1}
                                    />
                                </div>
                                <div className="flex justify-center w-full mx-auto">
                                    <RingSpinner size={24} color="rgba(171, 196, 255, 1)" />
                                </div>
                            </div>
                        ) : loading ? (
                            <div>
                                <div className="flex justify-center w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-orange-600">
                                    <TypeAnimation
                                        sequence={["Stay tune!!! Magic is happening ..."]}
                                        wrapper="h3"
                                        speed={36}
                                        cursor={false}
                                        repeat={1}
                                    />
                                </div>
                                <div className="flex justify-center w-full mx-auto ">
                                    <WhisperSpinner size={24} />
                                </div>
                            </div>
                        ) : (
                            generatedText.split("\n").map((text, idx) => (
                                <div
                                    className="w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-600"
                                    key={idx}
                                >
                                    <Spacer y={text.length > 0 ? 0.1 : 0} />
                                    <Text>{text}</Text>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex justify-end pb-1 pr-1 pt-1">
                        <Tooltip content="Report a bug" placement="top">
                            <Button
                                className="mx-1"
                                size={"xs"}
                                auto={true}
                                onClick={handleReportBug}
                            >
                                <RiBugLine />
                            </Button>
                        </Tooltip>
                        {/* <Tooltip content="Open in new tab" placement="top">
                            <Button
                                className="mx-1"
                                size={"xs"}
                                auto={true}
                                onClick={handleOpenExternal}
                            >
                                <HiExternalLink />
                            </Button>
                        </Tooltip> */}
                        <Tooltip content="Copy to clipboard" placement="top">
                            <Button className="mx-0" size={"xs"} auto={true} onClick={handleCopy}>
                                <IoCopy></IoCopy>
                            </Button>
                        </Tooltip>
                    </div>
                </Card>
            </div>
        </>
    );
}
