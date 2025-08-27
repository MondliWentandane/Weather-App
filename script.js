//=== Here I am getting the weather by the users preffered location 
 const apiKey = "473b77d656249c2740cdfd1a021d2e96";
async function getWeather(){
    const city = document.getElementById("city").value;
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        if(response.status === 200){
             //=== The name of the City
            document.getElementById('cityNm').innerHTML= `${data.name}`;
            //===== Below I am creating elements that will display the data on first Box
            //=== Check if it's night
            const now = Date.now() / 1000;
            const isNight = now < data.sys.sunrise || now > data.sys.sunset;

            //===== Main weather image (moon if night, else normal)
            document.getElementById('BigImage').innerHTML=
                isNight 
                ? `<img src="media/night.png" alt="moon Image">` 
                : `<img src="${getImage(data.weather[0].main)}" alt="weather Image">`; 
                document.getElementById('conditionT').innerHTML=`
                
                <div id="descr"><div id="temp">${data.main.temp}</div>${data.weather[0].main}<br>
                <strong>${data.weather[0].description}</strong><br>
                ${descDay(data.weather[0].main)}</div><br>`;
                //== Here I am displaying date and time
                document.getElementById('dateTime').innerHTML= getCurrentDateTime();
                //== Now I am working on the  other conditions of the day

                document.getElementById('feelsLike').innerHTML=
                `<img src="media/moreDet/feels_like.png" alt="weather Image">
                 <strong>Feels like: ${data.main.feels_like}</strong>`;
                document.getElementById('description').innerHTML=
                `<img src="media/moreDet/description.png" alt="weather Image">
                Description: <strong>${data.weather[0].description}</strong>`;
                document.getElementById('maxTemp').innerHTML=
                `<img src="media/moreDet/max_temp.png" alt="weather Image">
                Max Temp: <strong>${data.main.temp_max}</strong>`;
                document.getElementById('humidity').innerHTML=
                `<img src="media/moreDet/humidity.png" alt="weather Image">
                <strong>${data.main.humidity}</strong>`;
                document.getElementById('seaLevel').innerHTML=
                `<img src="media/moreDet/sea_level.png" alt="weather Image">
                Sea Level: <strong>${data.main.sea_level}</strong>`;
                document.getElementById('wind').innerHTML=
                `<img src="${getImage(data.weather[0].main)}" alt="weather Image">
                 Wind: <strong>Speed: ${data.wind.speed}</strong>`;

                 //==== Now I am working on the right side displayes ===
                 document.getElementById('det').innerHTML=
                 `${getSuggestionClothe(data.weather[0].main)}`;
                 //=== Here is for the other cities
                  getWeatherForOther();
                  getThreeDayForecast(data.coord.lat,data.coord.lon);
                  
             
        }else{
            alert("Sorry Undefied city name");
        }


    } catch(err){
        console.log("Error fetching waaether:", err);
    }
}

//===== Below I am getting the weather by the browsers location (users Location)====
function getWeatherByLocation(){
    if(!navigator.geolocation){
        document.getElementById("result").innerText = 
        "Geolocation is not supported by your browser";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if(response.status === 200){
             //=== The name of the City
            document.getElementById('cityNm').innerHTML= `${data.name}`;
            //===== Below I am creating elements that will display the data on first Box
            //=== Check if it's night
            const now = Date.now() / 1000;
            const isNight = now < data.sys.sunrise || now > data.sys.sunset;

            //===== Main weather image (moon if night, else normal)
            document.getElementById('BigImage').innerHTML=
                isNight 
                ? `<img src="media/night.png" alt="moon Image">` 
                : `<img src="${getImage(data.weather[0].main)}" alt="weather Image">`; 
                document.getElementById('conditionT').innerHTML=`
                
                <div id="descr"><div id="temp">${data.main.temp}</div>${data.weather[0].main}<br>
                <strong>${data.weather[0].description}</strong><br>
                ${descDay(data.weather[0].main)}</div><br>`;
                //== Here I am displaying date and time
                document.getElementById('dateTime').innerHTML= getCurrentDateTime();
                //== Now I am working on the  other conditions of the day

                document.getElementById('feelsLike').innerHTML=
                `<img src="media/moreDet/feels_like.png" alt="weather Image">
                 <strong>Feels like: ${data.main.feels_like}</strong>`;
                document.getElementById('description').innerHTML=
                `<img src="media/moreDet/description.png" alt="weather Image">
                Description: <strong>${data.weather[0].description}</strong>`;
                document.getElementById('maxTemp').innerHTML=
                `<img src="media/moreDet/max_temp.png" alt="weather Image">
                Max Temp: <strong>${data.main.temp_max}</strong>`;
                document.getElementById('humidity').innerHTML=
                `<img src="media/moreDet/humidity.png" alt="weather Image">
                Humidity: <strong>${data.main.humidity}</strong>`;
                document.getElementById('seaLevel').innerHTML=
                `<img src="media/moreDet/sea_level.png" alt="weather Image">
                Sea Level: <strong>${data.main.sea_level}</strong>`;
                document.getElementById('wind').innerHTML=
                `<img src="media/moreDet/wind_speed.png" alt="weather Image">
                 Wind: <strong>Speed: ${data.wind.speed}</strong>`;

                 //==== Now I am working on the right side displayes ===
                 document.getElementById('det').innerHTML=
                 `${getSuggestionClothe(data.weather[0].main)}`;

                 getThreeDayForecast(lat,lon);


            }else{
                alert(`Sorry Undefined city name`);
            }
        } catch (error){
            console.log(`Error Fetching weather...`)
        }

    })
}
//==== Below is the function that displays the weather in other suggested cities ====
async function getWeatherForOther(){
    let cities = ["Johannesburg","Bogota","Tokyo"];
    for (let x = 0; x < cities.length; x++) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cities[x]}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(response.status === 200){
                const now = Date.now() / 1000;
                const isNight = now < data.sys.sunrise || now > data.sys.sunset;
                const img = isNight ? "media/night.png" : getImage(data.weather[0].main);

                document.getElementById(`city${x}`).innerHTML=
                    `<strong>${data.name}<br>${data.main.temp}</strong>
                    <span><img src="${img}" alt="otherCitySug"> ${descDay(data.weather[0].main)}</span>`;
            
             
        }else{
            alert("Sorry Undefied city name");
        }


    } catch(err){
        console.log("Error fetching waaether:", err);
    }
        
    }   

}
//==== Weather for other days  ======
const apiKey2 = "YOUR_API_KEY_HERE"; // replace with your OpenWeather API key

async function getWeatherForNextDays(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey2}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert("Sorry, city not found");
            return;
        }

        const data = await response.json();

        // Filter forecasts around 12:00 each day
        let dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        // Take only next 3 days (skip today)
        for (let i = 0; i < 3; i++) {
            const day = dailyData[i];
            const dayDiv = document.getElementById(`day${i + 2}`);
            if (dayDiv) {
                dayDiv.innerHTML = `
                    <strong>Day ${i + 2}</strong><br>
                    Temp: ${day.main.temp}°C<br>
                    Weather: ${day.weather[0].description}
                `;
            }
        }

    } catch (err) {
        console.log("Error fetching forecast:", err);
    }
}

async function getThreeDayForecast(lat, lon) {
    const apiKey = "2a06182ec57b0915b19dc29187556666";
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.list) {
            console.warn("No forecast data available");
            return;
        }

        // Group by date (YYYY-MM-DD)
        const dailyMap = {};
        data.list.forEach(entry => {
            const date = new Date(entry.dt * 1000);
            const dayKey = date.toISOString().split("T")[0];
            
            if (!dailyMap[dayKey]) {
                dailyMap[dayKey] = {
                    dt: entry.dt,
                    temps: [],
                    weatherIcons: []
                };
            }
            dailyMap[dayKey].temps.push(entry.main.temp);
            dailyMap[dayKey].weatherIcons.push(entry.weather[0].icon);
        });

        // Convert grouped data into an array
        const dailyData = Object.values(dailyMap).map(day => ({
            dt: day.dt,
            temp: {
                min: Math.min(...day.temps),
                max: Math.max(...day.temps)
            },
            weather: [
                { icon: mostCommon(day.weatherIcons) }
            ]
        }));

        // Only next 3 days (skip today)
        const next3Days = dailyData.slice(1, 4);

        // Display in your divs
        next3Days.forEach((day, index) => {
            const dayDiv = document.getElementById(`day${index + 2}`);
            if (dayDiv) {
                const date = new Date(day.dt * 1000).toDateString();
                dayDiv.innerHTML = `
                    <strong>${date}</strong><br>
                    Min: ${day.temp.min.toFixed(1)}°C<br>
                    Max: ${day.temp.max.toFixed(1)}°C<br>
                `;
            }
        });

    } catch (err) {
        console.error("Error fetching forecast:", err);
    }
}

// Helper: most common element
function mostCommon(arr) {
    return arr.sort((a,b) =>
        arr.filter(v => v===a).length - arr.filter(v => v===b).length
    ).pop();
}



 getWeatherByLocation(); 
 getWeatherForOther();

 function getImage(status){
    if(status === 'Clouds'){
        return `media/CLOUD.png`;
    }else if(status === 'Clear'){
        return `media/SUN-removebg.png`;
    }else if(status === 'Rain'){
        return `media/RAIN.png`;
    }else if(status === 'Snow'){
        return `media/SNOW.png`;
    }else if(status === 'Drizzle'){
        return `media/sun-clouds-rain.png`;
    }else if(status === 'Thunderstorm'){
        return `media/THUNDERSTORM.png`;
    }else{
        return 'media/SUN-removebg.png';
    }
 }
 function descDay(status){
    if(status === 'Clouds'){
        return "The skies will be mostly cloudy today.";
    }else if(status === 'Clear'){
        return "There will mostly be sunny and clear skies.";
    }else if(status === 'Rain'){
        return "Expect periods of rain throughout the day.";
    }else if(status === 'Snow'){
        return "Snowfall is expected, with cold conditions.";
    }else if(status === 'Drizzle'){
        return "Light rain and drizzle can be expected.";
    }else if(status === 'Thunderstorm'){
        return "Thunderstorms are likely with heavy rain and lightning.";
    }else if(status === 'Atmosphere'){
        return "Conditions may be foggy, misty, or hazy.";
    }else{
        return 'hh';
    }
}

function getSuggestionClothe(status){
    if(status === 'Clouds'){
        return `<img src="media/moreCloth/light_jacket.png" alt="suggestionClothe"><br>It's cloudy outside. Wear something light, but keep a jacket handy just in case.`;
    }else if(status === 'Clear'){
        return `<img src="media/moreCloth/short.png" alt="suggestionClothe"><br>The sky is clear. Perfect weather for light clothes and maybe sunglasses.`;
    }else if(status === 'Rain'){
        return `<img src="media/moreCloth/rain_days.png" alt="suggestionClothe"><br>It's raining. Carry an umbrella or wear a waterproof jacket.`;
    }else if(status === 'Snow'){
        return `<img src="media/moreCloth/snow.png" alt="suggestionClothe"><br>Snowy weather! Wear warm layers, a thick coat, gloves, and a hat.`;
    }else if(status === 'Drizzle'){
        return `<img src="media/moreCloth/for_Drizzle.png" alt="suggestionClothe"><br>Light drizzle outside. A hoodie or light raincoat should be fine.`;
    }else if(status === 'Thunderstorm'){
        return `<img src="media/moreCloth/for_Thunder.png" alt="suggestionClothe"><br>Thunderstorm warning! Best to wear waterproof clothes and avoid staying outside too long.`;
    }else{
        return `<img src="media/moreCloth/rain_days.png" alt="suggestionClothe"><br>Weather conditions are unusual. Dress comfortably and be prepared.`;
    }
}

function getCurrentDateTime() {
    const now = new Date();

    // Get parts of the date
    const day = now.getDate(); // 20
    const weekday = now.toLocaleString('en-US', { weekday: 'long' }); // Tuesday
    const year = now.getFullYear(); // 2025

    // Get time in HH:mm format
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day} ${weekday} ${year} <br> ${hours}:${minutes}`;
}

// function setThemeByTime() {
//     const hour = new Date().getHours();
//     const body = document.body;
//     if (hour >= 6 && hour < 18) {
//         body.classList.remove('dark-mode');
//         body.classList.add('light-mode');
//     } else {
//         body.classList.remove('light-mode');
//         body.classList.add('dark-mode');
//     }
// }

// // Call on page load
// setThemeByTime();

// Optional: update theme every hour
setInterval(setThemeByTime, 60 * 60 * 1000);