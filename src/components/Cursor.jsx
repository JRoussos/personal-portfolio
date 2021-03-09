import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import '../styles/cursor.css';

let velocity = 0.08
let mouse = {
    x: { previous: 0, current: 0 },
    y: { previous: 0, current: 0 }
}

const Cursor = () => {
    const tl = useRef( gsap.timeline() ) 

    const mousePos = e => {
        mouse.x.current = e.clientX
        mouse.y.current = e.clientY
    }

    useEffect(() => {
        window.addEventListener("mousemove", e => mousePos(e))

        gsap.set('#cursor', {force3D: true, rotation: 0.01})
        tl.current.to('#cursor', {duration: .5, opacity: 1, scale: 1, ease: 'power3.inOut'})

        document.getElementById('root').addEventListener("mouseleave", () => tl.current.reverse() )
        document.getElementById('root').addEventListener("mouseover", () => tl.current.play() )

        const nodeList = [ ...document.querySelectorAll('.react-to-mouse')]
        nodeList.forEach(element => {
            element.addEventListener('mouseenter', () => gsap.to('circle', {duration: .4, r: 30, ease: 'power3.inOut'}) );
            element.addEventListener('mouseleave', () => gsap.to('circle', {duration: .4, r: 6, ease: 'power3.inOut'}) );
        });

        return () => { window.removeEventListener("mousemove", e => mousePos(e)) }

    }, [])

    gsap.ticker.add(() => {
        const setX = gsap.quickSetter('.cursor', 'x', 'px')
        const setY = gsap.quickSetter('.cursor', 'y', 'px')

        const dt = 1.0 - Math.pow(1.0 - velocity, gsap.ticker.deltaRatio());

        mouse.x.previous += ( mouse.x.current - mouse.x.previous ) * dt;
        mouse.y.previous += ( mouse.y.current - mouse.y.previous ) * dt;
        
        setX(mouse.x.previous);
        setY(mouse.y.previous);
    });

    return (
        <svg id="cursor" className="cursor dot" width="220" height="220" fill="none" viewBox="0 0 220 220" >
            <circle cx="110" cy="110" r="6" strokeWidth="2px" stroke="white"/>
        </svg>
    )
    
}

export default Cursor;