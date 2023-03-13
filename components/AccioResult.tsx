import { Container } from "@nextui-org/react";
import React from "react";

interface AccioResultProps {
    text: string;
    className?: string;
}

const AccioResult: React.FC<AccioResultProps> = ({ text, className }) => {
    return (
        <Container className={className}>
            <p>{text}</p>
        </Container>
    );
};

export default AccioResult;
