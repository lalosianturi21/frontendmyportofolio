import React from 'react';
import pictureAbout from '../../../assets/about.png';
import "../../../css/style.css";
import MainLayout from '../../../components/MainLayout';

const About = () => {
  return (
   <section className='about section' id='about' data-aos="fade-up">
    <h2 className='section-title'>About</h2>

    <div className='about__container bd-grid'>
        <div className="about__img">
            <img src={pictureAbout} alt=''></img>
        </div>
        <div>
        <h2 className="about__subtitle">I'am Tio Fulalo Simatupang</h2>
            <p className="about__text">I'm a Informatics Engineering student at Universitas Prima Indonesia, passionate about Web Development and Android App Development. I enjoy building responsive websites and mobile applications, always eager to learn and innovate. Let's create something amazing! 🚀</p>           
                </div>       
    </div>
   </section>
  )
}

export default About
