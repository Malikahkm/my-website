/* =====================================================
   HOME PAGE - TYPING EFFECT
===================================================== */

const text = "Welcome to my World!";
const typing = document.getElementById("typing");

if (typing) {

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
}


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });


    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

        });

    });
}


/* =====================================================
   DARK MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    /* Check saved theme */

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");
        themeToggle.textContent = "☀";

    }


    /* Toggle dark mode */

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
}

