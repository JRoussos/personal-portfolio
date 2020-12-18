# My Personal Portfolio Site 

### Well.. This is self explanatory I guess 🤷‍♂️

### Check it out at: [johnroussos.me](https://johnroussos.me/) 

## The what

I learned a lot building this site, mainly how to create complex animation such as the "magnet" effect I used in the links or the smooth scrolling on the page horizontal and vertical. 

## The how 

### I used: 
[gsap](https://www.npmjs.com/package/gsap) for all the animations in the page.<br> 
[react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) for triggering some actions. <br>
[react-device-detect](https://www.npmjs.com/package/react-device-detect) for serving different versions of the page in mobile and browser. <br>
[firebase](https://www.npmjs.com/package/firebase) for hosting, storage, database and analytics

### Problems & solutions: 

I was using the ticker functionality of gsap for the smooth scroll of the page and also the projects slider but I noticed that for some reason I was having a few droped frames here and there, and in firefox it was basically unusable (major lags). And the solution was to switch to a good old requestAnimationFrame. 


## To do next

This project is almost finished, however I have some more ideas that may end up in the final version.

- Morph svg dot in other shapes depending the content
- Add a marquee text as divider between sections
- Render images dynamicaly
- Connect firebase storage and database

In a later version I'm planning on building a detailed page for each project, containing specifics and characteristics for the project at stake.

## MIT License

Copyright (c) 2020 John Roussos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

