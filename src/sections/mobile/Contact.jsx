import React from 'react';

import victory from '../../assets/img/victory-hand_small.png';
import store from '../../assets/utils/store';
import '../../styles/sections/contact.css';

const Contact = () => {

    return(
        <section className="section contact">
            <div className="mail_wrapper">
                <div>
                    <p>Hey don't be a stranger, reach out
                        <img src={victory} alt="victory sign"/>
                    </p>
                    {/* <p>Have something to talk to me about?</p> */}
                    <div className="mail_container">
                        <a id="send_mail" style={{transform: "translate(0, 0)"}} href="mailto:jroussosdev@gmail.com?subject=Hey John :)">jroussosdev@gmail.com</a>
                    </div>
                    <hr/>
                </div>

                <div className="icon_container">
                    <p>follow me on</p>
                    <div style={{display: "flex"}}>
                        {store.contents.contact.map((social, index) => (
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