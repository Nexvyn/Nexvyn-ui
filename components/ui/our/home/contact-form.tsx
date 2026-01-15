
"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/core/button"
import { X, Send, Loader2, Link2, ImagePlus, Trash2 } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { FeedbackIcon } from "@/components/ui/icons/animated/feedback-icon"

const MotionButton = motion(Button)
const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL

export function FeedbackForm({ onSuccess, autoFocus = false }: { onSuccess?: () => void, autoFocus?: boolean }) {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    link: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const transitionProps = {
    duration: 0.2,
    ease: "easeOut" as const,
  }

  const processFile = (file: File) => {
    if (file.size > 8 * 1024 * 1024) {
      alert("Image must be smaller than 8MB")
      return
    }
    setImage(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }
      processFile(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const submitForm = async () => {
    if (!formData.message.trim()) return

    setIsSubmitting(true)

    try {
      if (DISCORD_WEBHOOK_URL) {
        const embed = {
          title: "📬 New Feedback",
          color: 0x5865f2, // Discord blurple
          fields: [
            ...(formData.email ? [{ name: "Email", value: formData.email, inline: true }] : []),
            { name: "Message", value: formData.message },
            ...(formData.link ? [{ name: "Link", value: formData.link, inline: true }] : []),
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "nexvyn/ui Feedback",
          },
        }

        if (image) {
          const formDataToSend = new FormData()
          formDataToSend.append("file", image)
          formDataToSend.append("payload_json", JSON.stringify({ embeds: [embed] }))

          await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            body: formDataToSend,
          })
        } else {
          await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [embed] }),
          })
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        setFormData({ email: "", message: "", link: "" })
        setShowLinkInput(false)
        removeImage()
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("Failed to send feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    submitForm()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      submitForm()
    }
  }

  // Handle global paste events (needs to be attached to window/document only when this component is focused or active?)
  // For safety/Simplicity in this refactor, we might want to attach it to the container or window if we can control it.
  // But let's keep it simple for now and attach paste handler to the textarea/form container for more scoped pasting
  // OR keep the window listener if it's meant to be global when the form is visible.
  // Since it's reused in command palette, window listener might be tricky if multiple exist.
  // Let's attach to the textarea for paste.

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.type.startsWith("image/")) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) {
          processFile(file)
        }
        break
      }
    }
  }


  return (
    <AnimatePresence mode="wait">
      {showSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col items-center justify-center py-8"
        >
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <svg
              className="size-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-medium">Thank you!</h3>
          <p className="text-muted-foreground text-sm">
            Your feedback has been sent successfully.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
          onPaste={handlePaste}
        >
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              placeholder="nexvyndev.gmail.com"
              className="placeholder:text-muted-foreground focus:ring-primary/20 w-full rounded-lg border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              Message <span className="text-destructive">*</span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              onKeyDown={handleKeyDown}
              placeholder="Share your feedback, suggestions, or report an issue..."
              rows={4}
              className="placeholder:text-muted-foreground focus:ring-primary/20 w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              required
              autoFocus={autoFocus}
            />
          </div>

          {/* Link Input (toggleable) */}
          <AnimatePresence>
            {showLinkInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="link" className="mb-1.5 block text-sm font-medium">
                  Link <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      link: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="placeholder:text-muted-foreground focus:ring-primary/20 w-full rounded-lg border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Preview */}
          <AnimatePresence>
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative overflow-hidden rounded-lg border"
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-auto max-h-48 w-full object-contain"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 size-8"
                  onClick={removeImage}
                >
                  <Trash2 className="size-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attachment buttons */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground group"
              onClick={() => setShowLinkInput(!showLinkInput)}
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link2 className="mr-1.5 size-4" />
              </motion.div>
              Add Link
            </Button>
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground cursor-pointer group"
                asChild
              >
                <span>
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-block"
                  >
                    <ImagePlus className="mr-1.5 size-4" />
                  </motion.div>
                  Add Image
                </span>
              </Button>
            </label>
          </div>

          {/* Submit Button */}
          <MotionButton
            type="submit"
            className="w-full"
            disabled={isSubmitting || !formData.message.trim()}
            layout
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSubmitting ? (
                <motion.div
                  key="submitting"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transitionProps}
                >
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending...
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transitionProps}
                >
                  <Send className="mr-2 size-4" />
                  Send Feedback
                </motion.div>
              )}
            </AnimatePresence>
          </MotionButton>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export function ContactFormExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const transitionProps = {
    duration: 0.2,
    ease: "easeOut" as const,
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="btn-3d size-9 sm:size-10"
        aria-label="Send Feedback"
        onClick={() => setIsOpen(true)}
      >
        <FeedbackIcon className="size-4 sm:size-[18px]" />
      </Button>

      {/* Modal - Portalled to body to escape parent stacking contexts (like overflow-hidden footer) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                  aria-hidden="true"
                />

                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={shouldReduceMotion ? { duration: 0 } : transitionProps}
                  className="fixed top-1/2 left-1/2 z-[10000] w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
                  role="dialog"
                  aria-modal="true"
                >
                  <motion.div
                    layout
                    className="bg-background relative overflow-hidden rounded-xl border p-6 shadow-2xl"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="mb-1 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Send Feedback</h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => setIsOpen(false)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <FeedbackForm onSuccess={() => setIsOpen(false)} autoFocus />
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
