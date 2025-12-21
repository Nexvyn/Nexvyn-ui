"use client"

import React, { useState, useCallback } from "react"
import { Highlight } from "prism-react-renderer"
import copy from "copy-to-clipboard"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { iconSwapVariants } from "@/lib/animation-variants"
import styles from "./component-preview.module.css"

interface ComponentPreviewProps {
  preview: React.ReactNode
  code: string
  language?: string
}

// Grayscale syntax highlighting theme
const grayscaleTheme = {
  plain: {
    color: "var(--gray12)",
    fontSize: 12,
    fontFamily: "var(--font-mono)",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "var(--gray9)" },
    },
    {
      types: ["punctuation", "operator"],
      style: { color: "var(--gray9)" },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector", "string"],
      style: { color: "var(--gray11)" },
    },
    {
      types: ["class-name", "function", "tag", "property", "boolean", "number"],
      style: { color: "var(--gray12)" },
    },
  ],
}

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
}

export function ComponentPreview({ preview, code, language = "tsx" }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [copying, setCopying] = useState(false)

  const onCopy = useCallback(() => {
    copy(code)
    setCopying(true)
    setTimeout(() => setCopying(false), 2000)
  }, [code])

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={styles.tab}
            data-active={activeTab === "preview"}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={styles.tab}
            data-active={activeTab === "code"}
            onClick={() => setActiveTab("code")}
          >
            Code
          </button>
        </div>

        {activeTab === "code" && (
          <button className={styles.copyButton} onClick={onCopy} aria-label="Copy code">
            <MotionConfig transition={{ duration: 0.15 }}>
              <AnimatePresence mode="wait" initial={false}>
                {copying ? (
                  <motion.div
                    key="check"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                    >
                      <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionConfig>
            <span>Copy Code</span>
          </button>
        )}
      </div>

      {activeTab === "preview" ? (
        <div className={styles.preview}>{preview}</div>
      ) : (
        <div className={styles.codeWrapper}>
          <Highlight theme={grayscaleTheme} code={code.trim()} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={className}
                style={{
                  ...style,
                  padding: "16px",
                  background: "linear-gradient(to top, var(--gray2), var(--gray1) 16px)",
                  lineHeight: "17px",
                  margin: 0,
                }}
              >
                <code>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </div>
      )}
    </div>
  )
}
