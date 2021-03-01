import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

import '../styles/header.css';
import useWindowSize from '../assets/utils/useWindowSize';
import { calculateDistance } from '../assets/utils/utils';

const Hamburger = () => {
    const [ toggle, setToggle ] = useState(false)

    const handleClick = () => {
        if(toggle) {
            gsap.to('.line:nth-child(1)', {duration: .6, force3D: true, rotateZ: 0, marginTop: 4, y: 0})
            gsap.to('.line:nth-child(2)', {duration: .6, force3D: true, rotateZ: 0, opacity: 1})
            gsap.to('.line:nth-child(3)', {duration: .6, force3D: true, rotateZ: 0, marginTop: 4, y: 0})

            gsap.to('.menu-inner', {duration: .8, top: "-60vh", ease: "power3.out"})
            gsap.to('.menu', {duration: .6, opacity: 0, ease: "power3.out"})
        }else{
            gsap.to('.line:nth-child(1)', {duration: .6, force3D: true, rotateZ: 315, marginTop: 0, y: 4})
            gsap.to('.line:nth-child(2)', {duration: .6, force3D: true, rotateZ: 225, opacity: 0})
            gsap.to('.line:nth-child(3)', {duration: .6, force3D: true, rotateZ: 225, marginTop: 0, y: -4})

            gsap.to('.menu-inner', {duration: .8, top: 0, ease: "power3.out"})
            gsap.to('.menu', {duration: .6, opacity: 1, ease: "power3.out"})
        }

        setToggle(!toggle)
    }

    const handleLink = e => {
        const section = document.querySelector(`.${e.target.innerHTML}`) || document.querySelector('.hero') 
        window.scrollTo(0, section.offsetTop)
        handleClick()
    }

    return(
        <>
            <div onClick={() => handleClick()} className="hamburger fade">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className="menu">
                <div className="menu-inner">
                    <div className='magnet-links'>
                        <button onClick={e => handleLink(e)} className="magnet fade">about</button>
                        <button onClick={e => handleLink(e)} className="magnet fade">projects</button>
                        <button onClick={e => handleLink(e)} className="magnet fade">contact</button>
                    </div> 
                </div>
            </div>
        </>
    )
}

const Header = () => {
    const size = useWindowSize();
    const degrees = 10

    useEffect(() => {
        gsap.set('.magnet', {force3D: true, rotation: 0.01})
        
        gsap.to('.fade', {duration: 0.4, delay: 0.2, y: 0, opacity: 1, ease: "circ.out", stagger: 0.04})

        return () => { window.removeEventListener('mousemove', handleMouseMove) }
    }, [])

    const handleMouseMove = e => {
        const distance = calculateDistance(e.target, e.clientX, e.clientY)
        const boundingRect = e.target.getBoundingClientRect()

        const center = {
            x: boundingRect.x + e.target.offsetWidth / 2,
            y: boundingRect.y + e.target.offsetHeight / 2
        }
        
        const x = -1 * (center.x - e.clientX)
        const y = -1 * (center.y - e.clientY)

        const rotationX = -1.1 * (center.x - e.clientX - degrees)
        const rotationY = -1.0 * (center.y - e.clientY - degrees)

        const percentage = 1 - (distance / 150)

        gsap.to(e.target, {
            duration: .2, 
            scale: 1.05,
            rotateX: Math.round(rotationX*percentage),
            rotateY: Math.round(rotationY*percentage),
            x: Math.round(x*percentage), 
            y: Math.round(y*percentage),
            ease: "sine.out"
        })
    }

    const handleMouseLeave = e => {
        gsap.to(e.target, {
            duration: .2,
            scale: 1, 
            rotateX:0, x: 0, skewX: 0,
            rotateY: 0, y: 0, skewY: 0,
            rotateZ: 0,
            ease: "sine.inOut"
        })
    }

    const handleClick = e => {
        const section = document.querySelector(`.${e.target.innerHTML}`) || document.querySelector('.hero') 
        window.scrollTo(0, section.offsetTop)   
    }

    return(
        <header>
            <div className='header-inner'>
                <div onClick={e => handleClick(e)} className='logo fade'>John Roussos</div>
                {size.width < 850 ? <Hamburger/> : 
                    <div className='magnet-links'>
                        <button onMouseMove={e => handleMouseMove(e)} onMouseLeave={e => handleMouseLeave(e)} onClick={e => handleClick(e)} className="magnet fade">about</button>
                        <button onMouseMove={e => handleMouseMove(e)} onMouseLeave={e => handleMouseLeave(e)} onClick={e => handleClick(e)} className="magnet fade">projects</button>
                        <button onMouseMove={e => handleMouseMove(e)} onMouseLeave={e => handleMouseLeave(e)} onClick={e => handleClick(e)} className="magnet fade">contact</button>
                    </div> 
                }
            </div>
        </header>
    )
}

export default Header;