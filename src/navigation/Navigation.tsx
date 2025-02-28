import { useEffect, useState } from 'react';
import { Container, Group } from '@mantine/core';
import classes from './Navigation.module.css';
import useSize from '../util/Responsive';
import { HashLink } from 'react-router-hash-link';

const links = [
  { link: '/home', label: 'Home', to: '#home' },
  { link: '/technical', label: 'Technical', to: '#technical' },
  { link: '/projects', label: 'Projects', to: '#projects' },
  { link: '/otherexperience', label: 'Other Experience', to: '#otherexperience' },
];

export default function Navigation({ homeView, experienceView, projectView }) {
  // const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  useEffect(() => {
    if (homeView) setActive(links[0].link)
    if (experienceView) setActive(links[1].link)
    if (projectView) setActive(links[2].link)
  }, [homeView, experienceView, projectView])

  const items = links.map((link) => (
    <HashLink
      key={link.label}
      // href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      smooth
      to={link.to}
    >
      {link.label}
    </HashLink>
  ));

  return (
    <span className='w-full sticky top-0 z-20'>
			<div className='flex justify-center'>
        <header className={classes.header + ' sticky rounded-md mt-2 top-0'}>
          <Container size="md" className={classes.inner}>
            {/* <MantineLogo size={28} /> */}
            <Group gap={5}>
              {items}
            </Group>
            {/* <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" /> */}
          </Container>
        </header>
			</div>
		</span>

  );
}
