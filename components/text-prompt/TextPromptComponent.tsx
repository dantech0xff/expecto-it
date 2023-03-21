import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Textarea,
    Loading,
    Spacer,
    Tooltip,
    Text,
} from "@nextui-org/react";
import axios from "axios";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import { SendIcon } from "../SendIcon";
import { IoCopy } from "react-icons/io5";
import { RiBugLine } from "react-icons/ri";
import { RingSpinner, WhisperSpinner } from "react-spinners-kit";
import { TypeAnimation } from "react-type-animation";
import TypingText from "../TypingText";

const MAX_SPELL = 512;

interface TextPromptComponentProps {
    textPrompt: string;
    textResult?: string;
    className?: string;
    updateTextResult?: (text: string) => void;
    updateTextPrompt?: (text: string) => void;
}

const TextPromptComponent: React.FC<TextPromptComponentProps> = ({
    textPrompt,
    textResult,
    className,
    updateTextPrompt,
    updateTextResult,
}) => {
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState("");
    const [generatedText, setGeneratedText] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        const response = await axios.get(`/api/expecto?expecto_it=${inputText}`);
        setGeneratedText(response.data.generatedText);
        if (updateTextResult) {
            updateTextResult(response.data.generatedText);
        }
        setLoading(false);
    };
    const handleCopy = () => {
        let resultText = "";
        generatedText.split("\n").forEach((text) => {
            if (text.length > 0) {
                resultText += text + "\r\n";
            }
        });
        navigator.clipboard.writeText(resultText);
    };

    const handleReportBug = () => {
        window.open("https://forms.gle/xp1WATtqCXp5LBS96", "_blank");
    };
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textResult && textResult != "") {
            setGeneratedText(textResult);
        }
        if (textPrompt) {
            setInputText(textPrompt);
        }
        if (inputRef.current != null) {
            inputRef.current.value = textPrompt;
        }
    }, [textResult, textPrompt]);

    return (
        <Container className={className}>
            <div className="flex justify-center w-full mx-auto">
                <div className="w-full">
                    <Textarea
                        ref={inputRef}
                        aria-label="input-prompt-text"
                        readOnly={loading ? true : false}
                        bordered={false}
                        animated={true}
                        shadow={true}
                        size="lg"
                        width="100%"
                        color="primary"
                        maxLength={MAX_SPELL}
                        onChange={(event) => {
                            const newInputText = event.target.value;
                            if (event.target.value.length <= MAX_SPELL) {
                                setInputText(newInputText);
                            } else {
                                setInputText(newInputText.substring(0, MAX_SPELL));
                            }
                            if (updateTextPrompt) {
                                updateTextPrompt(newInputText);
                            }
                        }}
                        minRows={1}
                        maxRows={10}
                        placeholder="What is the meaning of life?"
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
                    {loading ? (
                        <Container>
                            <Row justify="center" align="center">
                                <div className="flex justify-center w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-orange-600 mr-1">
                                    <TypeAnimation
                                        sequence={["Stay tune!!! Magic is happening ...", 1000]}
                                        wrapper="h2"
                                        speed={50}
                                        repeat={1}
                                    />
                                </div>
                            </Row>
                            <Row justify="center" align="center">
                                <WhisperSpinner size={50} />
                            </Row>
                        </Container>
                    ) : generatedText.length == 0 ? (
                        <div>
                            <div className="flex justify-center w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-500 mr-1">
                                <TypeAnimation
                                    sequence={[
                                        "Write down your concerns and let Expecto do the rest ...",
                                        1000,
                                    ]}
                                    wrapper="h2"
                                    speed={50}
                                    repeat={1}
                                />
                            </div>
                            <div className="flex justify-center w-full mx-auto">
                                <RingSpinner size={50} color="rgba(171, 196, 255, 1)" />
                            </div>
                        </div>
                    ) : (
                        <TypingText text={generatedText}></TypingText>
                    )}
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

export default TextPromptComponent;
