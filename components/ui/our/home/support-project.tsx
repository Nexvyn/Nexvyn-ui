"use client"

import { useState } from "react"
import NextImage from "next/image"
import { Button } from "@/components/ui/core/button"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Code, Terminal, Cpu, Zap, Database, Globe, Server } from "lucide-react"

const TIERS = [
    { amount: 5, label: "$5", name: "Chill Guy Certificate", icon: Terminal, title: "$5 Donation", desc: "The icons will always be free and open-source, regardless of donations" },
    { amount: 10, label: "$10", name: "Cool Guy Certificate", icon: Code, title: "$10 Donation", desc: "A coffee for the developer to keep building awesome stuff" },
    { amount: 25, label: "$25", name: "Legend Certificate", icon: Cpu, title: "$25 Donation", desc: "Serious support that helps maintain the servers and infrastructure" },
    { amount: 50, label: "$50", name: "Hero Certificate", icon: Database, title: "$50 Donation", desc: "Major contribution to the long-term sustainability of the project" },
    { amount: 100, label: "$100", name: "Titan Certificate", icon: Server, title: "$100 Donation", desc: "Elite status support. You are truly making a difference" },
    { amount: 200, label: "$200", name: "Godlike Certificate", icon: Zap, title: "$200 Donation", desc: "Unbelievable generosity. You are powering the future of UI" },
    { amount: 500, label: "$500", name: "Immortal Certificate", icon: Globe, title: "$500 Donation", desc: "Maximum support level. Your name echoes in eternity" },
]

export function SupportProject() {
    const [selectedAmount, setSelectedAmount] = useState(5)
    const currentTier = TIERS.find(t => t.amount === selectedAmount) || TIERS[0]
    const TierIcon = currentTier.icon

    return (
        <div className="w-full flex flex-col items-center">
            <div className="mb-12 text-center max-w-lg mx-auto">
                <h2 className="text-3xl font-bold mb-4 font-pixelify">Support the project</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    This is a place for those who want to go beyond a simple thank you.
                    I'm grateful for any kind of support, whether it's just a DM with kind words or something more.
                    Your donation is by no means required - this page is made just for those who asked for it.
                    I am incredibly grateful for any support you choose to provide.
                </p>
                <p className="text-muted-foreground mt-6 text-sm font-medium font-mono uppercase tracking-widest">
                    Select donation amount:
                </p>
            </div>

            {/* Amount Selector */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                {TIERS.map((tier) => (
                    <motion.button
                        key={tier.amount}
                        onClick={() => setSelectedAmount(tier.amount)}
                        layout
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95, y: 0 }}
                        animate={{
                            backgroundColor: selectedAmount === tier.amount ? "var(--foreground)" : "var(--background)",
                            borderColor: selectedAmount === tier.amount ? "var(--foreground)" : "var(--border)",
                            color: selectedAmount === tier.amount ? "var(--background)" : "var(--muted-foreground)"
                        }}
                        transition={{
                            type: "spring", stiffness: 500, damping: 30,
                            backgroundColor: { duration: 0.2 }
                        }}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-pixelify min-w-[60px] border-2",
                            selectedAmount === tier.amount
                                ? "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)] translate-x-[-1px] translate-y-[-1px] border-foreground"
                                : "shadow-none border-border/60 hover:border-border"
                        )}
                    >
                        {tier.label}
                    </motion.button>
                ))}
            </div>

            {/* Ticket Card */}
            <div className="relative w-full max-w-2xl mx-auto drop-shadow-2xl z-10">
                {/* Mascots - Decorative Peeking */}
                <div className="absolute -top-24 -left-32 z-[-1] hidden xl:block pointer-events-none select-none">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <NextImage
                            src="/mascots/mascot-black.png"
                            alt="Nexvyn Mascot Black"
                            width={220}
                            height={220}
                            className="object-contain rotate-[-12deg] drop-shadow-lg"
                        />
                    </motion.div>
                </div>
                <div className="absolute -top-24 -right-32 z-[-1] hidden xl:block pointer-events-none select-none">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <NextImage
                            src="/mascots/mascot-white.png"
                            alt="Nexvyn Mascot White"
                            width={220}
                            height={220}
                            className="object-contain rotate-[12deg] drop-shadow-lg"
                        />
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedAmount}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="w-full"
                    >
                        <div
                            className="relative bg-card text-card-foreground h-[280px] w-full isolate group overflow-hidden border border-border"
                            style={{
                                borderRadius: "16px",
                                // Creating the ticket shape with side stub
                                maskImage: `
                  radial-gradient(circle at 75% 0, transparent 12px, black 12px), 
                  radial-gradient(circle at 75% 100%, transparent 12px, black 12px)
                `,
                                maskComposite: "intersect",
                                WebkitMaskComposite: "source-in",
                            }}
                        >

                            {/* Subtle Grid Pattern Overlay */}
                            <div
                                className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-foreground"
                                style={{
                                    maskImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`,
                                    maskSize: '20px 20px'
                                }}
                            />

                            {/* Vertical Dashed Line Divider - Aligned with notches */}
                            <div className="absolute top-3 bottom-3 left-[75%] w-px border-l-2 border-dashed border-border/60 -translate-x-1/2 pointer-events-none z-10" />

                            <div className="relative z-10 h-full flex">
                                {/* Left Section - Main Info */}
                                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between pr-10 relative overflow-hidden">
                                    {/* Header */}
                                    <div className="flex justify-between items-start z-20 relative">
                                        <div>
                                            <h3 className="text-xl sm:text-2xl tracking-tight text-foreground font-pixelify">{currentTier.name}</h3>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="inline-flex items-center rounded-sm border border-border bg-muted/50 px-2 py-1 text-[10px] font-mono text-muted-foreground tracking-wide uppercase">
                                                    {new Date().getFullYear()} Edition
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Giant Vector Character (Replaces Image) */}
                                    <div className="absolute -bottom-16 -right-16 z-0 pointer-events-none select-none">
                                        <motion.div
                                            key={currentTier.name}
                                            initial={{ scale: 0.8, rotate: -30, opacity: 0 }}
                                            animate={
                                                currentTier.amount === 500
                                                    ? { scale: 1, rotate: 360, opacity: 1 }
                                                    : { scale: 1, rotate: -15, opacity: 1 }
                                            }
                                            transition={
                                                currentTier.amount === 500
                                                    ? {
                                                        scale: { type: "spring", stiffness: 200, damping: 20 },
                                                        opacity: { duration: 0.2 },
                                                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                                                    }
                                                    : { type: "spring", stiffness: 200, damping: 20, delay: 0.05 }
                                            }
                                        >
                                            <TierIcon
                                                className="size-80 text-foreground/5"
                                                strokeWidth={1}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Description */}
                                    <div className="flex gap-4 mt-auto items-center relative z-20">
                                        <div className="size-14 rounded-sm border-2 border-border bg-card flex items-center justify-center shrink-0 shadow-sm">
                                            <TierIcon className="size-6 text-foreground" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-muted-foreground text-xs leading-relaxed max-w-[240px] font-mono">
                                            {currentTier.desc}
                                        </p>
                                    </div>


                                </div>

                                {/* Right Section - Stub (Amount) */}
                                <div className="w-[25%] p-4 bg-muted/20 flex flex-col items-center justify-between text-center relative border-l border-border">
                                    <span className="font-pixelify text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded-sm bg-card mt-2">
                                        ADM ONE
                                    </span>

                                    <div className="flex flex-col items-center my-auto">
                                        <h4 className="text-3xl font-pixelify tracking-tighter text-foreground leading-none">{currentTier.label}</h4>
                                        <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest block mt-1">Donation</span>
                                    </div>

                                    <div className="w-full flex flex-col items-center gap-4 mt-auto">
                                        <Link href="https://github.com/sponsors/Nexvyn" target="_blank" className="w-full z-20">
                                            <Button className="w-full h-8 rounded-sm bg-foreground text-background hover:bg-foreground/90 text-[10px] font-bold uppercase tracking-wider font-pixelify shadow-sm active:translate-y-[1px] transition-all">
                                                Sponsor
                                            </Button>
                                        </Link>

                                        {/* Vertical Barcode */}
                                        <div className="h-6 w-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] bg-repeat-x text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
