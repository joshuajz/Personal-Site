import { Flex, Grid } from "@mantine/core";
import { Bank } from "./svg";

export const jobs = [
  {
    icon: Bank(),
    companyName: "Royal Bank of Canada",
    title: "Fullstack Software Developer Intern",
    timeline: "May 2024 - August 2024",
    description: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."],
    // techGrid: <Grid className='mt-3 text-m'>
    //   <Grid.Col span={{ xl: 3, lg: 4, md: 5, sm: 5, xs: 5 }} className='grid_box font-normal'>Javascript + Typescript</Grid.Col>
    //   <Grid.Col span={{ xl: 2, lg: 3, md: 3, sm: 3, xs: 3 }} className='grid_box font-normal'>HTML/CSS</Grid.Col>
    //   <Grid.Col span={{ xl: 2, lg: 2, md: 3, sm: 3, xs: 3 }} className='grid_box font-normal'>React.js</Grid.Col>
    //   <Grid.Col span={{ xl: 2, lg: 3, md: 4, sm: 4, xs: 3 }} className='grid_box font-normal'>C# .NET Core</Grid.Col>
    // </Grid>,
    techGrid: <Flex className='mt-3 text-m'>
      <span className='font-normal border-2 border-solid  text-[#0A6847] border-[#0a68471a] bg-[#0a68471a] text-sm text-center p-2 rounded-md'>Javascript + Typescript</span>
      {/* <Grid.Col span={{ xl: 3, lg: 4, md: 5, sm: 5, xs: 5 }} className='grid_box font-normal'>Javascript + Typescript</Grid.Col>
      <Grid.Col span={{ xl: 2, lg: 3, md: 3, sm: 3, xs: 3 }} className='grid_box font-normal'>HTML/CSS</Grid.Col>
      <Grid.Col span={{ xl: 2, lg: 2, md: 3, sm: 3, xs: 3 }} className='grid_box font-normal'>React.js</Grid.Col>
      <Grid.Col span={{ xl: 2, lg: 3, md: 4, sm: 4, xs: 3 }} className='grid_box font-normal'>C# .NET Core</Grid.Col> */}
    </Flex>,
    techGridList: ['Javascript + Typescript', 'HTML/CSS', 'React.js', 'C# .NET Core']
  },
  {
    icon: Bank(),
    companyName: "Royal Bank of Canada",
    title: "Software Developer Intern",
    timeline: "May 2023 - August 2023",
    description: ["Refactored the Direct Investing notification page from a fullstack perspective to utilize modern technologies and reduce technology debt while increasing features.", "Reconstructed the page utilizing React.js and C# .NET Core to interface with both internal Direct Investing services and other bank services to improve usability and decrease support calls.", "Provided essential maintenance and support for collection of enhanced information to streamline the account open process with over 100 accounts opened per day, increasing the total amount of RBC clients."],
    techGrid: <Grid className='mt-3 text-m'>
      <Grid.Col span={{ xl: 3, lg: 4, md: 5, sm: 5, xs: 5 }} className='grid_box font-normal'>Javascript + Typescript</Grid.Col>
      <Grid.Col span={{ xl: 2, lg: 3, md: 3, sm: 3, xs: 3 }} className='grid_box font-normal'>HTML/CSS</Grid.Col>
      <Grid.Col span={{ xl: 2, lg: 2, md: 3, sm: 3, xs: 3 }} className='grid_box font-normal'>React.js</Grid.Col>
      <Grid.Col span={{ xl: 2, lg: 3, md: 4, sm: 4, xs: 3 }} className='grid_box font-normal'>C# .NET Core</Grid.Col>
    </Grid>,
    techGridList: ['Javascript + Typescript', 'HTML/CSS', 'React.js', 'C# .NET Core']
  },
  {
    icon: Bank(),
    companyName: "Royal Bank of Canada",
    title: "Frontend Software Developer Intern",
    timeline: "May 2022 - August 2022",
    description: ["Implemented a responsive React.js version of the mutual fund order flow to improve the user experience, and load times by 20% for over 17 million clients.", "Provided a demonstration and walkthrough of the squad's changes to senior leaders to showcase progress and demonstrate value."],
    techGrid: <Grid className='mt-3 text-m'>
      <Grid.Col span={{ xl: 3, lg: 4, md: 5, sm: 5, xs: 5 }} className='grid_box font-normal'>Javascript + Typescript</Grid.Col>
      <Grid.Col span={{ xl: 2, lg: 3, md: 3, sm: 3, xs: 3 }} className='grid_box font-normal'>HTML/CSS</Grid.Col>
      <Grid.Col span={{ xl: 2, lg: 2, md: 3, sm: 3, xs: 3 }} className='grid_box font-normal'>React.js</Grid.Col>
    </Grid>,
    techGridList: ['Javascript + Typescript', 'HTML/CSS', 'React.js']
  },
]
