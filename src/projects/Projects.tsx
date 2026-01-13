import { useDisclosure } from "@mantine/hooks";
import robotImg from '../images/robot_transparent.png'
import { Modal } from "@mantine/core";
import { projects } from "../util/static";
import { useState } from "react";
import { ExternalLink, GithubIcon } from "../util/svg";

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
      className="p-4 sm:p-6 rounded-xl hover:bg-[#f1dec6] bg-[#f1dec6b3] hover:cursor-pointer flex transition-all duration-200 hover:shadow-md"
      style={{maxWidth: '500px'}}
      onClick={modalOpen}
    >
      <img src={robotImg} height={"auto"} width={155} className="mr-3 flex-shrink-0 hidden sm:block" />
      <img src={robotImg} height={"auto"} width={80} className="mr-3 flex-shrink-0 sm:hidden" />
      <div className="flex flex-col flex-1 min-w-0">
        <b className="text-base sm:text-lg">{name}</b>
        <span className="text-sm sm:text-base text-gray-700">{description}</span>
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
      <Modal
        opened={modalOpened}
        size='lg'
        onClose={modalClose}
        centered
        title={modalTitle}
        radius="lg"
        classNames={{
          header: 'bg-[#f1dec6] border-b-2 border-[#e76f51]',
          title: 'text-xl sm:text-2xl font-bold text-[#e76f51]',
          body: 'bg-[#faf6f0] p-4 sm:p-6',
          content: 'bg-[#faf6f0] rounded-xl overflow-hidden',
          close: 'text-[#e76f51] hover:bg-[#e76f5120]'
        }}
      >
        <div className='flex flex-col gap-4'>
          {modalGithubLink && (
            <a
              href={modalGithubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-fit px-3 py-2 sm:px-4 sm:py-2 border-2 border-[#e76f51] text-[#e76f51] font-medium rounded-lg hover:bg-[#e76f51] hover:text-white transition-all duration-200 text-sm sm:text-base"
            >
              <GithubIcon />
              <span>View on GitHub</span>
              <ExternalLink />
            </a>
          )}
          <p className='text-gray-700 leading-relaxed text-sm sm:text-base'>
            {modalDescription}
          </p>
        </div>
      </Modal>
    </div>
  </section>)
}

export default Projects;
