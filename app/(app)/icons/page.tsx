import { IconsComingSoonClient } from "./coming-soon-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Icons | Coming Soon",
  description:
    "We are crafting high-quality icons to help you build even faster. Stay tuned for updates.",
}

export default function IconsPage() {
  return <IconsComingSoonClient />
}
