import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
import './App.css'
import useSize from "./util/Responsive";
import { TypeAnimation } from 'react-type-animation';
import { options } from "./util/ParticleOptions"

const App = () => {
  const [init, setInit] = useState(false);
  const size = useSize();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

	console.log('options:', options, 'size', size)

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const particles = () => {
    if (init) {
      switch (size) {
				case 'xl':
					return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.xl} />
				case 'lg':
					return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.lg} />
				case 'md':
					return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.md} />
				case 'sm':
					return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.sm} />
				case 'mobile':
					return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options.mobile} />
				default:
					return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options['2xl']} />
			}
    };
  };

  return <>
  <div style={{height: '100vh'}}>
    {particles()}
    <div className='absolute h-screen w-full flex items-center
          justify-center flex-col'>
      <span
        className='z-10 font-medium orange_theme
          xl:text-title lg:text-8xl sm:text-7xl text-5xl'>
        Josh&nbsp;<span className='font-light text-black'>Cowan</span>
      </span>
      <div>
        <TypeAnimation
          sequence={[
            'Javascript & React.js software ',
            // () => setTextColour('#e76f51'),
            // 'developer',
            // () => setTextColour('black'),
            1000,
          ]}
          wrapper="span"
          speed={50}
          className='xl:text-4xl lg:text-2xl sm:text-xl text-m'
          style={{ display: 'inline-block' }}
          repeat={Infinity}
          cursor={false}
          data-end="developer"
        />
        <span className='xl:text-4xl lg:text-2xl sm:text-xl text-m'> </span>
        <TypeAnimation
          sequence={[
            1000,
            550,
            'developer',
            // () => setTextColour('#e76f51'),
            // 'developer',
            // () => setTextColour('black'),
            1000,
          ]}
          wrapper="span"
          speed={50}
          className='xl:text-4xl lg:text-2xl sm:text-xl text-m orange_theme'
          style={{ display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
    </div>
  </div>
  </>;
};
export default App;
