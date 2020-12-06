import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/cursor.css';

let cursorPos = { 
    x: window.innerWidth/2, 
    y: window.innerHeight/2 
}

let mouse = { 
    x: cursorPos.x, 
    y: cursorPos.y 
}

let velocity = 0.1

const Cursor = () => {
    const tl = useRef(gsap.timeline({paused: true}))
    // const drag = useRef(gsap.timeline({paused: true}))    

    const mousePos = e => {
        mouse.x = e.clientX
        mouse.y = e.clientY
    }

    useEffect(() => {
        window.addEventListener("mousemove", e => mousePos(e))

        gsap.set('.cursor', {force3D: true, rotation: 0.01})
        tl.current.to('.dot', {duration: .5, opacity: 1, scale: 1, ease: 'power3.inOut'})

        document.getElementById('root').addEventListener("mouseleave", () => { tl.current.reverse() })
        document.getElementById('root').addEventListener("mouseover", () => { tl.current.play() })

        // document.querySelector('.projects').addEventListener("mouseleave", () => {
        //     // drag.current.reverse()
        //     setDragging(false)
        // })
        
        // document.querySelector('.projects').addEventListener("mouseover", () => {
        //     // drag.current.play()
        //     setDragging(true)
        // })

        // document.querySelectorAll('.magnet').forEach(link => {
        //     link.addEventListener("mousemove", e => {
        //         const distance = calculateDistance(e.target, e.clientX, e.clientY)
        //         const scale = 1 - (distance / 100)
                
        //         gsap.to('.cursor', {duration: .2, width: 40, height: 40, scale: scale, top: "-20px", left: "-20px", ease: 'sine.out'})
        //     })
    
        //     link.addEventListener("mouseleave", () => {
        //         gsap.to('.cursor', {duration: .2, width: 10, height: 10, scale: 1, top: "-5px", left: "-5px", ease: 'sine.out'})
        //     })
        // })

        // document.querySelector('.projects').addEventListener("mouseleave", () => { setDragging(false)} )
        // document.querySelector('.projects').addEventListener("mouseover", () => { setDragging(true)} )

        return () => { window.removeEventListener("mousemove", e => mousePos(e)) }

    }, [])

    gsap.ticker.add(() => {
        const setX = gsap.quickSetter('.cursor', 'x', 'px')
        const setY = gsap.quickSetter('.cursor', 'y', 'px')

        const dt = 1.0 - Math.pow(1.0 - velocity, gsap.ticker.deltaRatio());

        cursorPos.x += (mouse.x - cursorPos.x) * dt;
        cursorPos.y += (mouse.y - cursorPos.y) * dt;
        
        setX(cursorPos.x);
        setY(cursorPos.y);
    });

    return (
        <>
            {/* <svg className="cursor drag" width="52" height="16" viewBox="0 0 52 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 15.2475V0.0084343H4.556C5.74301 0.0084343 6.83226 0.196958 7.82376 0.574007C8.81526 0.951056 9.64965 1.47473 10.3269 2.14504C11.0042 2.81535 11.5297 3.62182 11.9032 4.56444C12.2768 5.50706 12.4636 6.53696 12.4636 7.65414C12.4636 9.92342 11.7566 11.7563 10.3427 13.1528C8.92872 14.5492 7.02078 15.2475 4.61884 15.2475H0ZM1.8643 13.5508H4.50364C5.10412 13.5508 5.67493 13.4844 6.21606 13.3518C6.7572 13.2191 7.24946 13.0306 7.69284 12.7862C8.13622 12.5418 8.53596 12.2416 8.89206 11.8855C9.24816 11.5294 9.54666 11.1349 9.78755 10.702C10.0284 10.269 10.2135 9.79424 10.3427 9.27755C10.4718 8.76085 10.5364 8.21971 10.5364 7.65414C10.5364 6.50205 10.2885 5.47564 9.79279 4.57491C9.29704 3.67418 8.59706 2.97071 7.69284 2.46449C6.78862 1.95826 5.75348 1.70515 4.58742 1.70515H1.8643V13.5508Z M24.314 15.239H22.0622L18.1765 9.42622H15.3277V15.239H13.4634V0H18.8677C19.7266 0 20.4807 0.1187 21.13 0.356101C21.7794 0.593502 22.3048 0.925165 22.7063 1.35109C23.1078 1.77702 23.408 2.27276 23.607 2.83834C23.806 3.40391 23.9055 4.03233 23.9055 4.72358C23.9055 5.98739 23.5861 6.99809 22.9472 7.75568C22.3083 8.51327 21.4163 9.01426 20.2712 9.25864L20.2607 9.27958L24.314 15.239ZM15.3277 1.71767V7.70855H18.365C19.573 7.70855 20.4754 7.43449 21.0724 6.88637C21.6694 6.33826 21.9679 5.60336 21.9679 4.68169C21.9679 3.7251 21.6747 2.99195 21.0881 2.48224C20.5016 1.97252 19.6812 1.71767 18.6269 1.71767H15.3277Z M36.7825 15.2402L35.421 11.5326H28.6236L27.2725 15.2402H25.314L31.0744 0.00118637H32.9492L38.7516 15.2402H36.7825ZM29.2206 9.89871H34.824L32.038 2.28442H31.9961L29.2206 9.89871Z M45.2477 7.39795H51.5319V13.3225C50.8127 13.927 49.9364 14.3975 48.903 14.7341C47.8696 15.0707 46.7699 15.239 45.6038 15.239C44.5146 15.239 43.5039 15.0604 42.5717 14.7032C41.6396 14.346 40.8366 13.8428 40.1628 13.1937C39.489 12.5446 38.9601 11.7443 38.576 10.793C38.192 9.84161 38 8.7958 38 7.65554C38 6.55649 38.1798 5.53473 38.5394 4.59023C38.899 3.64574 39.4017 2.83519 40.0476 2.15859C40.6935 1.48199 41.4894 0.953078 42.4356 0.571847C43.3817 0.190615 44.4168 0 45.541 0C46.6302 0 47.6776 0.192333 48.683 0.576999C49.6885 0.961665 50.5788 1.5524 51.3538 2.34921L50.0237 3.4826C48.8157 2.3286 47.318 1.7516 45.5305 1.7516C44.7345 1.7516 43.9926 1.89242 43.3049 2.17405C42.6171 2.45568 42.0271 2.84893 41.5348 3.35381C41.0426 3.85868 40.6551 4.48205 40.3723 5.2239C40.0895 5.96576 39.9481 6.7763 39.9481 7.65554C39.9481 8.77519 40.1802 9.77979 40.6446 10.6693C41.1089 11.5589 41.7722 12.2561 42.6346 12.761C43.4969 13.2658 44.4866 13.5183 45.6038 13.5183C47.2586 13.5183 48.6132 13.137 49.6676 12.3746V9.08773H45.2477V7.39795Z" fill="white"/>
            </svg>  */}
            <svg className="cursor dot" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="white"/>
            </svg> 
        </>
    )
    
}

export default Cursor;