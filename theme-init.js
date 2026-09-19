/* theme-init.js
   Load this in the <head> of every page WITHOUT defer.
   It applies the saved theme (or the visitor's OS setting) before the
   page is painted, so dark-mode visitors never see a light flash. */
(function () {
    try {
        var saved = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (saved === "dark" || (!saved && prefersDark)) {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    } catch (e) {
        /* storage blocked: fall back to the light theme */
    }
})();
