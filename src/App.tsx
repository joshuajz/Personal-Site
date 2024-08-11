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

const RouterElement = () => {
  const [homeSectionRef, homeSectionRefInView] = useInView({ threshold: 0.5 });
  const [expereinceSectionRef, expereinceSectionRefInView] = useInView({ threshold: 0.5 });

  return (
    <MantineProvider>
      <Navigation homeView={homeSectionRefInView} experienceView={expereinceSectionRefInView}/>
			<section ref={homeSectionRef}>
        <Home />
      </section>
			<Resume expereinceSectionRef={expereinceSectionRef}/>
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
