"use client"

import { motion } from "motion/react"
import { Heart, Code, Zap, Globe, Award } from "lucide-react"

interface Sponsor {
  name: string
  description: string
  url: string
  tier: "platinum" | "gold" | "silver" | "bronze"
  logo?: string
}

const sponsors: Sponsor[] = [
  // Add your sponsors here
  // Example:
  // {
  //   name: "Company Name",
  //   description: "Brief description of the sponsor",
  //   url: "https://example.com",
  //   tier: "platinum"
  // }
]

const tierConfig = {
  platinum: {
    title: "Platinum Sponsors",
    icon: Award,
    color: "from-slate-200 to-slate-400",
    textColor: "text-slate-700",
    borderColor: "border-slate-300",
    iconColor: "text-slate-400",
  },
  gold: {
    title: "Gold Sponsors",
    icon: Zap,
    color: "from-yellow-200 to-yellow-400",
    textColor: "text-yellow-900",
    borderColor: "border-yellow-300",
    iconColor: "text-yellow-500",
  },
  silver: {
    title: "Silver Sponsors",
    icon: Globe,
    color: "from-gray-200 to-gray-300",
    textColor: "text-gray-700",
    borderColor: "border-gray-300",
    iconColor: "text-gray-400",
  },
  bronze: {
    title: "Bronze Sponsors",
    icon: Code,
    color: "from-orange-200 to-orange-300",
    textColor: "text-orange-900",
    borderColor: "border-orange-300",
    iconColor: "text-orange-500",
  },
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const config = tierConfig[sponsor.tier]

  return (
    <motion.a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border-2 ${config.borderColor} bg-gradient-to-br ${config.color} p-6 shadow-md transition-all duration-300 hover:shadow-xl`}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div>
        {sponsor.logo ? (
          <img src={sponsor.logo} alt={sponsor.name} className="mb-4 h-12 w-auto object-contain" />
        ) : (
          <div
            className={`mb-4 h-12 w-12 rounded-lg ${config.iconColor} flex items-center justify-center bg-white/50`}
          >
            <config.icon className="h-6 w-6" />
          </div>
        )}
        <h3 className={`text-lg font-bold ${config.textColor} mb-2`}>{sponsor.name}</h3>
        <p className={`text-sm ${config.textColor} opacity-80`}>{sponsor.description}</p>
      </div>

      <div
        className={`mt-4 flex items-center ${config.textColor} opacity-0 transition-opacity group-hover:opacity-100`}
      >
        <span className="text-sm font-medium">Visit website</span>
        <span className="ml-2">→</span>
      </div>
    </motion.a>
  )
}

export function SponsorsPageContent() {
  const groupedSponsors = {
    platinum: sponsors.filter((s) => s.tier === "platinum"),
    gold: sponsors.filter((s) => s.tier === "gold"),
    silver: sponsors.filter((s) => s.tier === "silver"),
    bronze: sponsors.filter((s) => s.tier === "bronze"),
  }

  const hasSponsors = sponsors.length > 0

  return (
    <div className="my-8 w-full space-y-12 sm:my-12 sm:space-y-16">
      {!hasSponsors ? (
        <motion.div
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-12 sm:p-16 dark:border-blue-800 dark:from-blue-950/20 dark:to-indigo-950/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="mb-4 h-16 w-16 text-blue-400 dark:text-blue-500" />
          <h3 className="mb-2 text-center text-xl font-bold text-gray-800 sm:text-2xl dark:text-gray-200">
            Be Our First Sponsor!
          </h3>
          <p className="max-w-md text-center text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Help us build amazing components for the community. Your support makes a difference.
          </p>
        </motion.div>
      ) : (
        <>
          {(Object.keys(groupedSponsors) as Array<keyof typeof groupedSponsors>).map((tier) => {
            const tierSponsors = groupedSponsors[tier]
            if (tierSponsors.length === 0) return null

            const config = tierConfig[tier]

            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex items-center gap-3 sm:mb-8">
                  <config.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${config.iconColor}`} />
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
                    {config.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {tierSponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <SponsorCard sponsor={sponsor} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </>
      )}

      {/* Support CTA */}
      <motion.div
        className="relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 shadow-xl sm:p-12"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Heart className="mb-4 h-12 w-12 text-white/90 sm:mb-6 sm:h-16 sm:w-16" />
        <h3 className="mb-3 text-center text-xl font-bold text-white sm:mb-4 sm:text-2xl lg:text-3xl">
          Want to Support Pixel Perfect?
        </h3>
        <p className="mb-6 max-w-2xl px-4 text-center text-sm text-white/90 sm:mb-8 sm:text-base lg:text-lg">
          Your sponsorship helps us maintain and expand this library, create better documentation,
          and support the open-source community. Every contribution makes a difference!
        </p>
        <motion.a
          href="https://github.com/Nexvyn/ui.git"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition-colors hover:bg-gray-50 sm:px-8 sm:py-4 sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Become a Sponsor
        </motion.a>
      </motion.div>
    </div>
  )
}
