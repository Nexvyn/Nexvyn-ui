"use client"

import { SpinningText } from "@/registry/new-york-v4/ui/spinning-text"

export default function SpinningTextDemo() {
    return (
        <div className="flex min-h-[250px] w-full items-center justify-center bg-background p-8">
            <SpinningText
                radius={6}
                duration={8}
                className="text-xl font-medium text-foreground"
            >
                nexvyn • ui • components •
            </SpinningText>
        </div>
    )
}
