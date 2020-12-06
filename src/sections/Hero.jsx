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
        gsap.set('.welcome', { rotateX: -45, y: 50, skewX: 20, opacity: 0})
        gsap.set('.profile', { opacity: 0})

        gsap.timeline({force3D: true, rotate: 0.01, delay: 0.2})
            .to('.profile', {duration: 1, opacity: 1, ease: "sine.out"})
            .to('.welcome', {duration: 1.5, opacity: 1, skewX: 0, rotateX: 0, y: 0, ease: "power3.out", stagger: 0.2}, "-=1")

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
                    <p className="welcome">Hey, I'm John, a front-end developer <br/> and softwate engineer.
                        <span className="wave_wrapper">
                            <img id="wave" src={wave} alt="waving hand"/>
                        </span>
                    </p>
                </div>
            </div>
            <img className="profile" src={image} alt="profile"/>
        </section>

    )
}

export default Hero;