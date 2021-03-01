import React, { useRef, useEffect } from 'react';

import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

import '../styles/main.css';

const Main = () => {
    const scroller = useRef()
    const scrollable = useRef()

    const rAf = useRef()
    
    let currentScrollPosition = 0
    let lastScrollPosition = 0

    const skewVel = 0.004
    const scrollVel = 0.065

    useEffect(() => {
        rAf.current = requestAnimationFrame(onTick)
        return () => cancelAnimationFrame(rAf.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOnScroll = () => {
        currentScrollPosition = window.scrollY
    }

    const setBounds = () => {
        document.body.style.height = `${document.getElementById('scrollable').getBoundingClientRect().height}px`
    }

    window.addEventListener('scroll', handleOnScroll, { passive: true })
    window.addEventListener('resize', setBounds, {passive: true})
    window.addEventListener('load', setBounds)

    setTimeout(() => {
        setBounds()
        // console.log("bounds reset");
    }, 500);

    const onTick = () => {
        // const delta = 1 - Math.pow(1 - scrollVel, gsap.ticker.deltaRatio())
        const step = ( currentScrollPosition - lastScrollPosition ) * scrollVel
        lastScrollPosition += Math.round(step * 100) / 100

        // console.log(step, lastScrollPosition);

        const skew = (currentScrollPosition - lastScrollPosition) * skewVel
        const skewRounded = Math.round(skew * 100) / 100

        // change querySelector to getElementById for performance reasons
        document.getElementById('scrollable').style.transform = `translate3d(0, -${lastScrollPosition}px, 0) skewY(${skewRounded}deg)`
        document.getElementById('parallax').style.transform = `translate3d(0, ${lastScrollPosition * 0.2}px, 0)`
        // document.querySelectorAll('.paragraph').forEach(paragraph => {
        //     paragraph.style.transform = `translate3d(0, -${step * 1.35}px, 0)`
        // })

        rAf.current = requestAnimationFrame(onTick)
    }

    return(
        <main ref={scroller} className="scroller"> {/* the scroll container */}
            <div ref={scrollable} id="scrollable" className="scrollable"> {/* the scrollable content */}
                <Hero/>
                <About mainBounds={setBounds}/>
                <Projects/>
                <Contact/>
            </div>
        </main>
    )
}

export default Main;