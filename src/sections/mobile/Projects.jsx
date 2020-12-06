import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { invlerp } from '../../assets/utils/utils';

import one from '../../assets/img/projects/one.jpg';
import two from '../../assets/img/projects/two.jpg';
import three from '../../assets/img/projects/three.jpg';

import '../../styles/sections/projects.css';

const Projects = () => {
    const scrollable = useRef()
    
    let currentScrollPosition = 0
    let lastScrollPosition = 0

    let boundMax = 0
    let boundWidth = 0

    const scrollVel = 0.065
    const scaleVel = 0.1

    const images = [one, two, three]

    useEffect(() => {
        gsap.set(scrollable.current, {force3D: true, rotation: 0.01})
        setBounds()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleScroll = e => {
        currentScrollPosition = e.target.scrollLeft
    }
    
    const setBounds = () => {
        let generalWidth = 0
        
        gsap.utils.toArray('.bound').forEach(slide => {
            const slideWidth = slide.getBoundingClientRect().width

            // console.log("slideWidth: ", slideWidth);
            
            generalWidth += slideWidth
            boundWidth = generalWidth
            boundMax = boundWidth - window.innerWidth
        })

        // console.log("boundMax:", boundMax, "boundWidth/general:", boundWidth, "windowInner:", window.innerWidth);
        document.querySelector('.projects .scrollable').style.width = `${boundMax}px`        
    }

    window.addEventListener('resize', setBounds, {passive: true})

    gsap.ticker.add(() => {
        const setScaleY = gsap.quickSetter('.slide-image', 'scaleY')

        const delta = 1 - Math.pow(1 - scrollVel, gsap.ticker.deltaRatio())
        const step = ( currentScrollPosition - lastScrollPosition ) * delta
        
        lastScrollPosition += step
        const scrollRounded = lastScrollPosition.toFixed(2)

        const scaleY = 1 - Math.abs(( (currentScrollPosition - lastScrollPosition) / window.innerWidth ) * scaleVel)
        setScaleY(scaleY)
        
        const scale = (invlerp(0, boundMax.toFixed(2), scrollRounded))
        document.querySelector('.scrollbar-inner').style.transform = `scaleX(${scale})`
    })

    return(
        <section className="section projects">
            <div className="scroller" style={{overflowX: "scroll"}} onScroll={e => handleScroll(e)}> {/* the scroll container */}
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