import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/cursor.css';

let cursorPos = { 
    x: 0, y: 0
}

let mouse = { 
    x: cursorPos.x, 
    y: cursorPos.y 
}

let velocity = 0.1

const Cursor = () => {
    const tl = useRef(gsap.timeline({paused: true})) 

    const mousePos = e => {
        mouse.x = e.clientX
        mouse.y = e.clientY
    }

    useEffect(() => {
        window.addEventListener("mousemove", e => mousePos(e))

        gsap.set('#cursor', {force3D: true, rotation: 0.01})
        tl.current.to('#cursor', {duration: .5, opacity: 1, scale: 1, ease: 'power3.inOut'})

        document.getElementById('root').addEventListener("mouseleave", () => { tl.current.reverse() })
        document.getElementById('root').addEventListener("mouseover", () => { tl.current.play() })

        return () => { window.removeEventListener("mousemove", e => mousePos(e)) }

    }, [])

    gsap.ticker.add(() => {
        const setX = gsap.quickSetter('.cursor', 'x', 'px')
        const setY = gsap.quickSetter('.cursor', 'y', 'px')

        const dt = 1.0 - Math.pow(1.0 - velocity, gsap.ticker.deltaRatio());

        cursorPos.x += (mouse.x - cursorPos.x) * dt;
        cursorPos.y += (mouse.y - cursorPos.y) * dt;
        
        setX(cursorPos.x);
        setY(cursorPos.y);
    });

    return <div id="cursor" className="cursor dot"/>
    
}

export default Cursor;