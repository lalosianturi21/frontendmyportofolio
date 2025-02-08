import React from 'react';
import project1 from '../../../assets/project-1.jpg';
import project2 from '../../../assets/project-2.jpg';
import project3 from '../../../assets/project-3.jpg';

const projects = [
    {
        id: 1,
        image: project1,
        title: 'Real Chat',
        subTitle: 'Online real-time chat app.',
        description: 'I made this application for a USA customer. This application is truly amazing. ',
    },
    {
        id: 2,
        image: project2,
        title: 'Project Two',
        subTitle: 'Another awesome project.',
        description: 'This is another project description. It has unique features and functionalities.',
    },
    {
        id: 3,
        image: project3,
        title: 'Project Three',
        subTitle: 'A different kind of project.',
        description: 'This project was built with modern technologies and provides great value to users.',
    },
    {
        id: 4,
        image: project3,
        title: 'Project Four',
        subTitle: 'Yet another great project.',
        description: 'This project focuses on innovation and user experience.',
    },
    {
        id: 5,
        image: project1,
        title: 'Project Five',
        subTitle: 'A project with a unique approach.',
        description: 'With cutting-edge technology, this project delivers high performance and usability.',
    }
];

const Project = () => {
    return (
        <div className='myproject' id='projects'>
            <div className="containers">
                <h2 className='section-title'>Projects</h2>
                <div className="all-items">
                    {projects.map((project) => (
                        <div className="items" key={project.id}>
                            <div className="left">
                                <div className="img-project">
                                    <img src={project.image} alt={project.title} />
                                </div>
                            </div>
                            <div className="rights">
                                <h2 className="project-title">{project.title}</h2>
                                <h3 className="project-sub-title">{project.subTitle}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="buttons">
                                    <a href="#" className="primary-btns">Github</a>
                                    <a href="#" className="primary-btns outline external-link">
                                        <span>Preview</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;
