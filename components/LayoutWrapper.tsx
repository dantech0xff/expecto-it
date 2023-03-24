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
    Navbar,
    Dropdown,
    Link,
    Switch,
} from "@nextui-org/react";

import { icons } from "./Icons.js";

interface LayoutWrapperProps {
    className?: string;
    children: React.ReactNode;
    onChangeTheme?: (isDark: boolean) => void;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ className, children, onChangeTheme }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    useEffect(() => {
        let theme = window.localStorage.getItem("data-theme");
        setIsDarkTheme(theme === "dark");
        if (onChangeTheme) {
            onChangeTheme(theme === "dark");
        }
    }, [onChangeTheme]);

    const handleChange = () => {
        let theme = window.localStorage.getItem("data-theme");
        const isDarkTheme = theme === "dark";
        const nextTheme = isDarkTheme ? "light" : "dark";
        window.localStorage.setItem("data-theme", nextTheme);
        if (onChangeTheme) {
            onChangeTheme(!isDarkTheme);
        }
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <div className=" w-full mx-auto">
            <Navbar
                css={{
                    $$navbarBackgroundColor: "transparent",
                    $$navbarBlurBackgroundColor: "transparent",
                }}
                maxWidth={"md"}
                disableShadow={true}
                isBordered={false}
                variant={undefined}
            >
                <Navbar.Content
                    enableCursorHighlight={true}
                    activeColor="default"
                    hideIn="xs"
                    variant="default"
                >
                    <Dropdown isBordered={false}>
                        <Navbar.Item>
                            <Dropdown.Button
                                auto
                                light
                                css={{
                                    px: 0,
                                    dflex: "center",
                                    svg: { pe: "none" },
                                }}
                                iconRight={icons.chevron}
                                ripple={false}
                            >
                                Use Cases
                            </Dropdown.Button>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="ACME features"
                            css={{
                                $$dropdownMenuWidth: "340px",
                                $$dropdownItemHeight: "70px",
                                "& .nextui-dropdown-item": {
                                    py: "$4",
                                    // dropdown item left icon
                                    svg: {
                                        color: "$secondary",
                                        mr: "$4",
                                    },
                                    // dropdown item title
                                    "& .nextui-dropdown-item-content": {
                                        w: "100%",
                                        fontWeight: "$semibold",
                                    },
                                },
                            }}
                        >
                            <Dropdown.Item
                                key="autoscaling"
                                showFullDescription
                                description="ACME scales apps to meet user demand, automagically, based on load."
                                icon={icons.scale}
                            >
                                Autoscaling
                            </Dropdown.Item>
                            <Dropdown.Item
                                key="usage_metrics"
                                showFullDescription
                                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                                icon={icons.activity}
                            >
                                Usage Metrics
                            </Dropdown.Item>
                            <Dropdown.Item
                                key="production_ready"
                                showFullDescription
                                description="ACME runs on ACME, join us and others serving requests at web scale."
                                icon={icons.flash}
                            >
                                Production Ready
                            </Dropdown.Item>
                            <Dropdown.Item
                                key="99_uptime"
                                showFullDescription
                                description="Applications stay on the grid with high availability and high uptime guarantees."
                                icon={icons.server}
                            >
                                +99% Uptime
                            </Dropdown.Item>
                            <Dropdown.Item
                                key="supreme_support"
                                showFullDescription
                                description="Overcome any challenge with a supporting team ready to respond."
                                icon={icons.user}
                            >
                                +Supreme Support
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Navbar.Link href="#">Pricing</Navbar.Link>

                    <Navbar.Link href="#">Blog</Navbar.Link>

                    <Navbar.Link href="#">FAQ</Navbar.Link>
                </Navbar.Content>

                <Navbar.Content>
                    <Navbar.Link color="inherit" href="#">
                        <Text>Sign in</Text>
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button shadow color={"secondary"} auto as={Link} href="#">
                            <Text>Sign up for free</Text>
                        </Button>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Switch
                            size="xs"
                            shadow={true}
                            checked={isDarkTheme}
                            onChange={handleChange}
                        />
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
            {children}
        </div>
    );
};

export default LayoutWrapper;
