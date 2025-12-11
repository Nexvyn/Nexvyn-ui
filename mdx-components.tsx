import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import CardStackAnimate from "@/components/pixel components/cards";
import { Preview } from "@/components/pixel components/Preview";
import Parallax from "@/components/pixel components/parallax";

import InertiaCards from "@/components/pixel components/inertia";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Register UI components for use in MDX
    Preview,
    CardStackAnimate,
    Parallax,
    InertiaCards,

    ...components,
  };
}
