"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/core/button"
import { MessageSquare, X, Send, Loader2, Link2, ImagePlus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { FaDiscord } from "react-icons/fa6"

const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL
const DISCORD_INVITE = "https://discord.gg/gEdZg3637C"

export function ContactFormExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
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

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!isOpen) return

      const items = e.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.type.startsWith("image/")) {
          e.preventDefault()
          const file = item.getAsFile()
          if (file) {
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
          break
        }
      }
    }

    if (isOpen) {
      document.addEventListener("paste", handlePaste)
    }

    return () => {
      document.removeEventListener("paste", handlePaste)
    }
  }, [isOpen])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

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
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        setIsOpen(false)
        setFormData({ email: "", message: "", link: "" })
        setShowLinkInput(false)
        removeImage()
      }, 2000)
    } catch (error) {
      console.error("Failed to send feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <MessageSquare className="size-4 sm:size-[18px]" />
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
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  className="fixed top-1/2 left-1/2 z-[10000] w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
                >
                  <div className="bg-background relative rounded-xl border p-6 shadow-2xl">
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
                              placeholder="you@example.com"
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
                              placeholder="Share your feedback, suggestions, or report an issue..."
                              rows={4}
                              className="placeholder:text-muted-foreground focus:ring-primary/20 w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                              required
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
                              className="text-muted-foreground"
                              onClick={() => setShowLinkInput(!showLinkInput)}
                            >
                              <Link2 className="mr-1.5 size-4" />
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
                                className="text-muted-foreground cursor-pointer"
                                asChild
                              >
                                <span>
                                  <ImagePlus className="mr-1.5 size-4" />
                                  Add Image
                                </span>
                              </Button>
                            </label>
                            <a
                              href={DISCORD_INVITE}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-auto"
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-[#5865F2]"
                              >
                                <FaDiscord className="mr-1.5 size-4" />
                                Join Discord
                              </Button>
                            </a>
                          </div>

                          {/* Submit Button */}
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting || !formData.message.trim()}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 size-4" />
                                Send Feedback
                              </>
                            )}
                          </Button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
