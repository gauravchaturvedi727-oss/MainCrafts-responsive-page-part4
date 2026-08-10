
const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "") {
            alert("Please enter your name.");
            return;
        }

        if (email === "") {
            alert("Please enter your email.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email.");
            return;
        }

        if (message === "") {
            alert("Please enter your message.");
            return;
        }


        let submissions =
            JSON.parse(localStorage.getItem("contacts")) || [];

        submissions.push({
        name,
        email,
        message,
        date: new Date().toLocaleString()
    });

        localStorage.setItem(
            "contacts",
            JSON.stringify(submissions)
        );

        alert("Form Submitted Successfully!");

        form.reset();

        window.location.href = "submission.html";

    });

}



const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

}


const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 20px rgba(0,0,0,.12)";

    } else {

        header.style.boxShadow =
            "0 2px 10px rgba(0,0,0,.08)";

    }

});


const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transform =
            "translateY(-4px) scale(1.03)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translateY(0px) scale(1)";

    });

});