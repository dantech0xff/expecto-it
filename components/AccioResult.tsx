import { Container } from "@nextui-org/react";
import React from "react";

interface AccioResultProps {
    text: string;
    className?: string;
}

const AccioResult: React.FC<AccioResultProps> = ({ text, className }) => {
    return <Container className={className}>{text}</Container>;
};

export default AccioResult;
