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
    return <>Code Prompt</>;
};

export default CodePromptComponent;
