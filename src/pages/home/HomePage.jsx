import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero'
import About from './container/About'
import Skills from './container/Skills'
import Project from './container/Project'
import Contact from './container/Contact'
import Articles from './container/Articles'


const HomePage = () => {
  return (
    <MainLayout>
       <div className="bg-blue-500 text-white p-5">
      Tailwind Berhasil!
    </div>
       <Hero /> 
       <About /> 
       <Skills /> 
       {/* <Project /> */}
       <Articles />
       <Contact /> 
    </MainLayout>
  )
}

export default HomePage
