import React from 'react';
import pictureSkills from '../../../assets/skills.png';
import { SiLaravel } from 'react-icons/si';

const skillsData = [
  {
    id: 1,
    name: 'HTML5',
    icon: <i className="bx bxl-html5 skills__icon"></i>,
  },
  {
    id: 2,
    name: 'CSS3',
    icon: <i className="bx bxl-css3 skills__icon"></i>,
  },
  {
    id: 3,
    name: 'JAVASCRIPT',
    icon: <i className="bx bxl-javascript skills__icon"></i>,
  },
  {
    id: 4,
    name: 'UX/UI',
    icon: <i className="bx bxs-paint skills__icon"></i>,
  },
  {
    id: 5,
    name: 'Laravel',
    icon: <SiLaravel className="skills__icon" />,
  },
  {
    id: 6,
    name: 'React',
    icon: <i className="bx bxl-react skills__icon"></i>,
  },
  {
    id: 7,
    name: 'Node.js',
    icon: <i className="bx bxl-nodejs skills__icon"></i>,
  },
];

const Skills = () => {
  return (
    <div className="skills section" id="skills" data-aos="fade-up">
      <h2 className="section-title">Skills</h2>
      <div className="skills__container bd-grid">
        <div>
          <h2 className="skills__subtitle">Professional Skill</h2>
          <p className="skills__text">
            I have expertise in Web Development and Android App Development, focusing on the following technologies:
          </p>
          {skillsData.map(skill => (
            <div className="skills__data" data-aos="fade-up" key={skill.id}>
              <div className="skills__names">
                {skill.icon}
                <span className="skills__name">{skill.name}</span>
              </div>
              <div className="skills__bar skills__project"></div>
            </div>
          ))}
        </div>
        <div>
          <img src={pictureSkills} alt="Skills" className="skills__img" />
        </div>
      </div>
    </div>
  );
};

export default Skills;
