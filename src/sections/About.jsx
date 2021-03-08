import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import store from '../assets/utils/store';
import '../styles/sections/about.css';

const Skills = ({mainBounds}) => {
    const [ collapse, setCollapse ] = useState([ false, true, true, true ])
    const [ heights, setHeights ] = useState([])

    const skillsPanel = useRef()

    useEffect(() => {
        const array = []
        for(let i=0; i<4; i++){
            array[i] = document.querySelector(`#skill_wrapper_${i} div`).getBoundingClientRect().height || 0
        }

        setHeights(array)
        initToggle()
    }, [])
    
    const initToggle = () => {
        gsap.set(`#skill_wrapper_0 li`, {opacity: 1})
        gsap.set(`#skill_wrapper_0 h4`, {"--angle": "45deg"})
        gsap.set(`#skill_wrapper_1 div`, {height: 0})
        gsap.set(`#skill_wrapper_2 div`, {height: 0})
        gsap.set(`#skill_wrapper_3 div`, {height: 0})
    }

    const toggleCollapse = (index, e) => {
        const array = collapse
        array[index] = !collapse[index]
        setCollapse(array)

        // if you do that, when its closed the height is equal to 0
        // const height = e.target.nextSibling.getBoundingClientRect().height
        
        if(collapse[index]){
            gsap.to(e.target, {duration: .3, "--angle": "0deg", ease: "sine.inOut"})
            gsap.to(e.target.nextSibling, {duration: .5, height: 0, ease: "sine.inOut", onComplete: () => mainBounds() })
            gsap.to(`#skill_wrapper_${index} li`, {duration: .25, opacity: 0, ease: "sine.inOut", stagger: { amount: 0.2, from: "end"}})
        }else{
            gsap.to(e.target, {duration: .3, "--angle": "45deg", ease: "sine.inOut"})
            gsap.to(e.target.nextSibling, {duration: .5, height: heights[index], ease: "sine.inOut", onComplete: () => mainBounds() })
            gsap.to(`#skill_wrapper_${index} li`, {duration: .25, opacity: 1, ease: "sine.inOut", stagger: { amount: 0.2, from: "start"}})
        }
    }

    return(
        <div ref={skillsPanel} className="skills">
            {store.contents.about.skills.map(( item, index ) => (
                <div id={`skill_wrapper_${index}`} key={ index }>
                    <h4 className="react-to-mouse" onClick={e => toggleCollapse(index, e)}> {item.title} </h4>
                    <div className="list" style={{ overflow: "hidden" }}>
                        <ul> {item.content.map(( content, index ) => <li key={index}>{ content }</li>)} </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

const Bio = () => {
    return(
        <div className="bio">
            <h3 className="title paragraph">ABOUT</h3>
            <hr/>
            {store.contents.about.bio.map( (paragraph, index) => (
                <p className="paragraph" key={index}>{paragraph}</p>
            ))}
        </div>
    )
}


const About = ({mainBounds}) => {
    return(
        <section className="section about">
            <Skills mainBounds={mainBounds}/>
            <Bio/>
        </section>
    )
}

export default About;