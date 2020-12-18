// Social icons
import git from '../icons/github.png';
import fb from '../icons/facebook.png';
import ins from '../icons/instagram.png';
import tw from '../icons/twitter.png';

// Projects
import chat from '../img/projects/chat.jpg';
import bus from '../img/projects/bus.jpg';
// import film from '../img/projects/film.jpg';


const store = {
    contents: {
        about: {
            skills: [
                {title: "DESIGN", content: ["Prototyping", "Sketches", "Animations"]},
                {title: "WEB", content: ["React", "Node.js", "SCSS", "Firebase", "HTML/CSS/JS"]},
                {title: "SOFTWARE", content: ["Python", "C/C++", "Java"]},
                {title: "TOOLS", content: ["VS Code", "Figma", "Photoshop"]}
            ],
            bio: [
                " I'm a junior web developer based in Greece, with a passion for intuitive UI/UX designs. Currently I study at the University of Thessaly at the department of computer science and telecommunications. ",
                " I have a natural curiosity in finding out how things work and I'm always interested in learning new technologies. ",
                " My first steps into coding was at a very young age when I got my first arduino kit. From that point on I was hooked, and the thrill that every new challenge game me made it even more addictive. I love crafting amazing designs and delivering the best possible user experience. "
            ]
        },
        projects: [
            {img: bus, title: "An app to inform the users about the routes, the times, the rates and all other kind on info concerning the every-day transportation on the island of Syros", link: "https://github.com/JRoussos/the-bus-project"},
            // {img: film, title: "A web app with minimalistic design, that lets you search for a movie or series and shows you some info about them", link: "https://github.com/JRoussos/the-film-app"},
            {img: chat, title: "A chat service written in C with a simple database to keep truck of the users and the messages they send", link: "https://github.com/JRoussos/chat-service-with-simple-db"},
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