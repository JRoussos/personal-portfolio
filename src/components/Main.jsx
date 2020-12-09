import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

import '../styles/main.css';

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
    const scroller = useRef()
    const scrollable = useRef()
    
    let currentScrollPosition = 0
    let lastScrollPosition = 0

    const skewVel = 0.004
    const scrollVel = 0.065

    useEffect(() => {
        // setBounds()
        gsap.set(scrollable.current, {force3D: true, rotation: 0.01})
    }, [])

    const handleOnScroll = () => {
        currentScrollPosition = window.scrollY
    }

    const setBounds = () => {
        document.body.style.height = `${document.querySelector('.scrollable').getBoundingClientRect().height}px`
    }

    window.addEventListener('scroll', handleOnScroll, { passive: true })
    window.addEventListener('resize', setBounds, {passive: true})
    window.addEventListener('load', setBounds, {passive: true})

    gsap.ticker.add(() => {
        const setScrollY = gsap.quickSetter(scrollable.current, 'y', 'px')

        const delta = 1 - Math.pow(1 - scrollVel, gsap.ticker.deltaRatio())
        const step = ( currentScrollPosition - lastScrollPosition ) * delta

        lastScrollPosition += step
        const scrollRounded = Math.round( lastScrollPosition * 100 ) / 100

        setScrollY(-scrollRounded)

        const setParallaxY = gsap.quickSetter('.parallax', 'y', 'px')
        setParallaxY(scrollRounded * 0.2)

        gsap.utils.toArray('.paragraph').forEach((element, i) => {
            const setParagraph = gsap.quickSetter(element, 'y', 'px')
            // setParagraph(-(Math.round(step * 100) / 100) * (1+i) * 0.5)
            setParagraph(-(Math.round(step * 100) / 100) * 1.15)
        })


        const setSkewY = gsap.quickSetter(scrollable.current, 'skewY', 'deg')
        const skew = (currentScrollPosition - lastScrollPosition) * skewVel

        setSkewY(Math.round(skew * 100) / 100)
    })

    return(
        <article ref={scroller} className="scroller"> {/* the scroll container */}
            <div ref={scrollable} className="scrollable"> {/* the scrollable content */}
                <Hero/>
                <About mainBounds={setBounds}/>
                <Projects/>
                <Contact/>
            </div>
        </article>
    )
}

export default Main;