import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

import wave_large from '../assets/img/waving-hand.png';
import wave_small from '../assets/img/waving-hand_small.png';
// import image from '../assets/img/image.webp';
import image from '../assets/img/profile.webp';

import '../styles/sections/hero.css';

const Hero = () => {
    const [refItem, inView] = useInView({
        threshold: 0,
    });

    useEffect(() => {
        gsap.set('.welcome', { lineHeight: "2.5em", y: 70, opacity: 0})
        gsap.set('.profile', { y: 20, opacity: 0})

        gsap.timeline({force3D: true, rotate: 0.01, delay: 0.2})
            .to('.profile', {duration: 0.5, y: 0, opacity: 1, ease: "power4.out"})
            .to('.welcome', {duration: 1, opacity: 1, lineHeight: "1.5em", y: 0, ease: "power4.out"}, "-=0.5")

    }, [])

    useEffect(() => {
        inView && waveHello(1.5)
    }, [inView])

    const waveHello = delay => {
        gsap.timeline({repeat: 3, yoyo: true, delay, onComplete: () => {gsap.set('.wave_wrapper', {rotateZ: 0}) } })
            .to('.wave_wrapper', {duration: .4, rotateZ: 30, ease: "sine.inOut"})
    }

    return(
        <section className="section hero">
            <div ref={refItem} className="text">
                <div id="parallax">
                    <h1 className="welcome">Hi, I'm John, a front-end developer <br/> and software engineer.
                        <span className="wave_wrapper">
                            <img id="wave" src={wave_large} srcSet={`${wave_small}, ${wave_large} 2x`} alt="waving hand"/>
                        </span>
                    </h1>
                </div>
            </div>
            <img className="profile" src={image} alt="profile"/>
        </section>

    )
}

export default Hero;