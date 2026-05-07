"use client";

import { useEffect, useState } from "react";

interface Props {
  user: string;
  domain: string;
  className?: string;
  asLink?: boolean;
  prefix?: string;
}

export default function ObfuscatedEmail({
  user,
  domain,
  className,
  asLink = false,
  prefix = "",
}: Props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(true);
  }, []);

  if (!revealed) {
    return (
      <span className={className} aria-hidden="true">
        {prefix}contact us
      </span>
    );
  }

  const email = `${user}@${domain}`;

  if (asLink) {
    return (
      <a href={`mailto:${email}`} className={className}>
        {prefix}
        {email}
      </a>
    );
  }

  return (
    <span className={className}>
      {prefix}
      {email}
    </span>
  );
}
