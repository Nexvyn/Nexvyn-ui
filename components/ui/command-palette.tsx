"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, File, X, ArrowRight, Sparkles } from "lucide-react";

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
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg">
            <Command
              className="rounded-xl border border-border bg-background shadow-2xl overflow-hidden"
              shouldFilter={false}
            >
              <div className="flex items-center border-b border-border px-3">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search components, docs..."
                  className="flex-1 h-12 px-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                {filteredItems.filter((i) => i.type === "component").length >
                  0 && (
                  <Command.Group heading="Components">
                    <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      Components
                    </p>
                    {filteredItems
                      .filter((item) => item.type === "component")
                      .map((item) => (
                        <Command.Item
                          key={item.url}
                          value={item.title}
                          onSelect={() => handleSelect(item.url)}
                          className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-muted data-[selected=true]:bg-muted"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.title}
                            </p>
                            {item.description && (
                              <p className="text-xs text-muted-foreground truncate">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </Command.Item>
                      ))}
                  </Command.Group>
                )}

                {filteredItems.filter((i) => i.type === "doc").length > 0 && (
                  <Command.Group heading="Documentation">
                    <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      Documentation
                    </p>
                    {filteredItems
                      .filter((item) => item.type === "doc")
                      .map((item) => (
                        <Command.Item
                          key={item.url}
                          value={item.title}
                          onSelect={() => handleSelect(item.url)}
                          className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-muted data-[selected=true]:bg-muted"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted text-muted-foreground">
                            <File className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.title}
                            </p>
                            {item.description && (
                              <p className="text-xs text-muted-foreground truncate">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </Command.Item>
                      ))}
                  </Command.Group>
                )}
              </Command.List>

              <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border">↵</kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border">
                    Esc
                  </kbd>
                  <span>Close</span>
                </div>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
