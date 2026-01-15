"use client"

import { MorphingText } from "@/registry/new-york-v4/ui/morphing-text"

export default function MorphingTextDemo() {
    return (
        <div className="flex min-h-[200px] w-full items-center justify-center bg-background p-8">
            <MorphingText
                texts={["Hello", "World", "Nexvyn", "UI"]}
                className="text-4xl text-foreground"
            />
        </div>
    )
}
