/* script.js
   Load with <script src="script.js" defer></script> in the <head>.
   Everything is wrapped in one function so no names leak into the
   global scope, and every feature checks that its elements exist,
   so the same file works on all pages. */
(function () {
    "use strict";

    var root = document.documentElement;

    /* small helper: matchMedia listeners (older Safari uses addListener) */
    function onMediaChange(query, handler) {
        if (query.addEventListener) {
            query.addEventListener("change", handler);
        } else if (query.addListener) {
            query.addListener(handler);
        }
    }


    /* =====================================================
       DARK MODE
       theme-init.js has already set data-theme before paint.
       This part handles the toggle button.
    ===================================================== */

    var themeToggle = document.getElementById("themeToggle");
    var osDark = window.matchMedia("(prefers-color-scheme: dark)");

    function savedTheme() {
        try {
            return localStorage.getItem("theme");
        } catch (e) {
            return null;
        }
    }

    function applyTheme(theme) {
        if (theme === "dark") {
            root.setAttribute("data-theme", "dark");
        } else {
            root.removeAttribute("data-theme");
        }

        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
        }
    }

    applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

            applyTheme(next);

            try {
                localStorage.setItem("theme", next);
            } catch (e) {
                /* storage blocked: the theme still changes for this visit */
            }
        });
    }

    /* follow the OS setting live, but only until the visitor picks a theme */
    onMediaChange(osDark, function (event) {
        if (!savedTheme()) {
            applyTheme(event.matches ? "dark" : "light");
        }
    });


    /* =====================================================
       MOBILE MENU (three-line button)
       Every click toggles the menu open/closed. It also closes
       when a link is tapped, when you tap outside, on Escape,
       and when the screen grows to desktop size.
    ===================================================== */

    var menuButton = document.getElementById("menuButton");
    var navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {
        var desktop = window.matchMedia("(min-width: 901px)");

        function setMenu(open) {
            navLinks.classList.toggle("open", open);
            menuButton.setAttribute("aria-expanded", String(open));
            menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        }

        menuButton.addEventListener("click", function () {
            setMenu(!navLinks.classList.contains("open"));
        });

        navLinks.addEventListener("click", function (event) {
            if (event.target.closest("a")) {
                setMenu(false);
            }
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".navbar")) {
                setMenu(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && navLinks.classList.contains("open")) {
                setMenu(false);
                menuButton.focus();
            }
        });

        onMediaChange(desktop, function (event) {
            if (event.matches) {
                setMenu(false);
            }
        });
    }


    /* =====================================================
       HOME PAGE - TYPING EFFECT
    ===================================================== */

    var typing = document.getElementById("typing");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typing) {
        var message = "Welcome to my World!";

        if (reduceMotion) {
            typing.textContent = message;
        } else {
            var index = 0;

            var typeNext = function () {
                if (index < message.length) {
                    index += 1;
                    typing.textContent = message.slice(0, index);
                    setTimeout(typeNext, 100);
                } else {
                    setTimeout(function () {
                        index = 0;
                        typing.textContent = "";
                        typeNext();
                    }, 1500);
                }
            };

            typeNext();
        }
    }


    /* =====================================================
       GALLERY - only play videos that are on screen
       (about 15 autoplaying videos are heavy on phones)
    ===================================================== */

    var videos = document.querySelectorAll("video[autoplay]");

    if (videos.length) {
        if (reduceMotion) {
            /* no autoplay for people who asked for less motion */
            videos.forEach(function (video) {
                video.removeAttribute("autoplay");
                video.pause();
                video.controls = true;
            });
        } else if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var video = entry.target;

                    if (entry.isIntersecting) {
                        var playing = video.play();
                        if (playing && playing.catch) {
                            playing.catch(function () {});
                        }
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.25 });

            videos.forEach(function (video) {
                observer.observe(video);
            });
        }
    }
})();
