import React from 'react';

const Project = () => {
    return (
        <div className='myproject' id='projects' data-aos="fade-up">
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
                                    <a href="#" className="primary-btns">Demo</a>
                                    <a href="#" className="primary-btns outline external-link">
                                        <Link to={`/blog/${post.slug}`}><span>Preview</span></Link>
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
