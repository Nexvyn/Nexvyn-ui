"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavItem {
  title: string;
  href?: string;
  items?: SidebarNavItem[];
  icon?: React.ReactNode;
}

interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3 p-4">
      {items.map((item, index) => (
        <SidebarNavItem key={index} item={item} pathname={pathname} />
      ))}
    </nav>
  );
}

function SidebarNavItem({
  item,
  pathname,
}: {
  item: SidebarNavItem;
  pathname: string;
}) {
  const isActive = item.href === pathname;
  const hasChildren = item.items && item.items.length > 0;

  if (hasChildren) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center text-sm font-medium ">
          {item.icon}
          {item.title}
        </div>
        <div className="flex flex-col    ">
          {item.items?.map((subItem, index) => (
            <SidebarNavItem key={index} item={subItem} pathname={pathname} />
          ))}
        </div>
      </div>
    );
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1  px-3 py-2 text-sm transition-colors ",
          isActive
            ? "bg-primary/10 text-primary font-medium  border-l-2"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        {item.icon}
        {item.title}
      </Link>
    );
  }

  return (
    <span className="flex items-center gap-1  text-sm font-medium text-foreground">
      {item.icon}
      {item.title}
    </span>
  );
}

export type { SidebarNavItem };
