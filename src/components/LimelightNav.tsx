import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import {
  Home,
  User,
  GraduationCap,
  Code2,
  FolderKanban,
  Server,
  Gamepad2,
  Mail,
} from 'lucide-react';

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

export type NavItem = {
  id: string;
  label: string;
  icon: React.ReactElement;
  onClick?: () => void;
};

// ------------------------------------------------------------
// Configuration per Viewport Mode
// ------------------------------------------------------------

type ViewportMode = 'ultra-compact' | 'mobile' | 'desktop';

const getViewportMode = (width: number): ViewportMode => {
  if (width < 360) return 'ultra-compact';
  if (width < 640) return 'mobile';
  return 'desktop';
};

const getCompactLabelWidth = (id: string): number => {
  switch (id) {
    case 'education':
      return 62;
    case 'projects':
    case 'homelab':
      return 52;
    case 'hobbies':
    case 'contact':
      return 48;
    case 'skills':
    case 'about':
    case 'home':
    default:
      return 42;
  }
};

const NAV_SCROLL_OFFSET = 75;

// ------------------------------------------------------------
// Smooth scroll helper
// ------------------------------------------------------------

const scrollToSection = (id: string) => {
  const target = document.getElementById(id);

  if (!target) return;

  const targetTop =
    target.getBoundingClientRect().top +
    window.scrollY -
    NAV_SCROLL_OFFSET;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });

  window.history.replaceState(null, '', `#${id}`);
};

// ------------------------------------------------------------
// Default Portfolio Navigation Items
// ------------------------------------------------------------

export const defaultPortfolioNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />,
    onClick: () => scrollToSection('home'),
  },
  {
    id: 'about',
    label: 'About',
    icon: <User className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />,
    onClick: () => scrollToSection('about'),
  },
  {
    id: 'education',
    label: 'Education',
    icon: <GraduationCap className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />,
    onClick: () => scrollToSection('education'),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: <Code2 className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />,
    onClick: () => scrollToSection('skills'),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <FolderKanban className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />,
    onClick: () => scrollToSection('projects'),
  },
  {
    id: 'homelab',
    label: 'Homelab',
    icon: <Server className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />,
    onClick: () => scrollToSection('homelab'),
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    icon: <Gamepad2 className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />,
    onClick: () => scrollToSection('hobbies'),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: <Mail className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />,
    onClick: () => scrollToSection('contact'),
  },
];

// ------------------------------------------------------------
// Props
// ------------------------------------------------------------

export type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
};

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

export const LimelightNav: React.FC<LimelightNavProps> = ({
  items = defaultPortfolioNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className = '',
  limelightClassName = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const [viewportMode, setViewportMode] = useState<ViewportMode>(() => {
    if (typeof window !== 'undefined') {
      return getViewportMode(window.innerWidth);
    }
    return 'desktop';
  });

  // DOM references
  const navRef = useRef<HTMLElement | null>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeIndexRef = useRef(defaultActiveIndex);

  // Scroll coordination
  const pendingScrollIndexRef = useRef<number | null>(null);
  const unlockScrollTimerRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const onTabChangeRef = useRef(onTabChange);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    onTabChangeRef.current = onTabChange;
  }, [onTabChange]);

  // Handle screen resize & breakpoint mode
  useEffect(() => {
    const handleResize = () => {
      const mode = getViewportMode(window.innerWidth);
      setViewportMode(mode);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ----------------------------------------------------------
  // Limelight Motion Values
  // ----------------------------------------------------------
  const limelightX = useMotionValue(-100);
  const limelightWidth = useMotionValue(32);

  const smoothLimelightX = useSpring(limelightX, {
    stiffness: 440,
    damping: 36,
    mass: 0.6,
  });

  const smoothLimelightWidth = useSpring(limelightWidth, {
    stiffness: 400,
    damping: 34,
    mass: 0.6,
  });

  // ----------------------------------------------------------
  // Update Limelight geometry based on actual visible content
  // ----------------------------------------------------------
  const updateLimelight = useCallback(() => {
    const nav = navRef.current;
    const activeItem = navItemRefs.current[activeIndexRef.current];

    if (!nav || !activeItem) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const iconEl = activeItem.querySelector('[data-nav-icon]');
    const labelEl = activeItem.querySelector('[data-nav-label]');

    if (!iconEl) {
      const itemRect = activeItem.getBoundingClientRect();
      limelightX.set(itemRect.left - navRect.left + 2);
      limelightWidth.set(Math.max(28, itemRect.width - 4));
      if (!isReady) setIsReady(true);
      return;
    }

    const iconRect = iconEl.getBoundingClientRect();
    const contentLeft = iconRect.left;
    let contentRight = iconRect.right;

    if (labelEl) {
      const labelRect = labelEl.getBoundingClientRect();
      const labelContainer = labelEl.closest('div');

      if (labelContainer) {
        const containerRect = labelContainer.getBoundingClientRect();
        if (containerRect.width > 1 && labelRect.width > 0) {
          contentRight = Math.min(labelRect.right, containerRect.right);
        }
      }
    }

    // Tight controlled padding around icon + label
    const padding = viewportMode === 'ultra-compact' ? 3 : 4.5;
    const targetX = contentLeft - navRect.left - padding;
    const targetWidth = Math.max(24, contentRight - contentLeft + padding * 2);

    limelightX.set(targetX);
    limelightWidth.set(targetWidth);

    if (!isReady) {
      setIsReady(true);
    }
  }, [isReady, limelightWidth, limelightX, viewportMode]);

  // Initial layout measurement
  useLayoutEffect(() => {
    if (!items.length) return;

    const frame = window.requestAnimationFrame(() => {
      updateLimelight();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, items.length, updateLimelight, viewportMode]);

  // Tracking frames during animated spring expansion
  useEffect(() => {
    if (!items.length) return;

    let frame = 0;
    const start = performance.now();

    const track = (now: number) => {
      updateLimelight();
      if (now - start < 500) {
        frame = window.requestAnimationFrame(track);
      }
    };

    frame = window.requestAnimationFrame(track);
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, items.length, updateLimelight, viewportMode]);

  // ResizeObserver for DOM size shifts
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateLimelight();
    });

    observer.observe(nav);
    navItemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [items, updateLimelight]);

  // ----------------------------------------------------------
  // Section Scroll Detection
  // ----------------------------------------------------------
  const detectActiveSection = useCallback(() => {
    const triggerY = Math.min(window.innerHeight * 0.34, 300);

    const sections = items
      .map((item, index) => {
        const element = document.getElementById(String(item.id));
        if (!element) return null;
        return {
          index,
          rect: element.getBoundingClientRect(),
        };
      })
      .filter((v): v is { index: number; rect: DOMRect } => Boolean(v));

    if (!sections.length) return 0;

    // Bottom of page detection
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 16
    ) {
      return sections[sections.length - 1].index;
    }

    const containing = sections.find(
      ({ rect }) => rect.top <= triggerY && rect.bottom > triggerY
    );

    if (containing) {
      return containing.index;
    }

    let closestIndex = sections[0].index;
    let closestDistance = Infinity;

    sections.forEach(({ index, rect }) => {
      const distance = Math.abs(rect.top - triggerY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [items]);

  // Scroll listener
  useEffect(() => {
    if (!items.length) return;

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;

        const detectedIndex = detectActiveSection();
        const pendingIndex = pendingScrollIndexRef.current;

        if (pendingIndex !== null) {
          if (detectedIndex === pendingIndex) {
            pendingScrollIndexRef.current = null;
            if (unlockScrollTimerRef.current !== null) {
              window.clearTimeout(unlockScrollTimerRef.current);
              unlockScrollTimerRef.current = null;
            }
          }
          return;
        }

        if (detectedIndex !== activeIndexRef.current) {
          activeIndexRef.current = detectedIndex;
          setActiveIndex(detectedIndex);
          onTabChangeRef.current?.(detectedIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [detectActiveSection, items.length]);

  useEffect(() => {
    return () => {
      if (unlockScrollTimerRef.current !== null) {
        window.clearTimeout(unlockScrollTimerRef.current);
      }
    };
  }, []);

  // ----------------------------------------------------------
  // Click Handler
  // ----------------------------------------------------------
  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (index === activeIndexRef.current) {
      itemOnClick?.();
      return;
    }

    activeIndexRef.current = index;
    setActiveIndex(index);
    onTabChangeRef.current?.(index);

    pendingScrollIndexRef.current = index;
    itemOnClick?.();

    if (unlockScrollTimerRef.current !== null) {
      window.clearTimeout(unlockScrollTimerRef.current);
    }

    unlockScrollTimerRef.current = window.setTimeout(() => {
      pendingScrollIndexRef.current = null;
      unlockScrollTimerRef.current = null;
    }, 1500);
  };

  if (!items.length) return null;

  // Calculate widths for active / inactive items based on responsive mode
  const getItemWidth = (item: NavItem, isActive: boolean) => {
    if (viewportMode === 'ultra-compact') {
      // 320px - 359px: All 8 icons fit comfortably in a single centered row
      return isActive ? 36 : 34;
    }

    if (viewportMode === 'mobile') {
      // 360px - 639px: Compact label expansion
      if (!isActive) return 34;
      const labelW = getCompactLabelWidth(item.id);
      return 34 + 4 + labelW;
    }

    // Desktop (>= 640px)
    if (!isActive) return 42;
    return 42 + 6 + 68;
  };

  const getLabelSlotWidth = (item: NavItem) => {
    if (viewportMode === 'ultra-compact') return 0;
    if (viewportMode === 'mobile') return getCompactLabelWidth(item.id);
    return 68;
  };

  const getLabelGap = () => {
    if (viewportMode === 'ultra-compact') return 0;
    if (viewportMode === 'mobile') return 4;
    return 6;
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Main navigation"
      className={`
        fixed
        left-1/2
        top-2.5
        sm:top-4
        z-50
        -translate-x-1/2

        max-w-[calc(100vw-16px)]
        sm:max-w-[calc(100vw-32px)]

        overflow-hidden
        rounded-full

        border
        border-white/[0.12]

        bg-[#09090b]/85

        backdrop-blur-2xl
        backdrop-saturate-150

        shadow-[0_10px_35px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)]

        ${className}
      `}
      style={{
        top: 'max(0.6rem, env(safe-area-inset-top, 0.6rem))',
      }}
    >
      {/* Subtle glass reflection gradient */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-full
          bg-[radial-gradient(circle_at_50%_-60%,rgba(255,255,255,0.14),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]
        "
      />

      {/* Navigation items row */}
      <div
        className="
          relative
          flex
          items-center
          gap-0.5
          sm:gap-1
          p-1
          sm:p-1.5
          overflow-x-hidden
          touch-pan-x
        "
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const targetWidth = getItemWidth(item, isActive);
          const labelSlotWidth = getLabelSlotWidth(item);
          const labelGap = getLabelGap();

          return (
            <motion.a
              key={item.id}
              ref={(element) => {
                navItemRefs.current[index] = element;
              }}
              href={`#${item.id}`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault();
                handleItemClick(index, item.onClick);
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                width: targetWidth,
              }}
              transition={{
                width: {
                  type: 'spring',
                  stiffness: 380,
                  damping: 32,
                  mass: 0.7,
                },
              }}
              className="
                relative
                flex
                h-8.5
                sm:h-10
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                px-1.5
                sm:px-2.5
                cursor-pointer
                select-none
                focus-visible:outline-none
                focus-visible:ring-1
                focus-visible:ring-white/40
                touch-manipulation
              "
            >
              {/* Icon */}
              <span
                data-nav-icon
                className={`
                  relative
                  z-20
                  flex
                  shrink-0
                  items-center
                  justify-center
                  transition-[color,opacity,transform]
                  duration-200
                  ease-out
                  ${
                    isActive
                      ? 'scale-[1.05] text-white opacity-100'
                      : 'text-zinc-400 opacity-60 hover:text-zinc-200 hover:opacity-95'
                  }
                `}
              >
                {item.icon}
              </span>

              {/* Active label (collapses to 0 in ultra-compact or inactive) */}
              <motion.div
                initial={false}
                animate={{
                  width: isActive ? labelSlotWidth : 0,
                  opacity: isActive && labelSlotWidth > 0 ? 1 : 0,
                  marginLeft: isActive && labelSlotWidth > 0 ? labelGap : 0,
                }}
                transition={{
                  width: {
                    type: 'spring',
                    stiffness: 380,
                    damping: 32,
                    mass: 0.7,
                  },
                  opacity: { duration: 0.18 },
                  marginLeft: { duration: 0.18 },
                }}
                className="
                  relative
                  z-20
                  flex
                  h-full
                  shrink-0
                  items-center
                  overflow-hidden
                "
              >
                <span
                  data-nav-label
                  className="
                    block
                    whitespace-nowrap
                    text-[11px]
                    sm:text-xs
                    font-medium
                    leading-none
                    tracking-tight
                    text-white
                  "
                >
                  {item.label}
                </span>
              </motion.div>
            </motion.a>
          );
        })}

        {/* Persistent limelight spanning the exact active item width */}
        <motion.div
          aria-hidden="true"
          style={{
            x: smoothLimelightX,
            width: smoothLimelightWidth,
          }}
          className={`
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-[3.5px]
            sm:h-[4.5px]
            rounded-full
            bg-white
            shadow-[0_20px_16px_rgba(255,255,255,0.4)]
            transition-opacity
            duration-150
            ${isReady ? 'opacity-100' : 'opacity-0'}
            ${limelightClassName}
          `}
        >
          {/* Subtle soft beam shining downward inside the pill */}
          <div
            className="
              pointer-events-none
              absolute
              left-[-20%]
              top-[3px]
              h-10
              sm:h-12
              w-[140%]
              [clip-path:polygon(10%_100%,25%_0,75%_0,90%_100%)]
              bg-gradient-to-b
              from-white/25
              to-transparent
            "
          />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default LimelightNav;
