import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

import '../../styles/header.css';

const Hamburger = () => {
    const [ toggle, setToggle ] = useState(false)

    useEffect(() => {
        gsap.set('.line', {force3D: true, rotation: 0.01})
    }, [])

    const handleClick = () => {
        if(toggle) {
            gsap.to('.line:nth-child(1)', {duration: .6, rotateZ: 0, marginTop: 4, y: 0})
            gsap.to('.line:nth-child(2)', {duration: .6, rotateZ: 0, opacity: 1})
            gsap.to('.line:nth-child(3)', {duration: .6, rotateZ: 0, marginTop: 4, y: 0})

            gsap.to('.menu-inner', {duration: .8, top: "-60vh", ease: "power3.out"})
            gsap.to('.menu', {duration: .6, opacity: 0, ease: "power3.out"})
        }else{
            gsap.to('.line:nth-child(1)', {duration: .6, rotateZ: 315, marginTop: 0, y: 4})
            gsap.to('.line:nth-child(2)', {duration: .6, rotateZ: 225, opacity: 0})
            gsap.to('.line:nth-child(3)', {duration: .6, rotateZ: 225, marginTop: 0, y: -4})

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
                <div className="line inview"></div>
                <div className="line inview"></div>
                <div className="line inview"></div>
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

    useEffect(() => {
        gsap.set('.fade', {opacity: 0, y: -15})
        gsap.to('.fade', {duration: 0.4, delay: 0.2, y: 0, opacity: 1, ease: "circ.out", stagger: 0.04})
    }, [])

    const handleClick = e => {
        const section = document.querySelector(`.${e.target.innerHTML}`) || document.querySelector('.hero') 
        window.scrollTo(0, section.offsetTop)   
    }

    const handleMouseOverLogo = e => {
        // gsap.to(e.target, {duration: .6, x: 5, rotateY: 10, skewY: 4, ease: "sine.out"})
    }

    const handleMouseLeaveLogo = e => {
        // gsap.to(e.target, {duration: .6, delay: .2, rotateY: 0, x: -5, skewY: 0, ease: "sine.out"})
    }

    return(
        <header>
            <div className='header-inner'>
                <div onClick={e => handleClick(e)} onMouseOver={e => handleMouseOverLogo(e)} onMouseLeave={e => handleMouseLeaveLogo(e)} className='logo fade inview'>John Roussos</div>
                <Hamburger/>
            </div>
        </header>
    )
}

export default Header;