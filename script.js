const text = "Welcome to my World!";
const typing = document.getElementById("typing");

let i = 0;

function type() {
    if (i < text.length) {
        typing.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            typing.textContent = "";
            i = 0;
            type();
        }, 1500);
    }
}
type();

const p=document.createElement('p');
p.className='box';

//about page 
/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


/* Close mobile menu after clicking a link */

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});


/* =====================================================
   DARK MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀";

        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.textContent = "☼";

        localStorage.setItem("theme", "light");

    }

});


/* Remember user's theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀";

}


