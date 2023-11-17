const accessKey = "i73Hr6UTN_crKq1YLvPI4xymMDwpLPB7mkCo5rA2sjs";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResult.innerHTML = ""; // Clear existing results when starting a new search
    }

    results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.cover_photo.urls.small;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++; // Increment the page number to load more results
  searchImages();
});
