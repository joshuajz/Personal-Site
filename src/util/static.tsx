import { Flex } from "@mantine/core";
import { Bank, School } from "./svg";
import RobotImg from "../images/robot_transparent.png"

export const jobs = [
  {
    icon: Bank(),
    companyName: "Royal Bank of Canada",
    title: "Fullstack Software Developer Intern",
    timeline: "May 2024 - August 2024",
    description: [
      "Partnered with frontend development of the Transfer Stock page alongside a senior developer and communicated timelines and blockers to product teams.",
      "Mentored high school interns by answering technical questions and helping them onboard smoothly onto the Direct Investing team.",
    ],
    techGrid: <Flex className='mt-1 text-m'>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>Javascript + Typescript</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>HTML/CSS</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>React.js</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md'>C# .NET Core</span>
    </Flex>,
    techGridList: ['Javascript + Typescript', 'HTML/CSS', 'React.js', 'C# .NET Core']
  },
  {
    icon: Bank(),
    companyName: "Royal Bank of Canada",
    title: "Fullstack Software Developer Intern",
    timeline: "May 2023 - August 2023",
    description: [] as string[],
    techGrid: <Flex className='mt-1 text-m'>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>Javascript + Typescript</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>HTML/CSS</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>React.js</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md'>C# .NET Core</span>
    </Flex>,
    techGridList: ['Javascript + Typescript', 'HTML/CSS', 'React.js', 'C# .NET Core']
  },
  {
    icon: Bank(),
    companyName: "Royal Bank of Canada",
    title: "Software Developer Intern",
    timeline: "May 2022 - August 2022",
    description: [
      "Refactored the Direct Investing notification page from a fullstack perspective to utilize modern technologies (React.js & C# .NET Core) to improve the user experience for all clients.",
      "Provided essential maintenance and support for the Account Open flow, including a significant overhaul of the joint account form in order to on board RBC clients.",
    ],
    techGrid: <Flex className='mt-1 text-m'>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>Javascript + Typescript</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>HTML/CSS</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>React.js</span>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md'>C# .NET Core</span>
    </Flex>,
    techGridList: ['Javascript + Typescript', 'HTML/CSS', 'React.js', 'C# .NET Core']
  },
  {
    icon: School(),
    companyName: "Queen's University",
    title: "Teaching Assistant",
    timeline: "September 2023 - May 2025",
    description: [
      "Served as a Teaching Assistant for CISC102 (Discrete Math) for one term and CISC322 (Software Architecture) for two terms.",
      "Provided educational support through office hours, review sessions, and one-on-one sessions, aiding students in understanding complicated course material.",
      "Conducted timely and consistent grading of assignments and exams, delivering feedback for student growth.",
    ],
    techGridList: [] as string[]
  },
]

export const projects = [
  {
    icon: RobotImg,
    name: "Borg - A University Discord Bot",
    description: "A discord bot created for the incoming university student featuring acceptance trackers and course finder.",
    modalTitle: "Borg - A University Discord Bot",
    modalDescription: "Desc",
    githubLink: "https://github.com"
  }
]

type VolunteerJob = {
  orgName: string;
  role: string;
  description: string;
  accentColor: string;
};

export const volunteerJobs: VolunteerJob[] = [
  {
    orgName: "Computing Student's Association",
    role: "Vice President of Operations",
    description: "Oversaw a $50,000 annual budget and provided high-level operational leadership across a 100+ person organization, ensuring coordination among the financial, technology, academic, and governance portfolios.",
    accentColor: '#0A6847',
  },
  {
    orgName: "Queen's Web Development Club",
    role: "Education Executive",
    description: "Led a team of four to create a comprehensive web development curriculum in HTML, CSS, React.js, and Node.js, presenting weekly to 70+ students and overseeing 15 development teams.",
    accentColor: '#e76f51',
  },
]
