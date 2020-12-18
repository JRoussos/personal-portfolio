import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

import '../../styles/sections/contact.css';

import git from '../../assets/icons/github.png';
import fb from '../../assets/icons/facebook.png';
import ins from '../../assets/icons/instagram.png';
import tw from '../../assets/icons/twitter.png';

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

const Contact = () => {
    const [refItem, inView] = useInView({
        threshold: 0.9,
    });

    useEffect(() => {
        if(inView){
            gsap.to('.inview', {duration: .4, "--inview": "#fff"})
        }else{
            gsap.to('.inview', {duration: .4, "--inview": "#000"})
        }
    }, [inView])

    return(
        <section ref={refItem} className="section contact">
            <div className="mail_wrapper">
                <div>
                    <p>Let's talk about your next project</p>
                    {/* <p>Have something to talk to me about?</p> */}
                    <div className="mail_container">
                        {/* <p style={{fontSize: "15px", margin: "10px 0 5px"}}>Send me an email</p> */}
                        <a id="send_mail" style={{transform: "translate(0, 0)"}} href="mailto:jroussosdev@gmail.com?subject=Hey John :)">jroussosdev@gmail.com</a>
                    </div>
                    <hr/>
                </div>

                <div className="icon_container">
                    <p>follow me on</p>
                    <div style={{display: "flex"}}>
                        {socials.map((social, index) => (
                            <div className="socials" key={index}>
                                <a target="_blank" rel="noopener noreferrer" href={social.link}>
                                    <img src={social.icon} alt={social.link}/>
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

export default Contact;