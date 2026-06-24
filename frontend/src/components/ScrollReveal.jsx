import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal is a helper component that applies animation classes
 * when the element enters the viewport.
 * 
 * @param {React.ReactNode} children - Child elements
 * @param {string} className - Additional CSS classes
 * @param {string} animation - Animation preset name (e.g., 'fade-up', 'slide-in-left')
 * @param {string|number} delay - Animation delay level (1 to 4)
 * @param {number} threshold - Intersection threshold (0.0 to 1.0)
 * @param {boolean} triggerOnce - Whether the animation should trigger only once
 * @param {React.ElementType} as - The HTML element/component to render as (defaults to "div")
 */
const ScrollReveal = ({
  children,
  className = "",
  animation = "fade-up",
  delay = "",
  threshold = 0.12,
  triggerOnce = true,
  as: Component = "div",
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentEl = ref.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, triggerOnce]);

  const animationClass = isVisible ? "visible" : "";
  const delayClass = delay ? `delay-${delay}` : "";
  const combinedClassName = `${animation} ${animationClass} ${delayClass} ${className}`.trim();

  return (
    <Component
      ref={ref}
      className={combinedClassName}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
