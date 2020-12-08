import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { invlerp, clamp } from '../assets/utils/utils';

import one from '../assets/img/projects/one.jpg';
import two from '../assets/img/projects/two.jpg';
import three from '../assets/img/projects/three.jpg';

import '../styles/sections/projects.css';

const Projects = () => {
    const scrollable = useRef()
    
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

    const images = [one, two, three]

    useEffect(() => {
        gsap.set(scrollable.current, {force3D: true, rotation: 0.01})
    }, [])

    const handleMouseMove = e => {
        if(!isDragging) return

        currentScrollPosition = upPosition - (e.clientX - downPosition)
        currentScrollPosition = clamp(currentScrollPosition, 0, boundMax) // prevent dragging out of bound
    }

    const handleMouseLeave = () => {
        gsap.timeline()
            .to('.cursor', {duration: .1, scale: 0})
            .to('.cursor', {duration: .1, scale: 1, content: "var(--dot)"})
    }

    const handleMouseEnter = () => {
        gsap.timeline()
            .to('.cursor', {duration: .1, scale: 0})
            .to('.cursor', {duration: .1, scale: 1, content: "var(--drag)"})
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

    gsap.ticker.add(() => {
        const setScrollX = gsap.quickSetter(scrollable.current, 'x', 'px')
        const setScaleY = gsap.quickSetter('.slide-image', 'scaleY')

        const delta = 1 - Math.pow(1 - scrollVel, gsap.ticker.deltaRatio())
        const step = ( currentScrollPosition - lastScrollPosition ) * delta
        
        lastScrollPosition += step
        const scrollRounded = Math.round( lastScrollPosition * 100 ) / 100

        const scaleY = 1 - Math.abs(( (currentScrollPosition - lastScrollPosition) / window.innerWidth ) * scaleVel)

        setScaleY(scaleY)
        setScrollX(-scrollRounded)
        
        gsap.utils.toArray('.text').forEach(element => {
            const setParagraph = gsap.quickSetter(element, 'x', 'px')
            setParagraph(step.toFixed(2) * 0.5)
        })

        const setSkewY = gsap.quickSetter(scrollable.current, 'skewX', 'deg')
        const skew = (currentScrollPosition - lastScrollPosition) * skewVel

        setSkewY(Math.round(skew * 100) / 100)

        const scale = (invlerp(0, boundMax, lastScrollPosition))
        document.querySelector('.scrollbar-inner').style.transform = `scaleX(${scale})`
    })

    return(
        <section id="projects" className="section projects">
            <div className="scroller" 
                onMouseMove={e => handleMouseMove(e)} 
                onPointerDown={e => handleMouseDown(e)} 
                onPointerUp={e => handleMouseUp(e)} 
                onMouseLeave={() => handleMouseLeave()}
                onMouseEnter={() => handleMouseEnter()}> {/* the scroll container */}
                <div ref={scrollable} className="scrollable"> {/* the scrollable content */}
                    
                    <div className="bound">
                        <h4 className="head">PROJECTS</h4>
                    </div>

                    {images.map( (image, index) => (
                        <div key={index} className="bound">
                            <div className="slide">
                                <div className="slide-inner">
                                    <img className="slide-image" src={image} draggable="false" alt="project"/>
                                    <div>
                                        <h6 className="checkIt text">check it on github</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                
                </div>
            </div>

            <div className="scrollbar">
                <div className="scrollbar-inner"></div>
            </div>
        </section>
    )
}

export default Projects;