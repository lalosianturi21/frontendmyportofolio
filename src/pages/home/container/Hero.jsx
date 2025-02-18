import React from 'react'
import "../../../css/style.css";
import pictureHero from '../../../assets/perfil.png';

const Hero = () => {
    return (
        <main className='l-main'>
            <section className='home bd-grid' id="home">
                <div className="home__data">
                    <h1 className='home__title'>
                        Hi, <br /> I&apos;m
                        <span className='home__title-color'> Tio Fulalo</span>
                        <br /> Web Developer
                    </h1>
                    <a
                        href="https://wa.me/6289521301996?text=Halo,%20apakah%20ini%20saudara%20Tio?"
                        className="button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact
                    </a>

                </div>

                <div className="home__social">
                    <a href="https://www.linkedin.com/in/tio-fulalo-simatupang-5b9547210/" target="_blank" className="home__social-icon"><i className='bx bxl-linkedin'></i></a>
                    <a href="https://scholar.google.com/citations?hl=id&user=dzrOc00AAAAJ" target='_blank' className="home__social-icon"><i class='bx bx-book'></i></a>
                    <a href="https://github.com/lalosianturi21" target='_blank' className="home__social-icon"><i className='bx bxl-github' ></i></a>
                </div>

                <div className="home__img">
                    <svg className="home__blob" viewBox="0 0 479 467" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <clipPath id="clip0">
                            <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
                        </clipPath>
                        <g clipPath="url(#clip0)">
                            <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
                            <image className="home__blob-img" xlinkHref={pictureHero} x="50" y="60" preserveAspectRatio="xMidYMid slice" />
                        </g>
                    </svg>
                </div>
            </section>
        </main>
    )
}

export default Hero
