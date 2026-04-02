import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Modal } from "@mantine/core";
import { projects } from "../util/static";
import { useState } from "react";
import { ExternalLink } from "../util/svg";

type ProjectProps = {
  projectSectionRef: (node?: Element | null) => void;
};

const Projects = ({ projectSectionRef }: ProjectProps) => {
  const [modalOpened, { open: modalOpen, close: modalClose }] = useDisclosure(false);
  const [modalTitle, setModalTitle] = useState('Title');
  const [modalDescription, setModalDescription] = useState('Description');
  const [modalGithubLink, setModalGithubLink] = useState('https://github.com');

  const openModal = (index: number) => {
    setModalTitle(projects[index].modalTitle);
    setModalDescription(projects[index].modalDescription);
    setModalGithubLink(projects[index].githubLink);
    modalOpen();
  };

  // Tile colour palette cycling for projects beyond the first
  const tilePalettes = [
    { bg: '#f1dec6', nameColor: '#1a1a1a', descColor: '#555',    tagBg: 'rgba(231,111,81,0.12)', tagColor: '#e76f51', linkColor: '#1a1a1a' },
    { bg: '#0A6847', nameColor: '#ffffff', descColor: 'rgba(255,255,255,0.75)', tagBg: 'rgba(255,255,255,0.12)', tagColor: 'rgba(255,255,255,0.85)', linkColor: '#ffffff' },
    { bg: '#e76f51', nameColor: '#ffffff', descColor: 'rgba(255,255,255,0.80)', tagBg: 'rgba(255,255,255,0.15)', tagColor: '#ffffff', linkColor: '#ffffff' },
  ];

  return (
    <section ref={projectSectionRef}>
      {/* Gradient divider */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, #e0d9d0, transparent)' }} />

      <div className="mx-auto max-w-5xl px-8 py-20 scroll-mt-24" id="projects">
        {/* D1-style section label */}
        <p className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-[#e76f51] mb-3">
          02 — Built
        </p>
        <h1 className="md:text-6xl sm:text-4xl text-4xl font-bold mb-12 text-[#1a1a1a]">
          Projects
        </h1>

        {/* Bento grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: '250px 200px',
            gap: '12px',
          }}
        >
          {/* Main featured tile — first project, spans 2 rows */}
          {projects.length > 0 ? (
            <div
              className="rounded-[20px] p-7 flex flex-col justify-end cursor-pointer relative overflow-hidden group transition-transform hover:-translate-y-1"
              style={{ gridRow: 'span 2', background: '#1a1a1a' }}
              onClick={() => openModal(0)}
            >
              {/* D1-style scaleX top-accent on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: '#e76f51' }}
              />
              <span className="text-3xl mb-3">🤖</span>
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                {projects[0].name}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {projects[0].description}
              </p>
              <span className="text-xs font-bold text-[#e76f51] tracking-wide">
                View Project →
              </span>
            </div>
          ) : null}

          {/* Tiles 2–4: real projects or accent placeholders */}
          {[0, 1, 2].map((slotIndex) => {
            const projIndex = slotIndex + 1; // slots start from project[1]
            const palette = tilePalettes[slotIndex];
            const spanTwo = slotIndex === 1; // middle slot spans 2 rows

            if (projIndex < projects.length) {
              // Real project tile
              return (
                <div
                  key={slotIndex}
                  className="rounded-[20px] p-6 flex flex-col justify-end cursor-pointer relative overflow-hidden group transition-transform hover:-translate-y-1"
                  style={{ background: palette.bg, ...(spanTwo ? { gridRow: 'span 2' } : {}) }}
                  onClick={() => openModal(projIndex)}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: '#e76f51' }}
                  />
                  <h3 className="text-base font-bold mb-1.5 leading-tight" style={{ color: palette.nameColor }}>
                    {projects[projIndex].name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: palette.descColor }}>
                    {projects[projIndex].description}
                  </p>
                  <span className="text-xs font-bold tracking-wide" style={{ color: palette.linkColor }}>
                    View →
                  </span>
                </div>
              );
            }

            // Placeholder tiles when there aren't enough projects yet
            const placeholders = [
              {
                bg: '#f1dec6',
                label: 'In Progress',
                title: 'Coming Soon',
                desc: 'New project in development',
                spanTwo: false,
              },
              {
                bg: '#0A6847',
                label: 'Open Source',
                title: 'More on GitHub',
                desc: null,
                link: 'github.com/joshcowan',
                spanTwo: true,
                textLight: true,
              },
              {
                bg: '#e76f51',
                label: 'Get in Touch',
                title: "Let's build\nsomething",
                desc: null,
                link: 'Email me →',
                spanTwo: false,
                textLight: true,
              },
            ];

            const ph = placeholders[slotIndex];
            return (
              <div
                key={slotIndex}
                className="rounded-[20px] p-6 flex flex-col justify-end"
                style={{ background: ph.bg, ...(ph.spanTwo ? { gridRow: 'span 2' } : {}) }}
              >
                <p
                  className="text-[0.68rem] font-bold tracking-[0.14em] uppercase mb-1"
                  style={{ color: ph.textLight ? 'rgba(255,255,255,0.6)' : '#555' }}
                >
                  {ph.label}
                </p>
                <p
                  className="text-lg font-bold leading-tight whitespace-pre-line"
                  style={{ color: ph.textLight ? '#fff' : '#1a1a1a' }}
                >
                  {ph.title}
                </p>
                {ph.desc && (
                  <p className="text-sm mt-1" style={{ color: '#555' }}>{ph.desc}</p>
                )}
                {ph.link && (
                  <p className="text-sm font-bold mt-2" style={{ color: ph.textLight ? 'rgba(255,255,255,0.75)' : '#e76f51' }}>
                    {ph.link}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Project detail modal */}
      <Modal
        opened={modalOpened}
        size="lg"
        onClose={modalClose}
        centered
        title={modalTitle}
        classNames={{ title: 'text-2xl' }}
        styles={{ header: { fontSize: '24px' } }}
      >
        <div className="flex items-end gap-1 mb-4">
          <a
            onClick={() => window.open(modalGithubLink, "_blank")}
            className="font-medium text-blue-600 hover:underline cursor-pointer"
          >
            Github
          </a>
          <ActionIcon
            component="a"
            aria-label="Open in a new tab"
            onClick={() => window.open(modalGithubLink, "_blank")}
          >
            <ExternalLink />
          </ActionIcon>
        </div>
        <p className="text-lg">{modalDescription}</p>
      </Modal>
    </section>
  );
};

export default Projects;
