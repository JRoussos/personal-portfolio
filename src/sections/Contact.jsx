import React from 'react';
import { gsap } from 'gsap';

import store from '../assets/utils/store';
import '../styles/sections/contact.css';

const About = () => {

    const handleOnEnter = () => {
        gsap.to('#send_mail', {duration: .6, y: -100, ease: "power3.inOut"})
    }

    const handleOnLeave = () => {
        gsap.to('#send_mail', {duration: .6, y: 0, ease: "power3.inOut"})
    }

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

    return(
        <section className="section contact">
            <div className="mail_wrapper">
                <div>
                    <p>Let's talk about your next project</p>
                    {/* <p>Have something to talk to me about?</p> */}
                    <div className="mail_container" onMouseEnter={() => handleOnEnter()} onMouseLeave={() => handleOnLeave()}>
                        <a id="send_mail" style={{transform: "translate(0, 0)"}} href="mailto:jroussosdev@gmail.com?subject=Hey John :)">Send me an email</a>
                    </div>
                    <hr/>
                </div>

                <div className="icon_container">
                    <p>follow me on</p>
                    <div style={{display: "flex"}}>
                        {store.contents.contact.map((social, index) => (
                            <div className="socials" key={index}>
                                <a target="_blank" rel="noopener noreferrer" href={social.link}>
                                    <img onMouseEnter={() => handleMouseEnterSocial(index)} onMouseLeave={() => handleMouseLeaveSocial(index)} src={social.icon} alt={social.link}/>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>© {new Date().getFullYear()}, <a target="_blank" rel="noopener noreferrer" href="https://github.com/jroussos">J.R.</a></p>
            </div>
        </section>
    )
}

export default About;