import {renderSongs} from "./ui.js";


const url =
    "https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR";
const options = {
    method: "GET",
    headers: {
        'X-RapidAPI-Key': '79d45e0097mshf79306e1e784a75p1035b1jsn4b953de36774',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    },
};

//* API isteklerini yönettiğimiz class yapısı
export class API {
    constructor() {
        this.songs = [];
    }


    //* Popüler müzikleri getirir
    async getPopular() {
        const res = await fetch(url, options);
        const data = await res.json();
        //* API'den aldığımız şarkıları song dizisine aktartdık
        this.songs = data.tracks;
        //* Ekrana popüler müzikleri aktaracak fonksiyona songs dizisini parametre olarak gönderdik
        renderSongs(this.songs);
    }


    //* Arama methodu
    async searchMusic(query) {
        const res = await fetch(
            `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
            options
        );
        const data = await res.json();

        // Veriyi istediğimiz hale çevirme
        // song.track yerine song'a erişme
        let newData = data.tracks.hits;

        newData = newData.map((song) => ({ ...song.track }));
        this.songs = newData;

        // aratılan şarkıları ekrana basma
        renderSongs(this.songs);
    }
}