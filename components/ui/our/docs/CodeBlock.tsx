"use client"

import React, { useCallback, useState } from "react"
import { Highlight, themes } from "prism-react-renderer"
import copy from "copy-to-clipboard"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import useMeasure from "react-use-measure"
import { CopyIcon } from "@/components/ui/icons/static/CopyIcon"
import { CheckIcon } from "@/components/ui/icons/static/CheckIcon"
import { iconSwapVariants } from "@/lib/animation-variants"
import styles from "./code-block.module.css"

interface CodeBlockProps {
  children: string
  initialHeight?: number
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

export function CodeBlock({ children, initialHeight = 0 }: CodeBlockProps) {
  const [copying, setCopying] = useState<number>(0)
  const [ref, bounds] = useMeasure()

  const onCopy = useCallback(() => {
    copy(children)
    setCopying((c) => c + 1)
    setTimeout(() => {
      setCopying((c) => c - 1)
    }, 2000)
  }, [children])

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.wrapper}>
        <motion.pre
          className={styles.root}
          animate={{ height: bounds.height || initialHeight }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div ref={ref}>
            <Highlight theme={grayscaleTheme} code={children.trim()} language="tsx">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <code className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              )}
            </Highlight>
          </div>
        </motion.pre>
      </div>

      <button className={styles.copyButton} onClick={onCopy} aria-label="Copy code">
        <MotionConfig transition={{ duration: 0.15 }}>
          <AnimatePresence mode="wait" initial={false}>
            {copying > 0 ? (
              <motion.div
                key="check"
                variants={iconSwapVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <CheckIcon />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                variants={iconSwapVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <CopyIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </button>
    </div>
  )
}
