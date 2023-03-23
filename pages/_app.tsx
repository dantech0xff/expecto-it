import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { createTheme, NextUIProvider, useSSR } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { Switch } from "@nextui-org/react";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import LayoutWrapper from "@/components/LayoutWrapper";

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

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const { isBrowser } = useSSR();

    const handleChange = (isDark: boolean) => {
        setIsDarkTheme(isDark);
    };
    return (
        isBrowser && (
            <SessionProvider session={session}>
                <NextUIProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                    <LayoutWrapper
                        onChangeTheme={(isDark) => {
                            handleChange(isDark);
                        }}
                    >
                        <Component {...pageProps} />
                    </LayoutWrapper>
                </NextUIProvider>
            </SessionProvider>
        )
    );
}
