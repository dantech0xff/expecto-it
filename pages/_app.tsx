import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider, useSSR } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { Switch } from "@nextui-org/react";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD29fpABbWH7TjgPvUDfdOwTOVS1ec68ew",
    authDomain: "accio-spell.firebaseapp.com",
    databaseURL: "https://accio-spell-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "accio-spell",
    storageBucket: "accio-spell.appspot.com",
    messagingSenderId: "599907816894",
    appId: "1:599907816894:web:2f11b08f49b394013ed5ef",
    measurementId: "G-1BMQWQCYCV",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

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
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const { isBrowser } = useSSR();

    useEffect(() => {
        let theme = window.localStorage.getItem("data-theme");
        setIsDarkTheme(theme === "dark");
    }, []);

    const handleChange = () => {
        const nextTheme = isDarkTheme ? "light" : "dark";
        window.localStorage.setItem("data-theme", nextTheme);
        setIsDarkTheme(!isDarkTheme);
    };
    return (
        isBrowser && (
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
        )
    );
}
