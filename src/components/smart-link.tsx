"use client";

import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { AnchorHTMLAttributes, ReactNode, Suspense } from "react";

const DEMO_PARAM_KEYS = ["name", "city", "address", "field"] as const;

interface SmartLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<LinkProps, "href"> {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

function SmartLinkInner({
  children,
  href,
  className,
  onClick,
  target,
  rel,
  ...props
}: SmartLinkProps) {
  const searchParams = useSearchParams();

  let finalHref = href;
  if (href.startsWith("/") && !href.startsWith("//") && searchParams) {
    const preserved = new URLSearchParams();
    for (const key of DEMO_PARAM_KEYS) {
      const value = searchParams.get(key);
      if (value) preserved.set(key, value);
    }

    const preservedStr = preserved.toString();
    if (preservedStr) {
      const [pathPart, hashPart] = href.split("#");
      const separator = pathPart.includes("?") ? "&" : "?";
      finalHref = `${pathPart}${separator}${preservedStr}${
        hashPart ? `#${hashPart}` : ""
      }`;
    }
  }

  return (
    <Link
      href={finalHref}
      className={className}
      onClick={onClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Link>
  );
}

export function SmartLink(props: SmartLinkProps) {
  return (
    <Suspense
      fallback={
        <Link
          href={props.href}
          className={props.className}
          target={props.target}
          rel={props.rel}
        >
          {props.children}
        </Link>
      }
    >
      <SmartLinkInner {...props} />
    </Suspense>
  );
}
