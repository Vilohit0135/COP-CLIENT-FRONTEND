'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // Prevent browser from restoring scroll position automatically
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    let lenis: any = null;
    let observer: MutationObserver | null = null;
    let cancelled = false;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      lenis = new Lenis({ 
        autoRaf: true,
        duration: 1.2,
      });
      lenisRef.current = lenis;

      observer = new MutationObserver(() => {
        const isLocked = document.body.style.overflow === 'hidden';
        if (isLocked) lenis?.stop();
        else lenis?.start();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    };

    init();

    return () => {
      cancelled = true;
      observer?.disconnect();
      lenis?.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [])

  // Force scroll to top on every route change (including back/forward navigation)
  useEffect(() => {
    const scrollToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }

    // Immediate attempt
    scrollToTop();

    // Multiple attempts to ensure we catch the point after DOM update
    const t1 = setTimeout(scrollToTop, 0);
    const t2 = setTimeout(scrollToTop, 50);
    const t3 = setTimeout(scrollToTop, 150);
    const t4 = setTimeout(scrollToTop, 300);

    // Specifically handle popstate (back/forward arrows)
    window.addEventListener('popstate', scrollToTop);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('popstate', scrollToTop);
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
