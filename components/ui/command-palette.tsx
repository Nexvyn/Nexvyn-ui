"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, File, Sparkles } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface SearchItem {
  title: string;
  description?: string;
  url: string;
  type: "component" | "doc" | "guide";
}

const searchItems: SearchItem[] = [
  // Components
  {
    title: "Button",
    description: "A customizable button component",
    url: "/docs/components/button",
    type: "component",
  },
  {
    title: "Card",
    description: "A card container component",
    url: "/docs/components/card",
    type: "component",
  },
  {
    title: "Input",
    description: "An input field component",
    url: "/docs/components/input",
    type: "component",
  },
  // Getting Started
  {
    title: "Introduction",
    description: "Get started with Pixel Perfect UI",
    url: "/docs",
    type: "doc",
  },
  {
    title: "Installation",
    description: "How to install and set up",
    url: "/docs/getting-started/installation",
    type: "doc",
  },
  {
    title: "Quick Start",
    description: "Quick start guide",
    url: "/docs/getting-started/quick-start",
    type: "doc",
  },
  // Other
  {
    title: "Sponsors",
    description: "Our sponsors",
    url: "/docs/sponsors",
    type: "doc",
  },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  const filteredItems = React.useMemo(() => {
    if (!search) return searchItems;
    const lower = search.toLowerCase();
    return searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description?.toLowerCase().includes(lower)
    );
  }, [search]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    setSearch("");
    router.push(url);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-lg border border-border transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <div className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-background rounded border border-border">
          <span className="text-xs">ctrl +</span>K
        </div>
      </button>

      {open && (
        <>
          <div className=" w-full max-w-lg  fixed  top-1/2 right-1/2 translate-y-1/2 translate-x-1/2">
            <Command className="rounded-xl  border border-border bg-background shadow-2xl overflow-hidden">
              <CommandInput
                value={search}
                onValueChange={setSearch}
                placeholder="Search components, docs..."
                className="text-sm"
                autoFocus
              />
              <CommandList className="max-h-80">
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </CommandEmpty>

                {filteredItems.filter((i) => i.type === "component").length >
                  0 && (
                  <CommandGroup heading="Components">
                    {filteredItems
                      .filter((item) => item.type === "component")
                      .map((item) => (
                        <CommandItem
                          key={item.url}
                          value={item.title}
                          onSelect={() => handleSelect(item.url)}
                        >
                          <Sparkles className="h-4 w-4 mr-2 text-primary" />
                          <span>{item.title}</span>
                          {item.description && (
                            <span className="ml-auto text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          )}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}

                {filteredItems.filter((i) => i.type === "component").length >
                  0 &&
                  filteredItems.filter((i) => i.type === "doc").length > 0 && (
                    <CommandSeparator />
                  )}

                {filteredItems.filter((i) => i.type === "doc").length > 0 && (
                  <CommandGroup heading="Documentation">
                    {filteredItems
                      .filter((item) => item.type === "doc")
                      .map((item) => (
                        <CommandItem
                          key={item.url}
                          value={item.title}
                          onSelect={() => handleSelect(item.url)}
                        >
                          <File className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{item.title}</span>
                          {item.description && (
                            <span className="ml-auto text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          )}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </div>
        </>
      )}
    </>
  );
}
