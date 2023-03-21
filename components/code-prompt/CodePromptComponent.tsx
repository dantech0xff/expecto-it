import React, { useEffect, useState } from "react";
import { Button, Card, Container, Input, Loading, Spacer, Tooltip, Text } from "@nextui-org/react";
import axios from "axios";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import { SendIcon } from "../SendIcon";
import { IoCopy } from "react-icons/io5";
import { RiBugLine } from "react-icons/ri";
import { RingSpinner, WhisperSpinner } from "react-spinners-kit";
import { TypeAnimation } from "react-type-animation";

const MAX_SPELL = 256;

interface CodePromptComponentProps {
    textPrompt: string;
    textResult?: string;
    className?: string;
}

const CodePromptComponent: React.FC<CodePromptComponentProps> = ({
    textPrompt,
    textResult,
    className,
}) => {
    const handleReportBug = () => {
        window.open("https://forms.gle/xp1WATtqCXp5LBS96", "_blank");
    };
    const handleCopy = () => {};

    return (
        <Container className={className}>
            <Card
                className="shadow hover:shadow-2xl"
                isHoverable={true}
                isPressable={false}
                variant="bordered"
                borderWeight={"light"}
            >
                <div className="ml-5 mr-5 mt-2">
                    <div>
                        <div className="flex justify-center w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-yellow-200 mr-1">
                            <TypeAnimation
                                sequence={[
                                    "Code it easy, with OpenAI by your side!",
                                    1000,
                                    "Clean code, clean slate with OpenAI",
                                    1000,
                                    "Compile with the power of your code",
                                    1000,
                                ]}
                                wrapper="h2"
                                speed={69}
                                cursor={false}
                                repeat={1}
                            />
                        </div>
                        <div className="flex justify-center w-full mx-auto">
                            <RingSpinner size={50} color="#c7ef00" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pb-1 pr-1 pt-1">
                    <Tooltip content="Report a bug" placement="top">
                        <Button className="mx-1" size={"xs"} auto={true} onClick={handleReportBug}>
                            <RiBugLine />
                        </Button>
                    </Tooltip>

                    <Tooltip content="Copy to clipboard" placement="top">
                        <Button className="mx-0" size={"xs"} auto={true} onClick={handleCopy}>
                            <IoCopy></IoCopy>
                        </Button>
                    </Tooltip>
                </div>
            </Card>
        </Container>
    );
};

export default CodePromptComponent;
