import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero'
import About from './container/About'
import Skills from './container/Skills'
import Project from './container/Project'
import Contact from './container/Contact'

const HomePage = () => {
  return (
    <MainLayout>
       <Hero /> 
       <About /> 
       <Skills /> 
       <Project />
       <Contact /> 
    </MainLayout>
  )
}

export default HomePage
