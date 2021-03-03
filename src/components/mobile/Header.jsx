import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

import '../../styles/header.css';

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
        gsap.to('.fade', {duration: 0.4, delay: 0.7, y: 0, opacity: 1, ease: "sine.out", stagger: 0.06})
    }, [])

    const handleClick = e => {
        const section = document.querySelector(`.${e.target.innerHTML}`) || document.querySelector('.hero') 
        window.scrollTo(0, section.offsetTop)   
    }

    return(
        <header>
            <div className='header-inner'>
                <div onClick={e => handleClick(e)} className='logo fade inview'>John Roussos</div>
                <Hamburger/>
            </div>
        </header>
    )
}

export default Header;