import { Timeline, Text, List, Grid } from "@mantine/core";
import React, { ReactNode } from "react";
import "./Resume.css"
import { Bank } from "../util/svg";
import { jobs } from "../util/static";
import useSize from "../util/Responsive";

type resumeItem = {
  icon: ReactNode,
  companyName: string,
  title: string,
  timeline: string,
  description?: string[],
  techGrid?: ReactNode,
  techGridList?: string[]
}

const ResumeItem = ({icon, companyName, title, timeline, description, techGrid, techGridList}: resumeItem) => {
  const size = useSize();

  return (
  <Timeline.Item bullet={icon} className='font-bold green_theme text-3xl' title={companyName} color='teal'>
    <Text className='text-xl' style={{color: '#0A6847'}}>{title}</Text>
    <Text mt={2} className='text-black text-l'>
      <span className='font-medium text-xl'>{timeline}</span>
      <List listStyleType='disc'>
        {description?.map(desc => <List.Item>{desc}</List.Item>)}
      </List>
    </Text>
    { techGrid && <span className='text-base text-black font-light'>Technologies:</span> }
    { size === 'mobile' ? <List className='text-black font-normal' listStyleType='disc'>
      {techGridList?.map(tech => <List.Item>{tech}</List.Item>)}
    </List> : techGrid }
  </Timeline.Item>)
};

const Resume = () => {
	return (<>
			<div className='m-5 flex justify-center flex-col'>
			<span className='sm:ml-[5%] sm:mr-[7%] md:ml-[10%] md:mr-[12%] lg:ml-[13%] lg:mr-[17%] xl:ml-[17%] xl:mr-[22%] 2xl:ml-[24%] 2xl:mr-[28%]'>
        <h1 className='md:text-6xl sm:text-4xl text-4xl font-bold mb-8'>Experience</h1>
          <Timeline active={0} bulletSize={24} lineWidth={2} className='ml-6' color='teal'>
            {jobs.map(job => <ResumeItem icon={job.icon} companyName={job.companyName} title={job.title} description={job.description} timeline={job.timeline} techGrid={job.techGrid} techGridList={job.techGridList}/>)}
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
