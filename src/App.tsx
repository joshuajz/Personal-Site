import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Home from './home/Home';
import Resume from './resume/Resume';
import './App.css'
import Navigation from './navigation/Navigation';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import Projects from './projects/Projects';
import Volunteering from './volunteering/Volunteering';

const RouterElement = () => {
  const [homeSectionRef, homeSectionRefInView] = useInView({ threshold: 0.5, triggerOnce: false });
  const [expereinceSectionRef, experienceSectionRefInView] = useInView({ threshold: 0.5, triggerOnce: false });
  const [projectSectionRef, projectSectionRefInView] = useInView({ threshold: 0.5, triggerOnce: false });
  const [volunteerSectionRef, volunteerSectionRefInView] = useInView({ threshold: 0.5, triggerOnce: false });

  console.log("Home in view:", homeSectionRefInView);
  console.log("Experience in view:", experienceSectionRefInView);
  console.log("Projects in view:", projectSectionRefInView);
  console.log("Volunteering in view:", volunteerSectionRefInView);

  return (
    <MantineProvider>
      <Navigation homeView={homeSectionRefInView} experienceView={experienceSectionRefInView} projectView={projectSectionRefInView}/>
			<section ref={homeSectionRef}>
        <Home />
      </section>
			<Resume expereinceSectionRef={expereinceSectionRef}/>
      <Projects projectSectionRef={projectSectionRef}/>
      <Volunteering volunteerSectionRef={volunteerSectionRef} />
		</MantineProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/*",
    element: <RouterElement />,
  },
]);

const App = () => {
	return <MantineProvider>
		<RouterProvider router={router} />
	</MantineProvider>
}

export default App;
