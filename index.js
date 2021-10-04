const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("Nothing to search");
    } else {
        beginSearch(searchValue);
    }
})

// Search function
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    displayData(data);
}

// Display Search Result
function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

//event listener in get lyrics button
result.addEventListener('click',event=>{
   const clickedElement=event.target;
   //checking clickedelement
   if(clickedElement.tagName==='SPAN'){
      const artist = clickedElement.getAttribute('data-artist');
       const songTitle = clickedElement.getAttribute('data-songtitle');
       getLyrics(artist, songTitle);
   }
})

//https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime
// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h3>${artist} - ${songTitle}</h3>
    <p>${lyrics}</p>`;
  
  }