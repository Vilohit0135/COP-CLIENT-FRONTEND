'use client';

import dynamic from 'next/dynamic';

const GoogleOAuthProvider = dynamic(
  () => import('@react-oauth/google').then(m => ({ default: m.GoogleOAuthProvider })),
  { ssr: false }
);

export default function OAuthProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
