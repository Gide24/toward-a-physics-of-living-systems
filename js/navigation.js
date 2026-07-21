document.addEventListener("DOMContentLoaded", () => {
  const navPlaceholder = document.getElementById("nav-placeholder");
  if (!navPlaceholder) return;

  const path = window.location.pathname;

  const isFrench = path.includes("/fr/");
  const isEnglish = path.includes("/en/");

  let currentLang = "";
  let otherLang = "";
  let navPath = "";

  if (isFrench) {
    currentLang = "fr";
    otherLang = "en";
    navPath = getPrefix(path, "fr") + "nav.html";
  }

  if (isEnglish) {
    currentLang = "en";
    otherLang = "fr";
    navPath = getPrefix(path, "en") + "nav.html";
  }

  fetch(navPath)
    .then(response => response.text())
    .then(data => {
      navPlaceholder.innerHTML = data;
      setupNav(path, currentLang, otherLang);
    });
});

function getPrefix(path, lang) {
  const afterLang = path.split("/" + lang + "/")[1];
  const depth = afterLang.split("/").length - 1;

  let prefix = "";
  for (let i = 0; i < depth; i++) {
    prefix += "../";
  }

  return prefix;
}

function setupNav(path, currentLang, otherLang) {
  const prefix = getPrefix(path, currentLang);

  const langLink = document.getElementById("lang-link");
  const homeLink = document.getElementById("home-link");
  const biblioLink = document.getElementById("biblio-link");
  const attachlink = document.getElementById("attach-link")
  const foundationsLink = document.getElementById("foundations-link");

  if (langLink) {
    langLink.href = path.replace("/" + currentLang + "/", "/" + otherLang + "/");
    langLink.textContent = currentLang === "fr" ? "English" : "Français";
  }

  if (homeLink) {
    homeLink.href = prefix + "index.html";
  }

  if (biblioLink) {
    biblioLink.href = prefix + "bibliography.html";
  }

  if (attachlink) {
    attachlink.href = prefix + "attachment.html";
  }

  if (foundationsLink) {
  foundationsLink.href = prefix + "foundations.html";
}

}