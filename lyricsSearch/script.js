const lyricsTitle = document.getElementById("lyrics-title");
const searchBtn = document.getElementById("search-btn");
const body = document.body;
const listLyric = document.createElement("ul");
const lyricPage = document.createElement("div");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "30cd25772amshae9031c57cb602ap11d4c5jsn48b1df926ee6",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

async function searchLyrics() {
  try {
    body.contains(listLyric) && body.removeChild(listLyric);
    body.contains(lyricPage) && body.removeChild(lyricPage);
    startLoading();
    let query = lyricsTitle.value;
    console.log(query);
    const url_searchlyrics = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${query}&per_page=10&page=1`;
    const res = await fetch(url_searchlyrics, options);
    const arraySong = await res.json();
    makeListLyrics(arraySong?.hits);
    console.log(arraySong?.hits);
  } catch (err) {
    console.log(err);
  } finally {
    stopLoading();
  }
}

async function openLyric(id) {
  try {
    body.contains(listLyric) && body.removeChild(listLyric);
    startLoading();
    const res = await fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=" + id,
      options
    );
    const lyric = await res.json();
    const btnBack = document.createElement("button");
    btnBack.classList.add("btn-back");
    btnBack.innerText = "Back";
    btnBack.addEventListener("click", searchLyrics);
    lyricPage.innerHTML = lyric.lyrics?.lyrics?.body?.html;
    lyricPage.classList.add("lyric-page");
    lyricPage.appendChild(btnBack);
    body.appendChild(lyricPage);
  } catch (err) {
    console.log(err);
  } finally {
    stopLoading();
  }
}

const spinnerBox = document.createElement("div");
const spinner = document.createElement("div");
const loader = document.createElement("p");
spinnerBox.classList.add("spinner-box");
spinner.classList.add("spinner");
loader.classList.add("loader");
loader.innerText = "Loading...";
spinnerBox.appendChild(spinner);
spinnerBox.appendChild(loader);

function startLoading() {
  body.appendChild(spinnerBox);
}

function stopLoading() {
  body.removeChild(spinnerBox);
}

function makeListLyrics(arr) {
  listLyric.innerHTML = "";
  if (!arr) {
    const emptyList = document.createElement("h3");
    emptyList.innerText = "Not Found Music";
    emptyList.classList.add("empty-box");
    body.appendChild(emptyList);
  } else {
    arr?.forEach((item, index) => {
      listLyric.classList.add("list-lyric");
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const musicTitle = document.createElement("span");
      musicTitle.classList.add("music-title");
      musicTitle.innerText = item.result?.title;
      const viewBtn = document.createElement("button");
      viewBtn.classList.add("view-btn");
      viewBtn.innerText = "open lyric";
      viewBtn.addEventListener("click", () => openLyric(item.result?.id));
      listItem.appendChild(musicTitle);
      listItem.appendChild(viewBtn);
      listLyric.appendChild(listItem);
    });
    body.appendChild(listLyric);
  }
}

searchBtn.addEventListener("click", searchLyrics);
