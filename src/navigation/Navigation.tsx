import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import classes from './Navigation.module.css';
import useSize from '../util/Responsive';

const links = [
  { link: '/home', label: 'Home' },
  { link: '/experience', label: 'Experience' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export default function Navigation() {
  // const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
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
