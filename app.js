window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}https://api.darksky.net/forecast/c48561e642e430bdaa676adbd2ace2e7/${lat},${long}`;
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                //Set DOM Elements from the API
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Set Icon
                setIcons(icon, document.querySelector('.icon'));
            });
        });
    }

        function setIcons(icon, iconId){
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconId, Skycons[currentIcon]);
        }
});