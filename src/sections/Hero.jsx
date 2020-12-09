import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

import wave from '../assets/img/waving-hand.png';
import image from '../assets/img/image.jpg';

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
        inView && wavingHand(1.5)
    }, [inView])

    const wavingHand = delay => {
        gsap.timeline({repeat: 3, yoyo: true, delay})
            .to('.wave_wrapper', {duration: .4, rotateZ: 30, ease: "sine.inOut"})
    }

    return(
        <section className="section landing">
            <div ref={refItem} className="text">
                <div className="parallax">
                    <h1 className="welcome">Hey, I'm John, a front-end developer <br/> and softwate engineer.
                        <span className="wave_wrapper">
                            <img id="wave" src={wave} alt="waving hand"/>
                        </span>
                    </h1>
                </div>
            </div>
            <img className="profile" src={image} alt="profile"/>
        </section>

    )
}

export default Hero;