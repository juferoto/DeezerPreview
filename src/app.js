let ap = null;
const storage = window.sessionStorage;
let songs = [];

function start() {
    ap = new AudioPlayer({
        gui: {
            totalTime: { value: "0:00", DOMElement: document.querySelector(".totalTime") },
            currentTime: { value: "0:00", DOMElement: document.querySelector(".currentTime") },
            progressBar: { value: "0:00", DOMElement: document.querySelector(".progressBar") },
            artistName: { value: "Loading...", DOMElement: document.querySelector(".artistName") },
            songName: { value: "Loading...", DOMElement: document.querySelector(".songName") },
            albumCover: { value: "../assets/placeholder.png", DOMElement: document.querySelector("#player") },
        },
        buttons: {
            playPause: document.querySelector(".play"),
            volume: document.querySelector(".volume"),
            close: document.querySelector(".add"),
            back: document.querySelector(".previous"),
            next: document.querySelector(".next")
        }
    });

    //Fetch al API
    var headers = new Headers();
    headers.append("X-RapidAPI-Host", "deezerdevs-deezer.p.rapidapi.com");
    headers.append("X-RapidAPI-Key", "3002dfd2ecmsh1f34c7151fbd1a3p18e3ecjsna3f85cea2136");

    var opciones = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${storage.getItem("artist")}`, opciones)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            const data = json.data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                var { title_short: name, artist, album, preview: file } = data[i]
                songs.push( new Song(name,artist.name,album.cover_big,file) );
            }
            let player = document.querySelector("#player");
            player.classList.remove("placeholder");
            ap.loadSong();
        })

}