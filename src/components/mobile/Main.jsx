import React, { useRef, useEffect } from 'react';
import { range } from '../../assets/utils/utils';

import Hero from '../../sections/Hero';
import About from '../../sections/About';
import Projects from '../../sections/mobile/Projects';
import Contact from '../../sections/mobile/Contact';

import '../../styles/main.css';

const Main = () => {
    const scroller = useRef()
    const scrollable = useRef()

    const requestRef = useRef()
    
    let currentScrollPosition = 0
    let lastScrollPosition = 0

    const scrollVel = 0.065

    useEffect(() => {
        setBounds()

        requestRef.current = requestAnimationFrame(onTick)
        return () => cancelAnimationFrame(requestRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleOnScroll = () => {
        currentScrollPosition = window.scrollY
        // return () => cancelAnimationFrame(requestRef.current)
    }

    const setBounds = () => {
        let bodyHeight = 0
        let section_list = [ ...document.querySelectorAll('.section')]
        section_list.forEach(element => {
            bodyHeight += element.clientHeight
        });

        document.body.style.height = `${bodyHeight}px`
        // document.body.style.height = `${document.getElementById('scrollable').getBoundingClientRect().height}px`
    }

    window.addEventListener('scroll', handleOnScroll, { passive: true })
    window.addEventListener('resize', setBounds, {passive: true})
    // window.addEventListener('load', setBounds, {passive: true})

    setTimeout(() => {
        setBounds()
        // console.log("bounds reset");
    }, 500);

    const onTick = () => {
        // const delta = 1.0 - Math.pow(1.0 - scrollVel, gsap.ticker.deltaRatio())

        const step = ( currentScrollPosition - lastScrollPosition ) * scrollVel
        lastScrollPosition += Math.round(step * 100) / 100

        const scrollableHeight = document.querySelector('#scrollable').clientHeight
        const bodyHeight = document.body.clientHeight
        const contactHeight = document.querySelector('.contact').getBoundingClientRect().bottom // section height and its margin

        // change querySelector to getElementById for performance reasons
        document.getElementById('scrollable').style.transform = `translate3d(0, -${lastScrollPosition}px, 0)`
        document.getElementById('parallax').style.transform = `translate3d(0, ${lastScrollPosition* 0.2}px, 0)`

        document.getElementById('contact_wrapper').style.transform = `translate3d(0, ${ range( scrollableHeight, bodyHeight, 50, 0, lastScrollPosition + contactHeight) }%, 0`

        requestRef.current = requestAnimationFrame(onTick)
    }

    return(
        <main ref={scroller} className="scroller"> {/* the scroll container */}
            <div ref={scrollable} id="scrollable" className="scrollable"> {/* the scrollable content */}
                <Hero/>
                <About mainBounds={setBounds}/>
                <Projects/>
            </div>
            <Contact/>
        </main>
    )
}

export default Main;