let api_key = "AIzaSyB45hsMdyfVLGnLAXcHhjj_cjWBF1vHBhw";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";

let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
let searchLink = "https://www.youtube.com/results?search_query=";



// We need youtube api route to fetch videos in youtube
// fetchmethod is used to fetch data from youtube.
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));
// You can see we are fetching data from the "video_http" that we got from youtube api
// to add parameters to the URL we are using new URLSearchParama(object)
// part param define what art of data we want in this case we want all video related data.
// So, we pass snippet.
// After fetching the data we are converting it to JSON by res.json().

// // All the data we want is in item's array.
// So after getting JSON data from res.json() loop through the data.items 
// using forEach() method and pass that item into a function called getChannelIcon(item).


const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

// Here we are getting individual video's data because we called this is a loop,
// And after getting individual video's data I AM making request to youtube api for channel information. 
// After getting thricons chanell then,  I are calling another 
// function makeVideoCard(data).

// Now,  I create Video card. 
// But before creating this function  I have to select our Video Container element from HTML.

const videoCardContainer = document.querySelector('.video-container');

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})