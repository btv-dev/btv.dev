"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
}

export function CustomLink({ href, children, className, scroll = true }: CustomLinkProps) {
  return (
    <Link 
      href={href}
      scroll={scroll}
      className={cn(
        "relative w-fit border-b-2 border-[#cef1f6] [box-shadow:0px_-5px_0px_#cef1f6_inset] transition-all duration-200 group inline-flex items-center gap-1 pl-1 pr-2",
        "hover:[box-shadow:0px_-28px_0px_#cef1f6_inset]",
        className
      )}
    >
      {children}
      <Sparkles className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}