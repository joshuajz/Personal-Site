import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Home from './home/Home';
import Resume from './resume/Resume';
import './App.css'
import Navigation from './navigation/Navigation';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import Projects from './projects/Projects';
import Volunteering from './volunteering/Volunteering';
import { GithubIcon, LinkedInIcon } from './util/svg';

const SocialBar = () => (
  <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex gap-2">
    <a
      href="https://github.com/joshuajz"
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub"
      className="flex items-center justify-center w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] rounded-full bg-white text-[#6b6b6b] transition-all hover:bg-[#24292e] hover:text-white"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)' }}
    >
      <span className="scale-125 sm:scale-[1.65] inline-flex"><GithubIcon /></span>
    </a>
    <a
      href="https://www.linkedin.com/in/josh-cowan6/"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn"
      className="flex items-center justify-center w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] rounded-full bg-white text-[#6b6b6b] transition-all hover:bg-[#0a66c2] hover:text-white"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)' }}
    >
      <span className="scale-125 sm:scale-[1.65] inline-flex"><LinkedInIcon /></span>
    </a>
  </div>
);

const Footer = () => (
  <footer className="bg-[#1a1a1a] text-white py-16 px-10 text-center">
    <div className="text-xl font-bold mb-1.5">
      <span className="text-[#e76f51]">Josh</span> Cowan
    </div>
    <p className="text-sm italic mb-7" style={{ color: 'rgba(255,255,255,0.32)' }}>
      Building things for the web, one commit at a time.
    </p>
    <div className="flex justify-center gap-7 mb-6 flex-wrap">
      <a href="https://github.com" target="_blank" rel="noreferrer"
        className="text-sm font-medium no-underline transition-colors hover:text-[#e76f51]"
        style={{ color: 'rgba(255,255,255,0.45)' }}>
        GitHub
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer"
        className="text-sm font-medium no-underline transition-colors hover:text-[#e76f51]"
        style={{ color: 'rgba(255,255,255,0.45)' }}>
        LinkedIn
      </a>
      <a href="mailto:josh@joshcowan.dev"
        className="text-sm font-medium no-underline transition-colors hover:text-[#e76f51]"
        style={{ color: 'rgba(255,255,255,0.45)' }}>
        Email
      </a>
    </div>
    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.16)' }}>
      © 2025 Josh Cowan. All rights reserved.
    </p>
  </footer>
);

const RouterElement = () => {
  const [homeSectionRef,      homeSectionRefInView]      = useInView({ threshold: 0.2, triggerOnce: false });
  const [expereinceSectionRef, experienceSectionRefInView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [projectSectionRef,   projectSectionRefInView]   = useInView({ threshold: 0.2, triggerOnce: false });
  const [volunteerSectionRef, volunteerSectionRefInView] = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <MantineProvider>
      <SocialBar />
      <Navigation
        homeView={homeSectionRefInView}
        experienceView={experienceSectionRefInView}
        projectView={projectSectionRefInView}
        volunteerView={volunteerSectionRefInView}
      />
      <section ref={homeSectionRef}>
        <Home />
      </section>
      <Resume expereinceSectionRef={expereinceSectionRef} />
      <Projects projectSectionRef={projectSectionRef} />
      <Volunteering volunteerSectionRef={volunteerSectionRef} />
      <Footer />
    </MantineProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/*",
    element: <RouterElement />,
  },
]);

const App = () => (
  <MantineProvider>
    <RouterProvider router={router} />
  </MantineProvider>
);

export default App;
