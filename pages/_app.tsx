import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getDocumentTheme } from "@nextui-org/react";

import { Switch, changeTheme, useTheme } from "@nextui-org/react";

const lightTheme = createTheme({
    type: "light",
});

const darkTheme = createTheme({
    type: "dark",
    theme: {
        colors: {
            background: "#1e1e1e",
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    useEffect(() => {
        // you can use any storage
        let theme = window.localStorage.getItem("data-theme");
        setIsDarkTheme(theme === "dark");

        const observer = new MutationObserver((mutation) => {
            let newTheme = getDocumentTheme(document?.documentElement);
            setIsDarkTheme(newTheme === "dark");
        });

        // Observe the document theme changes
        observer.observe(document?.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme", "style"],
        });

        return () => observer.disconnect();
    }, []);

    const handleChange = () => {
        const nextTheme = isDarkTheme ? "light" : "dark";
        window.localStorage.setItem("data-theme", nextTheme);
        changeTheme(nextTheme);
        setIsDarkTheme(!isDarkTheme);
    };
    return (
        <NextUIProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <div className="flex justify-end">
                <Switch
                    className="m-4"
                    size="xs"
                    shadow={true}
                    checked={isDarkTheme}
                    onChange={handleChange}
                />
            </div>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}
