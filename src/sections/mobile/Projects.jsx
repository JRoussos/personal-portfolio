import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { invlerp } from '../../assets/utils/utils';

import store from '../../assets/utils/store';
import '../../styles/sections/projects.css';

const Projects = () => {
    const scrollable = useRef()
    const rAf = useRef()
    
    let currentScrollPosition = 0
    let lastScrollPosition = 0

    let boundMax = 0
    let boundWidth = 0

    const scrollVel = 0.065
    const scaleVel = 0.03

    useEffect(() => {
        setBounds()

        rAf.current = requestAnimationFrame(onTick)
        return () => cancelAnimationFrame(rAf.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleScroll = e => {
        currentScrollPosition = e.target.scrollLeft
        e.target.removeEventListener('scroll', handleScroll)
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

    const onTick = () => {
        const delta = 1 - Math.pow(1 - scrollVel, gsap.ticker.deltaRatio())
        const step = ( currentScrollPosition - lastScrollPosition ) * delta
        
        lastScrollPosition += step
        const scrollRounded = Math.round( lastScrollPosition * 100 ) / 100

        const scaleY = 1 - Math.abs(( (currentScrollPosition - lastScrollPosition) / window.innerWidth ) * scaleVel)
        document.querySelector('.projects .scrollable').style.transform = `scaleY(${scaleY})`

        // document.querySelectorAll('.slide-image').forEach(image => {
        //     image.style.transform = `skewX(${skewRounded}deg)`
        // })

        document.querySelectorAll('.projects .text').forEach(element => {
            element.style.transform = `translate3d(${step * 2}px, 0, 0)`
        })
        
        const scaleX = (invlerp(0, boundMax.toFixed(2), scrollRounded))
        document.querySelector('.scrollbar-inner').style.transform = `scaleX(${scaleX})`

        rAf.current = requestAnimationFrame(onTick)
    }

    return(
        <section className="section projects">
            <div className="scroller" style={{overflowX: "scroll"}} onScroll={e => handleScroll(e)}> {/* the scroll container */}
                <div ref={scrollable} className="scrollable"> {/* the scrollable content */}
                    
                    <div className="bound">
                        <h4 className="head">PROJECTS</h4>
                    </div>

                    {store.contents.projects.map( (project, index) => (
                        <div key={index} className="bound">
                            <div className="slide">
                                <div className="slide-inner">
                                    <img className="slide-image" src={project.img} draggable="false" alt={project.title}/>
                                    <div>
                                        <a target="_blank" rel="noopener noreferrer" href={project.link}>
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
                <div className="scrollbar-inner"></div>
            </div>
        </section>
    )
}

export default Projects;