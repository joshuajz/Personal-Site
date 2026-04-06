import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "./Home.css";
import useSize from "../util/Responsive";
import { TypeAnimation } from 'react-type-animation';
import { options } from "../util/ParticleOptions";

// SVG icons — kept inline to avoid extra deps, matching design-n2 buttons
const ResumeIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Home = () => {
  const [init, setInit] = useState(false);
  const size = useSize();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const particles = () => {
    if (!init) return null;
    switch (size) {
      case 'xl':     return <Particles id="tsparticles" style={{ zIndex: -100 }} particlesLoaded={particlesLoaded} options={options.xl} />;
      case 'lg':     return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.lg} />;
      case 'md':     return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.md} />;
      case 'sm':     return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.sm} />;
      case 'mobile': return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.mobile} />;
      default:       return <Particles id="tsparticles" style={{ zIndex: -100 }} particlesLoaded={particlesLoaded} options={options['2xl']} />;
    }
  };

  return (
    <div style={{ height: '100vh' }} id="home" className="relative flex flex-col items-center justify-center">

      {/* Particles layer — pointer-events:none so touch scroll is never blocked */}
      <span className="absolute z-0" style={{ pointerEvents: 'none' }}>{particles()}</span>

      {/* Hero content — centred, matching design-n2 layout */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Eyebrow — design-n2 .hero-eyebrow */}
        <p className="text-sm font-semibold tracking-[0.12em] uppercase text-[#6b6b6b] mb-4">
          Full-Stack Developer
        </p>

        {/* Stacked name — design-n2 .hero-name */}
        <h1
          className="font-black leading-[0.95] mb-5 tracking-[-0.02em]"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}
        >
          <span className="block text-[#e76f51]">Josh</span>
          <span className="block text-[#1a1a1a]">Cowan</span>
        </h1>

        {/* Typewriter subtitle with blinking orange cursor — design-n2 .hero-subtitle */}
        <p
          className="text-[#6b6b6b] font-normal mb-10"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', minHeight: '2em' }}
        >
          <span className="typewriter-cursor">
            <TypeAnimation
              sequence={[
                'Building things for the web.',  2000,
                'Open to new opportunities.',    2000,
                'Tinkering with code.',          2000,
                'React. Typescript. Node.',      2000,
              ]}
              wrapper="span"
              speed={60}
              deletionSpeed={80}
              repeat={Infinity}
              cursor={false}
            />
          </span>
        </p>

        {/* Hero buttons */}
        <div className="flex flex-col items-center gap-3">
          {/* Primary CTAs + social icons (social hidden on mobile) */}
          <div className="flex items-center gap-3">
            <a href="#" className="btn-primary">
              <ResumeIcon />
              Resume
            </a>
            <a href="mailto:josh@joshcowan.dev" className="btn-secondary">
              <ContactIcon />
              Contact
            </a>
            <a href="https://github.com/joshuajz" target="_blank" rel="noreferrer" className="btn-social btn-social--github hidden sm:inline-flex" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/josh-cowan6/" target="_blank" rel="noreferrer" className="btn-social btn-social--linkedin hidden sm:inline-flex" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
          {/* Social icons row — mobile only */}
          <div className="flex items-center gap-3 sm:hidden">
            <a href="https://github.com/joshuajz" target="_blank" rel="noreferrer" className="btn-social btn-social--github" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/josh-cowan6/" target="_blank" rel="noreferrer" className="btn-social btn-social--linkedin" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator — design-n2 .scroll-indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 animate-bounce z-10">
        <span className="text-[10px] text-[#999] font-semibold tracking-[0.16em] uppercase">Scroll</span>
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
          <path d="M1 1L7 8L13 1" stroke="#e76f51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </div>
  );
};

export default Home;
