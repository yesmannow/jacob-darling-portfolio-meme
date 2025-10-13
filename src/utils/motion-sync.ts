import Lenis from "lenis";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import anime from "animejs/lib/anime.es.js"; // Temporarily disabled for deployment

gsap.registerPlugin(ScrollTrigger);

// Enhanced Lenis configuration for cinematic scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 35,
});

// Global animation state management
class MotionSync {
  private activeAnimations: Set<any> = new Set();
  private scrollAnimations: Set<gsap.core.Tween> = new Set();
  
  // Register anime.js animation for cleanup
  registerAnime(animation: any) {
    this.activeAnimations.add(animation);
    animation.finished.then(() => {
      this.activeAnimations.delete(animation);
    });
  }

  // Register GSAP animation for cleanup
  registerGsap(animation: gsap.core.Tween) {
    this.scrollAnimations.add(animation);
  }

  // Pause all animations (useful for performance)
  pauseAll() {
    this.activeAnimations.forEach(anim => anim.pause());
    this.scrollAnimations.forEach(anim => anim.pause());
  }

  // Resume all animations
  resumeAll() {
    this.activeAnimations.forEach(anim => anim.play());
    this.scrollAnimations.forEach(anim => anim.resume());
  }

  // Clean up completed animations
  cleanup() {
    this.activeAnimations.clear();
    this.scrollAnimations.forEach(anim => {
      if (!anim.isActive()) {
        this.scrollAnimations.delete(anim);
      }
    });
  }
}

export const motionSync = new MotionSync();

// Enhanced RAF loop with performance monitoring
let lastTime = 0;
function raf(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;
  
  // Throttle if frame rate drops too low
  if (deltaTime < 33) { // ~30fps minimum
    lenis.raf(time);
    ScrollTrigger.update();
  }
  
  // Cleanup every 60 frames
  if (Math.floor(time / 1000) % 1 === 0) {
    motionSync.cleanup();
  }
  
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Cinematic scroll synchronization with enhanced effects
export function useCinematicScrollSync() {
  gsap.utils.toArray<HTMLElement>("[data-scroll-section]").forEach((section) => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        const tween = gsap.to(section, { 
          opacity: 1, 
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out"
        });
        motionSync.registerGsap(tween);
      },
      onLeaveBack: () => {
        const tween = gsap.to(section, { 
          opacity: 0.5, 
          y: 50,
          scale: 0.98,
          filter: "blur(2px)",
          duration: 0.8,
          ease: "power2.out"
        });
        motionSync.registerGsap(tween);
      },
    });
  });
}

// Cinematic page transitions
export function createPageTransition(element: HTMLElement, direction: 'in' | 'out') {
  const isEntering = direction === 'in';
  
  // Temporarily using GSAP instead of anime.js for deployment
  return gsap.to(element, {
    opacity: isEntering ? 1 : 0,
    y: isEntering ? 0 : -50,
    scale: isEntering ? 1 : 1.05,
    filter: isEntering ? 'blur(0px)' : 'blur(10px)',
    duration: 0.8,
    ease: 'power2.out',
    onStart: () => {
      if (isEntering) {
        element.style.pointerEvents = 'none';
      }
    },
    onComplete: () => {
      element.style.pointerEvents = 'auto';
    }
  });
}

// Synchronized hover effects
export function createHoverSync(element: HTMLElement, options: {
  scale?: number;
  y?: number;
  glow?: boolean;
  duration?: number;
}) {
  const { scale = 1.05, y = -5, glow = true, duration = 300 } = options;
  
  const enterAnimation = () => {
    const gsapInstance = gsap.to(element, {
      scale: scale,
      y: y,
      filter: glow ? 'drop-shadow(0 10px 20px rgba(136, 171, 242, 0.3))' : 'none',
      duration: duration / 1000,
      ease: 'power2.out'
    });
    motionSync.registerGsap(gsapInstance);
  };

  const leaveAnimation = () => {
    const gsapInstance = gsap.to(element, {
      scale: 1,
      y: 0,
      filter: 'drop-shadow(0 0 0px rgba(136, 171, 242, 0))',
      duration: duration / 1000,
      ease: 'power2.out'
    });
    motionSync.registerGsap(gsapInstance);
  };

  element.addEventListener('mouseenter', enterAnimation);
  element.addEventListener('mouseleave', leaveAnimation);

  return () => {
    element.removeEventListener('mouseenter', enterAnimation);
    element.removeEventListener('mouseleave', leaveAnimation);
  };
}

// Performance monitoring
export function enablePerformanceMode() {
  // Reduce animation quality on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    gsap.config({ force3D: false });
    // anime.suspendWhenDocumentHidden = true; // Not available in this version
  }
  
  // Pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      motionSync.pauseAll();
    } else {
      motionSync.resumeAll();
    }
  });
}

export default lenis;
