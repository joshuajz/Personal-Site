import { Timeline, Text, List, Grid, Modal, Button, Flex } from "@mantine/core";
import React, { ReactNode } from "react";
import "./Resume.css"
import { Bank } from "../util/svg";
import { jobs } from "../util/static";
import useSize from "../util/Responsive";
import robotImg from '../images/robot_transparent.png'
import { useDisclosure } from "@mantine/hooks";

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
    </List> : <Flex className='mt-1 text-m'>
      {techGridList?.map(tech => <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md mr-2'>{tech}</span>)}
    </Flex> }
  </Timeline.Item>)
};

const Resume = ({expereinceSectionRef}) => {
  const [modalOpened, { open: modalOpen, close: modalClose }] = useDisclosure(false);

  return (<section ref={expereinceSectionRef}>
			<div className='m-5 flex justify-center flex-col scroll-mt-16' id='experience'>
			<span className='sm:ml-[5%] sm:mr-[7%] md:ml-[10%] md:mr-[12%] lg:ml-[13%] lg:mr-[17%] xl:ml-[17%] xl:mr-[22%] 2xl:ml-[24%] 2xl:mr-[28%]'>
        <h1 className='md:text-6xl sm:text-4xl text-4xl font-bold mb-8'>Experience</h1>
          <Timeline active={0} bulletSize={24} lineWidth={2} className='ml-6' color='teal'>
            {jobs.map(job => <ResumeItem icon={job.icon} companyName={job.companyName} title={job.title} description={job.description} timeline={job.timeline} techGrid={job.techGrid} techGridList={job.techGridList}/>)}
          </Timeline>
        </span>
				<h1 className='text-6xl font-bold mb-8'>Projects</h1>
        <div className='flex'>
          <div className='p-6 rounded-xl hover:bg-[#f1dec6] bg-[#f1dec6b3] hover:cursor-pointer' onClick={modalOpen}>
            <div className='flex'>
              <img src={robotImg} height={'auto'} width={155} className='mr-3'/>
              <div className='flex flex-col'>
                <b>Borg - A University Discord Bot</b>
                <span style={{maxWidth: '250px'}}>A discord botA discord botA discord botA discord bot</span>
              </div>
            </div>
          </div>
        </div>
				<h1 className='text-6xl font-bold mb-8'>Voulenteering</h1>
			</div>
      <Modal opened={modalOpened} onClose={modalClose} centered title='Modal Title'>
        Modal Content
      </Modal>
		</section>
		);
}

export default Resume;
