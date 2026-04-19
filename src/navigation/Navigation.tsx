import { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { GithubIcon, LinkedInIcon } from '../util/svg';

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const links = [
  { link: '/home',          label: 'Home',        mobileLabel: null,        to: '#home' },
  { link: '/experience',    label: 'Work',         mobileLabel: 'Work',      to: '#technical' },
  { link: '/projects',      label: 'Build',        mobileLabel: 'Build',     to: '#projects' },
  { link: '/volunteering',  label: 'Community',    mobileLabel: 'Community', to: '#otherexperience' },
];

type NavigationProps = {
  homeView: boolean;
  experienceView: boolean;
  projectView: boolean;
  volunteerView: boolean;
};

export default function Navigation({ homeView, experienceView, projectView, volunteerView }: NavigationProps) {
  const [active, setActive] = useState(links[0].link);

  useEffect(() => {
    if (homeView)       setActive(links[0].link);
    if (experienceView) setActive(links[1].link);
    if (projectView)    setActive(links[2].link);
    if (volunteerView)  setActive(links[3].link);
  }, [homeView, experienceView, projectView, volunteerView]);

  return (
    <nav
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full px-3 sm:px-7 py-2 sm:py-2.5 flex gap-0.5 sm:gap-1.5 items-center whitespace-nowrap"
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
        maxWidth: 'calc(100vw - 24px)',
      }}
    >
      {links.map((link) => (
        <HashLink
          key={link.label}
          smooth
          to={link.to}
          onClick={() => setActive(link.link)}
          className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all no-underline flex items-center ${
            active === link.link
              ? 'bg-[#e76f51] text-white'
              : 'text-[#555] hover:bg-[#e76f51] hover:text-white'
          }`}
        >
          {link.link === '/home' ? (
            <>
              <span className="sm:hidden"><HomeIcon /></span>
              <span className="hidden sm:inline">{link.label}</span>
            </>
          ) : (
            link.label
          )}
        </HashLink>
      ))}

      {/* Divider */}
      <span className="mx-1 text-[#d0d0d0] select-none font-light">|</span>

      {/* Social links */}
      <a
        href="https://github.com/joshuajz"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#555] transition-all no-underline hover:bg-[#e76f51] hover:text-white"
      >
        <GithubIcon />
        <span className="hidden sm:inline">GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/josh-cowan6/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#555] transition-all no-underline hover:bg-[#e76f51] hover:text-white"
      >
        <LinkedInIcon />
        <span className="hidden sm:inline">LinkedIn</span>
      </a>
    </nav>
  );
}
