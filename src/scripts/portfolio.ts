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
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.sectionId ?? ""))
    .filter((section): section is HTMLElement => Boolean(section));

  const setActive = (sectionId: string) => {
    navLinks.forEach((link) => {
      link.classList.toggle("nav-link-active", link.dataset.sectionId === sectionId);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const sectionId = link.dataset.sectionId;
      if (sectionId) setActive(sectionId);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { threshold: 0.2 },
  );

  sections.forEach((section) => observer.observe(section));
};

const initTypewriter = () => {
  const target = document.querySelector<HTMLElement>("[data-typewriter]");
  if (!target) return;

  const phrases = JSON.parse(target.dataset.phrases ?? "[]") as string[];
  if (phrases.length === 0) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = phrases[0];
    return;
  }

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

const initProjectModal = () => {
  const dialog = document.querySelector<HTMLDialogElement>("[data-project-modal]");
  if (!dialog) return;

  const title = dialog.querySelector<HTMLElement>("[data-modal-title]");
  const github = dialog.querySelector<HTMLAnchorElement>("[data-modal-github]");
  const live = dialog.querySelector<HTMLAnchorElement>("[data-modal-live]");
  const description = dialog.querySelector<HTMLElement>("[data-modal-description]");
  const techList = dialog.querySelector<HTMLElement>("[data-modal-tech-list]");
  const closeButtons = dialog.querySelectorAll<HTMLButtonElement>("[data-modal-close]");

  document.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card) => {
    card.addEventListener("click", () => {
      if (title) title.textContent = card.dataset.modalTitle ?? "";
      if (description) description.textContent = card.dataset.modalDescription ?? "";
      dialog.dataset.theme = card.dataset.modalTheme ?? "dark";

      const githubLink = card.dataset.githubLink ?? "https://github.com";
      if (github) github.href = githubLink;

      const liveLink = card.dataset.liveLink ?? "";
      if (live) {
        live.href = liveLink;
        live.hidden = liveLink.length === 0;
      }

      if (techList) {
        const tech = JSON.parse(card.dataset.modalTech ?? "[]") as string[];
        techList.replaceChildren(
          ...tech.map((tag) => {
            const element = document.createElement("span");
            element.className = "project-modal-tag rounded-full px-3 py-1 text-xs font-semibold";
            element.textContent = tag;
            return element;
          }),
        );
      }

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
};

const initParticles = async () => {
  const host = document.getElementById("tsparticles");
  if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
  initProjectModal();
  void initParticles();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
