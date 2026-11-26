import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function fadeInOnScroll(element, options = {}) {
  if (!element) return null;
  return gsap.fromTo(
    element,
    { opacity: 0, y: options.y || 40 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: options.start || 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  );
}

export function staggerFadeIn(elements, options = {}) {
  if (!elements || elements.length === 0) return null;
  return gsap.fromTo(
    elements,
    { opacity: 0, y: options.y || 30 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.9,
      stagger: options.stagger || 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: options.trigger || elements[0],
        start: options.start || 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}
