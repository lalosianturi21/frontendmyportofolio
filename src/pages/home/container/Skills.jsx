import React from 'react'
import pictureSkills from '../../../assets/skills.png';
import { SiLaravel } from "react-icons/si";

const Skills = () => {
    return (
        <div className="skills section" id='skills'>
            <h2 className='section-title'>Skills</h2>
            <div className="skills__container bd-grid">
                <div>
                    <h2 className='skills__subtitle'>Professional Skill</h2>
                    <p className="skills__text">I have expertise in Web Development and Android App Development, focusing on the following technologies:</p>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-html5 skills__icon'></i>
                            <span className="skills__name">HTML5</span>
                        </div>
                        <div className="skills__bar skills__project">

                        </div>

                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-css3 skills__icon'></i>
                            <span className="skills__name">CSS3</span>
                        </div>
                        <div className="skills__bar skills__project">

                        </div>

                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-javascript skills__icon' ></i>
                            <span className="skills__name">JAVASCRIPT</span>
                        </div>
                        <div className="skills__bar skills__project">

                        </div>

                    </div>
                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxs-paint skills__icon'></i>
                            <span className="skills__name">UX/UI</span>
                        </div>
                        <div className="skills__bar skills__project">
                        </div>

                    </div>

                    <div className="skills__data">
                        <div className="skills__names">
                            <SiLaravel className="skills__icon" />
                            <span className="skills__name">Laravel</span>
                        </div>
                        <div className="skills__bar skills__project">
                        </div>
                    </div>

                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-react skills__icon'></i>
                            <span className="skills__name">React</span>
                        </div>
                        <div className="skills__bar skills__project">
                        </div>
                    </div>

                    <div className="skills__data">
                        <div className="skills__names">
                            <i className='bx bxl-nodejs skills__icon'></i>
                            <span className="skills__name">Node.js</span>
                        </div>
                        <div className="skills__bar skills__project">
                        </div>
                    </div>


                </div>
                <div>
                    <img src={pictureSkills} alt="" className="skills__img"></img>
                </div>
            </div>
        </div>
    )
}

export default Skills
