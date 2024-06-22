import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
import './App.css'
import useSize from "./Responsive";
import { TypeAnimation } from 'react-type-animation';

const App = () => {
  const [init, setInit] = useState(false);
  const [particleAmount, setParticleAmount] = useState(10);
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

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: "f0f0f0",
    },
    fullScreen: {enable: true, zIndex: 0},
    style: {height: '100vh', width: '100%'},
    particles: {
      color: {
        value: '#A4451A'
      },
        number: {
            value: 15,
        },
        links: {
            distance: 150,
            enable: true,
            color: "#A4451A"
        },
        move: {
            enable: true,
        },
        size: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
    },
    }),
    [size],
  );

  console.log('size:', size, 'particleAmount', particleAmount, 'options', options)

  const particles = () => {
    if (init) {
      return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
    };
  };

  return <>
  <div style={{height: '100vh'}}>
    {particles()}
    <div className='absolute h-screen w-full flex items-center
          justify-center flex-col'>
      <span
        className='z-10 font-medium orange_theme
          xl:text-title lg:text-8xl sm:text-6xl text-5xl'>
        Josh&nbsp;<span className='font-light text-black'>Cowan</span>
      </span>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'We produce food for Mice',
          1000, // wait 1s before replacing "Mice" with "Hamsters"
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '16px', display: 'inline-block' }}
        repeat={Infinity}
      />
    </div>
  </div>
  </>;
};
export default App;
