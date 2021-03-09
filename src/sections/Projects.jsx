import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { invlerp, clamp } from '../assets/utils/utils';

import store from '../assets/utils/store';
import '../styles/sections/projects.css';

const Projects = () => {
    const scrollable = useRef()
    const rAf = useRef()
    
    let currentScrollPosition = 0
    let lastScrollPosition = 0
    let downPosition = 0
    let upPosition = 0

    let isDragging = false
    let boundMax = 0
    let boundWidth = 0

    const skewVel = 0.001
    const scrollVel = 0.065
    const scaleVel = 0.1

    useEffect(() => {
        rAf.current = requestAnimationFrame(onTick)
        return () => cancelAnimationFrame(rAf.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMouseMove = e => {
        if(!isDragging) return

        currentScrollPosition = upPosition - (e.clientX - downPosition)
        currentScrollPosition = clamp(currentScrollPosition, 0, boundMax) // prevent dragging out of bound
    }

    const handleMouseDown = e => {
        e.target.setPointerCapture(e.pointerId)
        document.querySelector('.projects').style.cursor = "grabbing"        

        isDragging = true
        downPosition = e.clientX - scrollable.current.offsetLeft
    }

    const handleMouseUp = e => {
        e.target.releasePointerCapture(e.pointerId);
        document.querySelector('.projects').style.cursor = "grab"

        isDragging = false
        upPosition = currentScrollPosition
    }

    const setBounds = () => {
        let generalWidth = 0
        
        gsap.utils.toArray('.bound').forEach(slide => {
            const slideWidth = slide.getBoundingClientRect().width

            generalWidth += slideWidth
            boundWidth = generalWidth
            boundMax = boundWidth - window.innerWidth
        })

        document.querySelector('.projects .scrollable').style.width = `${generalWidth}px`        
    }

    window.addEventListener('resize', setBounds, {passive: true})
    window.addEventListener('load', setBounds, {passive: true})

    const onTick = () => {
        // const delta = 1 - Math.pow(1 - scrollVel, gsap.ticker.deltaRatio())

        const step = ( currentScrollPosition - lastScrollPosition ) * scrollVel
        lastScrollPosition += Math.round(step * 100) / 100

        const scaleY = 1 - Math.abs(( (currentScrollPosition - lastScrollPosition) / window.innerWidth ) * scaleVel)

        document.querySelectorAll('.slide-image').forEach(image => {
            image.style.transform = `scaleY(${scaleY})`
        })
        document.querySelectorAll('.projects .text').forEach(element => {
            element.style.transform = `translate3d(${step * 0.5}px, 0, 0)`
        })

        const skew = (currentScrollPosition - lastScrollPosition) * skewVel
        // const skewRounded = Math.round(skew * 100) / 100
        document.getElementById('scrollable_projects').style.transform = `translate3d(-${lastScrollPosition}px, 0, 0) skewX(${skew}deg)`

        const scale = (invlerp(0, boundMax, lastScrollPosition))
        document.getElementById("scrollbar_id").style.transform = `scaleX(${scale})`
        
        rAf.current = requestAnimationFrame(onTick)
    }

    return(
        <section id="projects" className="section projects">
            <div className="scroller react-to-mouse" 
                onMouseMove={e => handleMouseMove(e)} 
                onPointerDown={e => handleMouseDown(e)} 
                onPointerUp={e => handleMouseUp(e)}> {/* the scroll container */}
                <div ref={scrollable} id="scrollable_projects" className="scrollable"> {/* the scrollable content */}
                    
                    <div className="bound">
                        <h4 className="head">PROJECTS</h4>
                    </div>

                    {store.contents.projects.map( (project, index) => (
                        <div key={index} className="bound">
                            <div className="slide">
                                <div className="slide-inner">
                                    <img className="slide-image" src={project.img} draggable="false" alt={project.title}/>
                                    <div>
                                        <a target="_blank" tabIndex="-1" rel="noopener noreferrer" href={project.link}>
                                            <h6 className="checkIt text">check it on github</h6>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                
                </div>
            </div>

            <div className="scrollbar">
                <div id="scrollbar_id" className="scrollbar-inner"></div>
            </div>
        </section>
    )
}

export default Projects;