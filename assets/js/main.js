let finalResult = "";
function matchClothesWithWeather(temp){
    if (temp < 25){
        return ("a thick jacket");
    }
    else if (temp >= 25 && temp <= 44){
        return ("a jacket");
    }
    else if (temp >= 45 && temp <= 64){
        return ("a fleece");
    }
    else if (temp >= 65 && temp <= 79){
        return ("short sleeves");
    }
    // else if (temp >= 80){
    else{
        return ("shorts and sandals");
    }
}

function kalToFahr(temp){
    let celsius = temp - 273;
    return (Math.floor(celsius * (9/5) + 32));
}
  

// from https://www.washingtonpost.com/weather/2018/10/30/weather-is-what-you-wear-unpacking-clothing-connected-different-climate-conditions-united-states/

document.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;

    if (key === 'Enter' || key === 'Ent' || key === 13) {
        matchClothes();
    }
});

function matchClothes (){
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
        
            if (navigator.geolocation) {
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
        
                let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=6abdc02a8c5609bade1268cceec08c45";
                // console.log(url);
                fetch(url, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        var jsonObj = JSON.parse(result);
                        // console.log(jsonObj);
                        // let weatherDescription = jsonObj["weather"][0]["description"];
                        let temp = kalToFahr(jsonObj["main"]["temp"]);
                        let locationName = jsonObj["name"];
                        finalResult = "it\'s " + temp + " in " + locationName + ". you should be wearing " + matchClothesWithWeather(temp) + ".";
                        console.log(finalResult);
                        typeWriter(finalResult);
                        // weahterIcon.src = "https://openweathermap.org/img/wn/" + jsonObj["weather"][0]["icon"] + "@2x.png";
        
                    })
                    .catch(error => {
                        console.log('error', error)
                    });
        
            }
        });
        
        
        var i = 0;
        var speed = 60;
        
        function typeWriter() {
        if (i < finalResult.length) {
            document.getElementById("result").innerHTML += finalResult.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        }
        var cursor = true;
        setInterval(() => {
          if(cursor) {
            document.getElementById('cursor').style.opacity = 0;
            cursor = false;
          }else {
            document.getElementById('cursor').style.opacity = 1;
            cursor = true;
          }
        }, speed);

    }



