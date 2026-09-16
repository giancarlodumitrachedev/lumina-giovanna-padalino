"use client";

import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { AnchorHTMLAttributes, ReactNode, Suspense } from "react";

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, Omit<LinkProps, 'href'> {
  href: string | object;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

function SmartLinkInner({ children, href, className, onClick, target, rel, ...props }: SmartLinkProps) {
  const searchParams = useSearchParams();
  
  let finalHref = typeof href === "string" ? href : href.toString();
  if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//") && searchParams && searchParams.toString()) {
    const [pathPart, hashPart] = href.split("#");
    const separator = pathPart.includes("?") ? "&" : "?";
    finalHref = `${pathPart}${separator}${searchParams.toString()}${hashPart ? `#${hashPart}` : ""}`;
  }

  return (
    <Link href={finalHref as any} className={className} onClick={onClick} target={target} rel={rel} {...props}>
      {children}
    </Link>
  );
}

export function SmartLink(props: SmartLinkProps) {
  return (
    <Suspense fallback={<Link href={props.href as any} className={props.className} target={props.target} rel={props.rel}>{props.children}</Link>}>
      <SmartLinkInner {...props} />
    </Suspense>
  );
}

