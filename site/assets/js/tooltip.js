function isTouchDevice() {
  return (("ontouchstart" in window)
    || (navigator.maxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}

if (!isTouchDevice()) {
  const popover = document.querySelectorAll("[data-has-tooltip]");

  let mouseX = document.clientX;
  let mouseY = document.clientY;
  document.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  popover.forEach((e) => {
    const target = document.querySelector("#" + e.getAttribute("id") + "-content");
    e.addEventListener("mouseover", () => {
      target.style.top = `${mouseY + 6}px`;
      target.style.left = `${mouseX + target.clientWidth / 2 + 16}px`;
      target.style.visibility = "visible";
    });

    e.addEventListener("mouseout", () => {
      target.style.visibility = "hidden";
    });

    e.addEventListener("mousemove", () => {
      target.style.top = `${mouseY + 6}px`;
      target.style.left = `${mouseX + target.clientWidth / 2 + 16}px`;
    });
  });
}
