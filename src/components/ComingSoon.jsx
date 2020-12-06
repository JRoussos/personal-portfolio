import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/comingsoon.css';

import git from '../assets/icons/github.png';
import fb from '../assets/icons/facebook.png';
import ins from '../assets/icons/instagram.png';
import tw from '../assets/icons/twitter.png';

const socials = [
    {
        icon: git,
        link: "https://github.com/JRoussos"
    },
    {
        icon: fb,
        link: "https://facebook.com/giannhs.roussos.s/"
    },
    {
        icon: ins,
        link: "https://www.instagram.com/giannhs_r/"
    },
    {
        icon: tw,
        link: "https://twitter.com/giannhs41"
    }
]

const ComingSoon = () => {

    const handleMouseEnterSocial = i => {
        gsap.utils.toArray('.socials').forEach( (social, index) => {
            if(index !== i){
                gsap.to(social, {duration: .6, opacity: .4, ease: "circ.out"})
            }
        })
    }

    const handleMouseLeaveSocial = i => {
        gsap.utils.toArray('.socials').forEach( (social, index) => {
            if(index !== i){
                gsap.to(social, {duration: .6, opacity: 1, ease: "circ.out"})
            }
        })
    }

    useEffect(() => {
        gsap.to(".fade", {duration: .7, opacity: 1, ease: "sine.out"})
        gsap.timeline({repeat: -1}).to('.wrapper', {duration: 15, force3D: true, x: -617, ease: "none"})
    }, [])

    return (
        <section>
            <div className="marquee">
                <div className="container">
                    <div className="wrapper"><p className="fade"> COMING SOON COMING SOON COMING SOON COMING SOON </p></div>
                    <div className="wrapper"><p className="fade"> COMING SOON COMING SOON COMING SOON COMING SOON </p></div>
                    <div className="wrapper"><p className="fade"> COMING SOON COMING SOON COMING SOON COMING SOON </p></div>
                    <div className="wrapper"><p className="fade"> COMING SOON COMING SOON COMING SOON COMING SOON </p></div>
                    <div className="wrapper"><p className="fade"> COMING SOON COMING SOON COMING SOON COMING SOON </p></div>
                    <div className="wrapper"><p className="fade"> COMING SOON COMING SOON COMING SOON COMING SOON </p></div>
                    <div className="wrapper"><p className="fade"> COMING SOON COMING SOON COMING SOON COMING SOON </p></div>
                    <div className="wrapper"><p className="fade"> COMING SOON COMING SOON COMING SOON COMING SOON </p></div>
                </div>
            </div>
            <div className="icon_container fade">
                <div style={{display: "flex"}}>
                    {socials.map((social, index) => (
                        <div className="socials" key={index}>
                            <a target="_blank" rel="noopener noreferrer" href={social.link}>
                                <img onMouseEnter={() => handleMouseEnterSocial(index)} onMouseLeave={() => handleMouseLeaveSocial(index)} src={social.icon} alt={social.link}/>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default ComingSoon;