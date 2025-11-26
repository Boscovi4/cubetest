document.addEventListener("DOMContentLoaded", () => {
  const launchButton = document.querySelector(".launch-button");

  launchButton.addEventListener("click", () => {
    // Remove and re-add .active so animation restarts every click
    launchButton.classList.remove("active");
    void launchButton.offsetWidth; // force reflow
    launchButton.classList.add("active");

    // Remove the class after animation finishes
    setTimeout(() => {
      launchButton.classList.remove("active");
    }, 400); // match CSS animation duration
  });
});
