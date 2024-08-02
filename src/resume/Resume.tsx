import { Timeline, Text } from "@mantine/core";
import React from "react";
import "./Resume.css"
// import RBC from '../assets/rbc.png';

const Bank = () => <svg  xmlns="http://www.w3.org/2000/svg"  width="12"  height="12"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 10l18 0" /><path d="M5 6l7 -3l7 3" /><path d="M4 10l0 11" /><path d="M20 10l0 11" /><path d="M8 14l0 3" /><path d="M12 14l0 3" /><path d="M16 14l0 3" /></svg>

const Resume = () => {
	return (<>
			<div className='m-5 flex justify-center flex-col' style={{marginLeft: '30%', marginRight: '30%'}}>
			<h1 className='text-6xl font-bold mb-8'>Experience</h1>
				<Timeline active={0} bulletSize={24} lineWidth={2} className='ml-32' color='teal'>
					<Timeline.Item bullet={<Bank />} className='font-bold green_theme' title="Royal Bank of Canada" color='teal'>
						<Text c="dimmed" size="sm">Software Developer Intern</Text>
						<Text size="xs" mt={2} className='text-black'>
							<span className='font-medium'>May 2024 - Present</span>
							<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
							<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
						</Text>
					</Timeline.Item>

					<Timeline.Item bullet={<Bank />} className='green_theme' title="Royal Bank of Canada" color='teal'>
						<Text c="dimmed" size="sm">Software Developer Intern</Text>
						<Text size="xs" className='text-black' mt={2}>May 2023 - August 2023</Text>
					</Timeline.Item>

					<Timeline.Item bullet={<Bank />} className='green_theme' title="Royal Bank of Canada" color='teal'>
						<Text c="dimmed" size="sm">Software Developer Intern</Text>
						<Text size="xs" className='text-black' mt={2}>May 2022 - August 2022</Text>
					</Timeline.Item>
				</Timeline>
				<h1 className='text-6xl font-bold mb-8'>Skills</h1>
				<h1 className='text-6xl font-bold mb-8'>Projects</h1>
				<h1 className='text-6xl font-bold mb-8'>Voulenteering</h1>
			</div>
		</>
		);
}

export default Resume;
