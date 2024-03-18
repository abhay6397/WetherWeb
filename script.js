const KEY = `5ece2a87332817f6d73e5749b77f1848`

const input = document.getElementById('input');
const weather = document.querySelector('.weather-box');

input.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        WeatherData(input.value);
        input.value = '';
    }

})

const WeatherData = async (city) => {
    try {
        let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`)
        let data = await raw.json()
        if (data.cod != 200) {
            const temp = document.querySelector('#temp');
            temp.innerHTML = `${data.message},${data.cod}`;

            const humidity = document.querySelector('#humi');
            humidity.innerHTML = '';
            const img = document.querySelector('img');
            img.src = '';
            img.alt = "";
            const cloud = document.querySelector('#cloud');
            cloud.innerHTML = '';

            const speed = document.querySelector('#wspeed');
            speed.innerHTML = '';

            const location = document.querySelector('#loco');
            location.innerHTML = ''
        } else {
            showData(data)
        }
   
    } catch (error) {
        console.log(error)

    }

}

const showData = (data) => {
    console.log(data)
    const temp = document.querySelector('#temp');
    temp.innerHTML = `${Math.floor(data.main.temp)}°C`;

    const img = document.querySelector('img');
    img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    img.alt = "weather image";
    // console.log(img);

    const humidity = document.querySelector('#humi');
    humidity.innerHTML = `Humidity : ${data.main.humidity}%`;

    const cloud = document.querySelector('#cloud');
    cloud.innerHTML = data.weather[0].main;

    const speed = document.querySelector('#wspeed');
    speed.innerHTML = `Wind Speed : ${Math.floor(data.wind.speed)}km/h`;

    const location = document.querySelector('#loco');
    location.innerHTML = data.name
     
    if(data.main.temp>30){
        const contain = document.querySelector('.container');
        contain.style.backgroundColor = "orange"
    }else if(data.main.temp<30){
        const contain = document.querySelector('.container');
        contain.style.backgroundColor = " cornflowerblue"
    }


}

