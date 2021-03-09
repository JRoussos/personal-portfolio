import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

import '../../styles/header.css';

const Hamburger = () => {
    const [ toggle, setToggle ] = useState(false)

    useEffect(() => {
        gsap.to('.fade', {duration: 0.35, delay: 0.5, y: 0, opacity: 1, ease: "circ.out", stagger: 0.06} )
    }, [])

    const handleClick = () => {
        if(toggle) {
            gsap.to('.line:nth-child(1)', {duration: .6, force3D: true, rotateZ: 0, marginTop: 4, y: 0})
            gsap.to('.line:nth-child(2)', {duration: .6, force3D: true, rotateZ: 0, marginTop: 4, y: 0})

            gsap.to('.menu-inner', {duration: .8, top: "-60vh", ease: "power3.out"})
            gsap.to('.menu', {duration: .6, opacity: 0, ease: "power3.out"})
        }else{
            gsap.to('.line:nth-child(1)', {duration: .6, force3D: true, rotateZ: 320, marginTop: 0, y: 1})
            gsap.to('.line:nth-child(2)', {duration: .6, force3D: true, rotateZ: 220, marginTop: 0, y: -1})

            gsap.to('.menu-inner', {duration: .8, top: 0, ease: "power3.out"})
            gsap.to('.menu', {duration: .6, opacity: 1, ease: "power3.out"})
        }

        setToggle(!toggle)
    }

    const handleLink = e => {
        if(e.target.id === 'contact')
            window.scrollTo(0, document.querySelector('.scrollable').getBoundingClientRect().height)   
        else
            window.scrollTo(0, document.querySelector(`.${e.target.id}`).offsetTop) 
        handleClick()
    }

    return(
        <>
            <div onClick={() => handleClick()} className="hamburger">
                <div className="line inview fade"></div>
                <div className="line inview fade"></div>
            </div>
            <div className="menu">
                <div className="menu-inner">
                    <div className='magnet-links'>
                        <button onClick={e => handleLink(e)} className="magnet" id='about'>about</button>
                        <button onClick={e => handleLink(e)} className="magnet" id='projects'>projects</button>
                        <button onClick={e => handleLink(e)} className="magnet" id='contact'>contact</button>
                    </div> 
                </div>
            </div>
        </>
    )
}

const Header = () => {

    useEffect(() => {
        gsap.to('.fade', {duration: 0.4, delay: 0.5, y: 0, opacity: 1, ease: "sine.out", stagger: 0.06})
    }, [])

    const handleClick = e => {
        if(e.target.id === 'contact')
            window.scrollTo(0, document.querySelector('.scrollable').getBoundingClientRect().height)   
        else
            window.scrollTo(0, document.querySelector(`.${e.target.id}`).offsetTop) 
    }

    return(
        <header>
            <div className='header-inner'>
                <div id='hero' onClick={e => handleClick(e)} className='logo fade inview'>John Roussos</div>
                <Hamburger/>
            </div>
        </header>
    )
}

export default Header;