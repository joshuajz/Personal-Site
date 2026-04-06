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
                'Building things for the web.',  5000,
                'Open to new opportunities.',    5000,
                'Tinkering with code.',          5000,
                'React. Typescript. Node.',      5000,
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
        <div className="flex items-center gap-3">
          <a href="#" className="btn-primary">
            <ResumeIcon />
            Resume
          </a>
          <a href="mailto:josh@joshcowan.dev" className="btn-secondary">
            <ContactIcon />
            Contact
          </a>
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
