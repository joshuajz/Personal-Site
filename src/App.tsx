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

const Footer = () => (
  <footer className="bg-[#1a1a1a] text-white py-16 px-10 text-center">
    <div className="text-xl font-bold mb-1.5">
      <span className="text-[#e76f51]">Josh</span> Cowan
    </div>
    <div className="flex justify-center gap-7 mb-6 flex-wrap">
      <a href="https://github.com/joshuajz" target="_blank" rel="noreferrer"
        className="text-sm font-medium no-underline transition-colors hover:text-[#e76f51]"
        style={{ color: 'rgba(255,255,255,0.45)' }}>
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/josh-cowan6/" target="_blank" rel="noreferrer"
        className="text-sm font-medium no-underline transition-colors hover:text-[#e76f51]"
        style={{ color: 'rgba(255,255,255,0.45)' }}>
        LinkedIn
      </a>
      <a href="mailto:cowanjzc@gmail.com"
        className="text-sm font-medium no-underline transition-colors hover:text-[#e76f51]"
        style={{ color: 'rgba(255,255,255,0.45)' }}>
        Email
      </a>
    </div>
    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.16)' }}>
      © 2026 Josh Cowan. All rights reserved.
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
      <Navigation
        homeView={homeSectionRefInView}
        experienceView={experienceSectionRefInView}
        projectView={projectSectionRefInView}
        volunteerView={volunteerSectionRefInView}
      />
      <main>
        <section ref={homeSectionRef}>
          <Home />
        </section>
        <Resume expereinceSectionRef={expereinceSectionRef} />
        <Projects projectSectionRef={projectSectionRef} />
        <Volunteering volunteerSectionRef={volunteerSectionRef} />
      </main>
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
