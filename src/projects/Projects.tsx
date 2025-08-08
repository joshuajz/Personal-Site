import { useDisclosure } from "@mantine/hooks";
import robotImg from '../images/robot_transparent.png'
import { ActionIcon, Modal } from "@mantine/core";
import { projects } from "../util/static";
import { useState } from "react";
import { ExternalLink } from "../util/svg";

type ProjectItemProps = {
  modalOpen: () => void,
  name: string;
  description: string;
};

type ProjectProps = {
  projectSectionRef: (node?: Element | null) => void;
}

const ProjectItem = ({modalOpen, name, description}: ProjectItemProps) => {
  return (
    <div
      className="p-6 rounded-xl hover:bg-[#f1dec6] bg-[#f1dec6b3] hover:cursor-pointer flex"
      style={{maxWidth: '500px'}}
      onClick={modalOpen}
    >
      <img src={robotImg} height={"auto"} width={155} className="mr-3 flex-shrink-0" />
      <div className="flex flex-col flex-1 min-w-0">
        <b>{name}</b>
        <span>{description}</span>
      </div>
    </div>)
}

const Projects = ({projectSectionRef}: ProjectProps) => {
  const [modalOpened, { open: modalOpen, close: modalClose }] = useDisclosure(false);

  const [modalTitle, setModalTitle] = useState('Title');
  const [modalDescription, setModalDescription] = useState('Description');
  const [modalGithubLink, setModalGithubLink] = useState('joshcowan.dev');

  return (<section ref={projectSectionRef}>
    <div className='m-5 flex justify-center flex-col scroll-mt-16' id='projects'>
      <span className='sm:ml-[5%] sm:mr-[7%] md:ml-[10%] md:mr-[12%] lg:ml-[13%] lg:mr-[17%] xl:ml-[17%] xl:mr-[22%] 2xl:ml-[24%] 2xl:mr-[28%]'>
        <h1 className='md:text-6xl sm:text-4xl text-4xl font-bold mb-8'>Projects</h1>
          <div className='ml-6'>
            <div className='flex flex-wrap gap-2'>
              {projects.map(project =>
                <span onClick={() => {
                  setModalTitle(project.modalTitle);
                  setModalDescription(project.modalDescription);
                  setModalGithubLink(project.githubLink)
                }}>
                  <ProjectItem
                    modalOpen={modalOpen}
                    name={project.name}
                    description={project.description}
                  />
                </span>
              )}
            </div>
          </div>
      </span>
      <Modal opened={modalOpened} size='lg' onClose={modalClose} centered title={modalTitle} className='text-7xl'
        styles={{
          header: {fontSize: '24px'}
        }}
        classNames={{
          title: 'text-2xl',
          body: 'text-lg'
        }}
      >
        <div className='flex items-end gap-1'>
          <a onClick={() => window.open(modalGithubLink, "_blank")} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" style={{cursor: 'pointer'}}>Github</a>
          <ActionIcon
            component="a"
            aria-label="Open in a new tab"
            onClick={() => window.open(modalGithubLink, "_blank")}
          >
            <ExternalLink />
          </ActionIcon>
        </div>
        <br />
        {modalDescription}
      </Modal>
    </div>
  </section>)
}

export default Projects;
