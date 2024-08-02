import { Timeline, Text } from "@mantine/core";
import React, { ReactNode } from "react";
import "./Resume.css"
import { Bank } from "../util/svg";
import { jobs } from "../util/static";

type resumeItem = {
  icon: ReactNode,
  companyName: string,
  title: string,
  timeline: string,
  description: string[]
}

const ResumeItem = ({icon, companyName, title, timeline, description}: resumeItem) =>
  <Timeline.Item bullet={icon} className='font-bold green_theme text-3xl' title={companyName} color='teal'>
    <Text c="dimmed" className='text-xl'>{title}</Text>
    <Text mt={2} className='text-black text-l'>
      <span className='font-medium text-xl'>{timeline}</span>
      {description.map(desc => <li>{desc}</li>)}
    </Text>
  </Timeline.Item>;

const Resume = () => {
	return (<>
			<div className='m-5 flex justify-center flex-col'>
			<span className='ml-80 mr-96'>
        <h1 className='text-6xl font-bold mb-8'>Experience</h1>
          <Timeline active={0} bulletSize={24} lineWidth={2} className='ml-32' color='teal'>
            {jobs.map(job => <ResumeItem icon={job.icon} companyName={job.companyName} title={job.title} description={job.description} timeline={job.timeline} />)}
          </Timeline>
        </span>
				<h1 className='text-6xl font-bold mb-8'>Skills</h1>
				<h1 className='text-6xl font-bold mb-8'>Projects</h1>
				<h1 className='text-6xl font-bold mb-8'>Voulenteering</h1>
			</div>
		</>
		);
}

export default Resume;
