const head = document.getElementById("header");
const para = document.getElementById("paragraph");
const modeBtn = document.getElementById("btn-mode");
const linkBtn = document.getElementById("btn-link");
const docStyle = document.documentElement.style;

let isDark = false;

const linkGithub = "https://github.com/Ohm0025/js_project";

function startLoading() {
  const spinner = document.createElement("div");
  const spinBox = document.createElement("div");

  spinner.classList.add("spinner");
  spinBox.classList.add("spin-box");

  spinBox.appendChild(spinner);
  document.body.appendChild(spinBox);
}

linkBtn.addEventListener("click", () => {
  startLoading();
  window.location.href = linkGithub;
});

function init() {
  head.innerText = isDark ? "Dark Mode" : "Light Mode";
  modeBtn.innerText = !isDark ? "Dark Mode" : "Light Mode";
}

function changeMode() {
  isDark = !isDark;
  if (isDark) {
    docStyle.setProperty("--text-color", "white");
    docStyle.setProperty("--bg-color", "gray");
    docStyle.setProperty("--btn-color", "orange");
  } else {
    docStyle.setProperty("--text-color", "black");
    docStyle.setProperty("--bg-color", "whitesmoke");
    docStyle.setProperty("--btn-color", "rgb(223,183,109)");
  }
  init();
}

modeBtn.addEventListener("click", changeMode);

init();
