import { motion } from "framer-motion";

/**
 * ScrollReveal is a helper component that applies animations
 * when the element enters the viewport using Framer Motion.
 * 
 * @param {React.ReactNode} children - Child elements
 * @param {string} className - Additional CSS classes
 * @param {string} animation - Animation preset name (e.g., 'fade-up', 'slide-in-left')
 * @param {string|number} delay - Animation delay multiplier
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
  // Map animation names to Framer Motion variant values
  const getVariants = () => {
    switch (animation) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 }
        };
      case "fade-in":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case "slide-in-left":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        };
      case "slide-in-right":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        };
      case "scale-in":
        return {
          hidden: { opacity: 0, scale: 0.92 },
          visible: { opacity: 1, scale: 1 }
        };
      case "reveal-blur":
        return {
          hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  const variants = getVariants();
  const delayNum = delay ? Number(delay) : 0;

  // Resolve dynamic Framer Motion element
  const MotionComponent = typeof Component === "string" ? motion[Component] : motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, amount: threshold }}
      variants={variants}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo (luxury decay curve)
        delay: delayNum * 0.12
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default ScrollReveal;
