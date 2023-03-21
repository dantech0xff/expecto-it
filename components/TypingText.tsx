import { Spacer } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Text } from "@nextui-org/react";

interface TypingTextProps {
    text: string;
}

const TypingText = ({ text }: TypingTextProps): JSX.Element => {
    const [displayText, setDisplayText] = useState("");
    const [currentChar, setCurrentChar] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentChar < text.length) {
                setCurrentChar((char) => char + 1);
                setDisplayText(text.slice(0, currentChar));
            } else {
                clearTimeout(timer);
            }
            console.log("currentChar", currentChar);
        }, 30);
    }, [currentChar, text]);

    return (
        <div>
            {displayText.split("\n").map((text, idx) => (
                <div
                    className="w-full mx-auto bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200"
                    key={idx}
                >
                    <Spacer y={text.length > 0 ? 0.1 : 0} />
                    <Text>{text}</Text>
                </div>
            ))}
        </div>
    );
};

export default TypingText;
