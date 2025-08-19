


//=== Here I am getting the weather by the users preffered location 
 const apiKey = "473b77d656249c2740cdfd1a021d2e96";
async function getWeather(){
    const city = document.getElementById("city").value;
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        if(response.status === 200){
            console.log(data)
            document.getElementById("result").innerText= `${data.coord.lat}`;
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
                document.getElementById("result").innerText= `Location: ${data.name} and it is: ${data.main.temp}`;
            
            }else{
                alert(`Sorry Undefined city name`);
            }
        } catch (error){
            console.log(`Error Fetching weather...`)
        }

    })
}

 getWeatherByLocation();
