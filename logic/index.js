const items = document.querySelectorAll(".item");
const navH1 = document.querySelector("nav h1");

const onProfileSelect = (item) => {
  const color = item.getAttribute("data-color");
  const textColor = item.getAttribute("data-text-color");
  document.documentElement.style.setProperty("--body-bg", `var(${color})`);
  document.getElementById("Greetings").style.color = `var(${textColor})`;
  document.getElementById("Code31").style.color = `var(${textColor})`;
  document.documentElement.style.setProperty(
    "--greetings-text-color",
    `var(${textColor})`,
  );
  document.documentElement.style.setProperty(
    "--code31-text-color",
    `var(${textColor})`,
  );
  navH1.style.color = `var(${textColor})`;
};

const onProfileUnSelect = () => {
  document.documentElement.style.setProperty("--body-bg", "#f5f5f5");
  document.getElementById("Greetings").style.color = "";
  document.getElementById("Code31").style.color = "";
  document.documentElement.style.removeProperty("--greetings-text-color");
  document.documentElement.style.removeProperty("--code31-text-color");
  navH1.style.color = "var(--body-text)";
  
};
document.addEventListener("DOMContentLoaded", function () {
  items.forEach((item) => {
    item.setAttribute("active", "false");

    item.addEventListener("click", (event) => {
      const descriptionElement = item.querySelector(".description");
      let itemsList = Array.from(items);
      if (event.target.getAttribute("active") == "false") {
        // click to other profile while the previous one is already actived
        let someActived = itemsList.some(
          (i) => i.getAttribute("active") == "true",
        );
        if (someActived) {
          items.forEach((x) => {
            if (x.className != item.className) {
              x.setAttribute("active", "false");
              x.style.filter = "grayscale(100%)";
              const otherProfileDescription = x.querySelector(".description");
              otherProfileDescription.style.display = "none";
            }
          });
        }
        // get children where it's has class name .description
        event.target.setAttribute("active", "true");
        onProfileSelect(item);
        item.style.filter = "grayscale(0%)";
        descriptionElement.style.display = "block";
      } else {
        descriptionElement.style.display = "none";
        item.style.filter = "grayscale(100%)";

        event.target.setAttribute("active", "false");
        onProfileUnSelect();
      }

      // set grayscale for every
    });
  });
});
