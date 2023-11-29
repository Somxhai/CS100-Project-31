document.addEventListener("DOMContentLoaded", function () {
    const greeting = document.getElementById("Greetings"); 
    greeting.addEventListener("mouseover", () => {
        document.body.style.backgroundColor = "#000000";
    });
    greeting.addEventListener("mouseout", () => {
        document.body.style.backgroundColor = "#f5f5f5";
    });
});



