"use client"

/**
 * Example animated Geist icons
 *
 * This file shows how to create reusable animated icon components
 * from the Geist UI icon library.
 */

import {
  Download,
  Upload,
  Check,
  X,
  Github,
  Search,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
  Heart,
  Star,
  Bell,
  Mail,
  Code,
  Terminal,
  File,
  Folder,
  Lock,
  Unlock,
  Eye,
  EyeOff,
} from "@geist-ui/icons"
import { createAnimatedIcon } from "./animated-geist"

// Action icons with bounce
export const AnimatedDownload = createAnimatedIcon(Download, {
  variant: "bounce",
  size: 20,
})

export const AnimatedUpload = createAnimatedIcon(Upload, {
  variant: "bounce",
  size: 20,
})

export const AnimatedCheck = createAnimatedIcon(Check, {
  variant: "scaleUp",
  size: 20,
})

export const AnimatedX = createAnimatedIcon(X, {
  variant: "popRotate",
  size: 20,
})

// Social & Dev icons with scaleUp
export const AnimatedGithub = createAnimatedIcon(Github, {
  variant: "scaleUp",
  size: 20,
})

export const AnimatedHeart = createAnimatedIcon(Heart, {
  variant: "pulse",
  size: 20,
})

export const AnimatedStar = createAnimatedIcon(Star, {
  variant: "pulse",
  size: 20,
})

// UI icons
export const AnimatedSearch = createAnimatedIcon(Search, {
  variant: "scaleUp",
  size: 20,
})

export const AnimatedSettings = createAnimatedIcon(Settings, {
  variant: "rotate180",
  size: 20,
})

export const AnimatedMenu = createAnimatedIcon(Menu, {
  variant: "press",
  size: 20,
})

// Navigation icons with slideRight
export const AnimatedChevronDown = createAnimatedIcon(ChevronDown, {
  variant: "bounce",
  size: 20,
})

export const AnimatedChevronRight = createAnimatedIcon(ChevronRight, {
  variant: "slideRight",
  size: 20,
})

// Communication icons with bounce
export const AnimatedBell = createAnimatedIcon(Bell, {
  variant: "bounce",
  size: 20,
})

export const AnimatedMail = createAnimatedIcon(Mail, {
  variant: "bounce",
  size: 20,
})

// Code icons
export const AnimatedCode = createAnimatedIcon(Code, {
  variant: "scaleUp",
  size: 20,
})

export const AnimatedTerminal = createAnimatedIcon(Terminal, {
  variant: "scaleUp",
  size: 20,
})

// File management icons
export const AnimatedFile = createAnimatedIcon(File, {
  variant: "popRotate",
  size: 20,
})

export const AnimatedFolder = createAnimatedIcon(Folder, {
  variant: "popRotate",
  size: 20,
})

// Security icons
export const AnimatedLock = createAnimatedIcon(Lock, {
  variant: "press",
  size: 20,
})

export const AnimatedUnlock = createAnimatedIcon(Unlock, {
  variant: "press",
  size: 20,
})

export const AnimatedEye = createAnimatedIcon(Eye, {
  variant: "scaleUp",
  size: 20,
})

export const AnimatedEyeOff = createAnimatedIcon(EyeOff, {
  variant: "scaleUp",
  size: 20,
})
