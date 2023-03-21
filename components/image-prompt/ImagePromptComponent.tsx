import React, { useEffect, useState } from "react";
import { Button, Card, Container, Input, Loading, Spacer, Tooltip, Image } from "@nextui-org/react";
import axios from "axios";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import { SendIcon } from "../SendIcon";
import { IoCopy } from "react-icons/io5";
import { RiBugLine } from "react-icons/ri";
import { RingSpinner, WhisperSpinner } from "react-spinners-kit";
import { TypeAnimation } from "react-type-animation";

const MAX_SPELL = 256;

interface ImagePromptComponentProps {
    textPrompt: string;
    textResult?: string;
    className?: string;
}

const ImagePromptComponent: React.FC<ImagePromptComponentProps> = ({
    textPrompt,
    textResult,
    className,
}) => {
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState("");
    const [generatedImage, setGeneratedImage] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        const response = await axios.get(`/api/expecto-image?expecto_it=${inputText}`);
        setGeneratedImage(response.data.imgUrl);
        setLoading(false);
    };
    const handleCopy = () => {};

    const handleReportBug = () => {
        window.open("https://forms.gle/xp1WATtqCXp5LBS96", "_blank");
    };
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textPrompt) {
            setInputText(textPrompt);
        }
        if (inputRef.current != null) {
            inputRef.current.value = textPrompt;
        }
    }, [textResult, textPrompt]);

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
                    {inputText.length == 0 ? (
                        <div>
                            <div className="flex justify-center w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-500 mr-1">
                                <TypeAnimation
                                    sequence={[
                                        "Artificial Intelligence is the new magic",
                                        3000,
                                        "Art Generator is under construction",
                                        3000,
                                    ]}
                                    wrapper="h2"
                                    speed={69}
                                    cursor={false}
                                    repeat={1}
                                />
                            </div>
                            <div className="flex justify-center w-full mx-auto">
                                <RingSpinner size={50} color="rgba(171, 196, 255, 1)" />
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
                        generatedImage.split("\n").map((text, idx) => (
                            <div
                                className="w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-600"
                                key={idx}
                            >
                                <Image width={1024} height={1024} alt="Image from AI" src={text} />
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-end pb-1 pr-1 pt-1">
                    <Tooltip content="Report a bug" placement="top">
                        <Button
                            color={"secondary"}
                            className="mx-1"
                            size={"xs"}
                            auto={true}
                            onClick={handleReportBug}
                        >
                            <RiBugLine />
                        </Button>
                    </Tooltip>

                    <Tooltip content="Copy to clipboard" placement="top">
                        <Button
                            color={"secondary"}
                            className="mx-0"
                            size={"xs"}
                            auto={true}
                            onClick={handleCopy}
                        >
                            <IoCopy></IoCopy>
                        </Button>
                    </Tooltip>
                </div>
            </Card>
        </Container>
    );
};

export default ImagePromptComponent;
