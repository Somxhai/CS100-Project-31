const greeting = document.getElementById("Greetings");

greeting.addEventListener("mouseover", () => {
  document.body.style.backgroundColor = "red";
});
greeting.addEventListener("mouseout", () => {
  document.body.style.backgroundColor = "white";
});
