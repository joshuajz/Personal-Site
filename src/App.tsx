import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Home from './home/Home';
import Resume from './resume/Resume';
import './App.css'
import Navigation from './navigation/Navigation';

const App = () => {
	return <MantineProvider>
		<Navigation />
		<Home />
		<Resume />
	</MantineProvider>
}

export default App;
