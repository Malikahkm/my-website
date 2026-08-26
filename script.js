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
p.class='box'
