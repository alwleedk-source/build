import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on animation type
    const initialStyles: Record<string, string> = {
      opacity: '0',
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
    };

    switch (animation) {
      case 'fadeIn':
        initialStyles.opacity = '0';
        break;
      case 'slideUp':
        initialStyles.opacity = '0';
        initialStyles.transform = 'translateY(40px)';
        break;
      case 'slideLeft':
        initialStyles.opacity = '0';
        initialStyles.transform = 'translateX(40px)';
        break;
      case 'slideRight':
        initialStyles.opacity = '0';
        initialStyles.transform = 'translateX(-40px)';
        break;
      case 'scale':
        initialStyles.opacity = '0';
        initialStyles.transform = 'scale(0.9)';
        break;
    }

    Object.assign(element.style, initialStyles);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0) translateX(0) scale(1)';
            }, 50);
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animation, delay, duration, threshold]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
