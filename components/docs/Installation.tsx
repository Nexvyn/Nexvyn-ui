"use client"

import React, { useCallback, useState } from "react"
import copy from "copy-to-clipboard"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { CopyIcon } from "@/components/ui/icons/static/CopyIcon"
import { CheckIcon } from "@/components/ui/icons/static/CheckIcon"
import { iconSwapVariants } from "@/lib/animation-variants"
import styles from "./installation.module.css"

interface InstallationProps {
  command?: string
}

export function Installation({ command = "npm install your-package" }: InstallationProps) {
  const [copying, setCopying] = useState<number>(0)

  const onCopy = useCallback(() => {
    copy(command)
    setCopying((c) => c + 1)
    setTimeout(() => {
      setCopying((c) => c - 1)
    }, 2000)
  }, [command])

  return (
    <code className={styles.code} onClick={onCopy}>
      {command}
      <button
        className={styles.copy}
        onClick={(e) => {
          e.stopPropagation()
          onCopy()
        }}
        aria-label="Copy installation command"
      >
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
    </code>
  )
}
