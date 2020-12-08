import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/cursor.css';

let cursorPos = { 
    x: window.innerWidth/2, 
    y: window.innerHeight/2 
}

let mouse = { 
    x: cursorPos.x, 
    y: cursorPos.y 
}

let velocity = 0.1

const Cursor = () => {
    const tl = useRef(gsap.timeline({paused: true}))
    // const drag = useRef(gsap.timeline({paused: true}))    

    const mousePos = e => {
        mouse.x = e.clientX
        mouse.y = e.clientY
    }

    useEffect(() => {
        window.addEventListener("mousemove", e => mousePos(e))

        gsap.set('.cursor', {force3D: true, rotation: 0.01})
        tl.current.to('.dot', {duration: .5, opacity: 1, scale: 1, ease: 'power3.inOut'})

        document.getElementById('root').addEventListener("mouseleave", () => { tl.current.reverse() })
        document.getElementById('root').addEventListener("mouseover", () => { tl.current.play() })

        // document.querySelector('.projects').addEventListener("mouseleave", () => {
        //     // drag.current.reverse()
        //     setDragging(false)
        // })
        
        // document.querySelector('.projects').addEventListener("mouseover", () => {
        //     // drag.current.play()
        //     setDragging(true)
        // })

        // document.querySelectorAll('.magnet').forEach(link => {
        //     link.addEventListener("mousemove", e => {
        //         const distance = calculateDistance(e.target, e.clientX, e.clientY)
        //         const scale = 1 - (distance / 100)
                
        //         gsap.to('.cursor', {duration: .2, width: 40, height: 40, scale: scale, top: "-20px", left: "-20px", ease: 'sine.out'})
        //     })
    
        //     link.addEventListener("mouseleave", () => {
        //         gsap.to('.cursor', {duration: .2, width: 10, height: 10, scale: 1, top: "-5px", left: "-5px", ease: 'sine.out'})
        //     })
        // })

        // document.querySelector('.projects').addEventListener("mouseleave", () => { setDragging(false)} )
        // document.querySelector('.projects').addEventListener("mouseover", () => { setDragging(true)} )

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