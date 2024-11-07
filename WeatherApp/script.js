console.log("Hello World");

const apiKey = 'b2e25531887c4bae94755203240611';
let inputChk = document.getElementById('input-value');
let icon = document.querySelector(".search i");
let temElement = document.querySelector(".tem");
let cityElement = document.querySelector(".cityname");
let humElement = document.querySelector(".humidity");
let windElement = document.querySelector(".wind");

temElement.hidden = true;
humElement.hidden = true;
windElement.hidden = true;
cityElement.innerHTML="Loading Data..."
icon.addEventListener('click', () => {

    const city = inputChk.value
    const f = async () => {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        let res = await fetch(apiUrl);
       // console.log(res);
        //return;
        
        if (res.status > 399) {
            cityElement.innerHTML = "Invalid City Name";
            temElement.hidden = true;
            humElement.hidden = true;
            windElement.hidden = true;
        }
        else {

            let data = await res.json();
           // console.log(data);
            
            let name = data.location.name;
            let curr = data.current;

            let tem = curr.temp_c;
            let wind = curr.wind_kph;
            let hum = curr.humidity;

            temElement.innerHTML = `${tem} °C`;
            cityElement.innerHTML = `City : ${name}`
            humElement.innerHTML = `<b>${hum} %<b>`;
            windElement.innerHTML = `<b>${wind} km/h<b>`;
            temElement.hidden = false;
            humElement.hidden = false;
            windElement.hidden = false;
        }

    };

    f();
});
