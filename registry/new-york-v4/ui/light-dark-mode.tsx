"use client";

import { Button } from "@/components/ui/core/button";
import { useTheme } from "next-themes";
import { SunIcon } from "@/components/ui/icons/animated/sun";
import { MoonIcon } from "@/components/ui/icons/animated/moon";

export function LightDarkMode() {
    const { theme, setTheme } = useTheme();

    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
            <SunIcon className=" dark:hidden block" />
            <MoonIcon className=" hidden dark:block" />
        </Button>
    );
}
