import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { particleOptions, type ParticleSizeKey } from "./particle-options";

const sizeKeyForViewport = (): ParticleSizeKey => {
  if (window.innerWidth < 640) return "mobile";
  if (window.innerWidth < 768) return "sm";
  if (window.innerWidth < 1024) return "md";
  if (window.innerWidth < 1280) return "lg";
  if (window.innerWidth < 1536) return "xl";
  return "2xl";
};

const initNavigation = () => {
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
  const sectionIds = [...new Set(navLinks.map((link) => link.dataset.sectionId).filter(Boolean))];
  const sections = sectionIds
    .map((sectionId) => document.getElementById(sectionId ?? ""))
    .filter((section): section is HTMLElement => Boolean(section));

  const setActive = (sectionId: string) => {
    let activeLabel = "Home";

    navLinks.forEach((link) => {
      const isActive = link.dataset.sectionId === sectionId;
      link.classList.toggle("nav-link-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
        activeLabel = link.dataset.navLabel ?? link.textContent?.trim() ?? activeLabel;
      } else {
        link.removeAttribute("aria-current");
      }
    });

    document.querySelectorAll<HTMLElement>("[data-mobile-current]").forEach((label) => {
      label.textContent = activeLabel;
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const sectionId = link.dataset.sectionId;
      if (sectionId) setActive(sectionId);
    });
  });

  let frame = 0;
  const updateActiveSection = () => {
    frame = 0;
    const readingLine = window.innerHeight * 0.35;
    const activeSection =
      sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      }) ??
      sections.reduce<HTMLElement | null>((closest, section) => {
        if (!closest) return section;
        const closestDistance = Math.abs(closest.getBoundingClientRect().top - readingLine);
        const sectionDistance = Math.abs(section.getBoundingClientRect().top - readingLine);
        return sectionDistance < closestDistance ? section : closest;
      }, null);

    if (activeSection) setActive(activeSection.id);
  };

  const scheduleActiveSectionUpdate = () => {
    if (frame !== 0) return;
    frame = window.requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveSectionUpdate);
  scheduleActiveSectionUpdate();
};

const initTypewriter = () => {
  const target = document.querySelector<HTMLElement>("[data-typewriter]");
  if (!target) return;

  const phrases = JSON.parse(target.dataset.phrases ?? "[]") as string[];
  if (phrases.length === 0) return;

  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = true;

  const tick = () => {
    const currentPhrase = phrases[phraseIndex];
    target.textContent = currentPhrase.slice(0, characterIndex);

    if (!deleting && characterIndex === currentPhrase.length) {
      deleting = true;
      window.setTimeout(tick, 5000);
      return;
    }

    if (deleting && characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      window.setTimeout(tick, 250);
      return;
    }

    characterIndex += deleting ? -1 : 1;
    window.setTimeout(tick, deleting ? 80 : 60);
  };

  window.setTimeout(tick, 2000);
};

const initParticles = async () => {
  const host = document.getElementById("tsparticles");
  if (!host) return;

  await loadSlim(tsParticles);

  let activeKey: ParticleSizeKey | null = null;
  let activeContainer: Awaited<ReturnType<typeof tsParticles.load>> | undefined;

  const loadForViewport = async () => {
    const nextKey = sizeKeyForViewport();
    if (nextKey === activeKey) return;

    activeKey = nextKey;
    activeContainer?.destroy();
    activeContainer = await tsParticles.load({
      id: "tsparticles",
      options: particleOptions[nextKey],
    });
  };

  await loadForViewport();

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      void loadForViewport();
    }, 200);
  });
};

const init = () => {
  initNavigation();
  initTypewriter();
  void initParticles();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
