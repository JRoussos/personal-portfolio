// Social icons
import git from '../icons/github.png';
import fb from '../icons/facebook.png';
import ins from '../icons/instagram.png';
import tw from '../icons/twitter.png';

// Projects
import one from '../img/projects/chat1.png';
import two from '../img/projects/two.jpg';
import three from '../img/projects/three.jpg';


const store = {
    contents: {
        about: {
            skills: [
                {title: "WEB", content: ["React", "Node.js", "SCSS", "Firebase", "HTML/CSS/JS"]},
                {title: "SOFTWARE", content: ["Python", "C/C++", "Java"]},
                {title: "TOOLS", content: ["VS Code", "Figma", "Photoshop"]}
            ],
            bio: [
                // " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus luctus enim id rutrum. Nullam pulvinar sed lorem nec tincidunt. ",
                // " Nam eleifend orci urna, non tincidunt dui aliquam vitae. Praesent feugiat lobortis mi a venenatis. Donec auctor mi lacus, sit amet varius metus ultricies a. Proin a leo quis nibh laoreet auctor. Curabitur fermentum nunc vitae velit sagittis sollicitudin. "
                " I'm a junior developer based in Greece. Currently studying at the University of Thessaly at the department of computer science and telecommunications. ",
                " I have a natural curiosity in finding out how things work and I'm always interested in learning new technologies and crafting amazing designs. I'm super enthusiastic from beginning to end of every project that I'm working on, and eager to see it thrive. "
            ]
        },
        projects: [
            {img: one, title: "A chat service written in C with a simple database to keep truck of the users and the messages they send", link: "https://github.com/JRoussos/chat-service-with-simple-db"},
            {img: two, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis vitae lectus.", link: "https://github.com/JRoussos"},
            {img: three, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis vitae lectus.", link: "https://github.com/JRoussos"}
        ],
        contact: [
            {icon: git, link: "https://github.com/JRoussos"},
            {icon: fb, link: "https://facebook.com/giannhs.roussos.s/"},
            {icon: ins, link: "https://www.instagram.com/giannhs_r/"},
            {icon: tw, link: "https://twitter.com/giannhs41"}
        ]
    }
}

export default store