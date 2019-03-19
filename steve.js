let news = document.getElementById("news")
let submitBtn = document.getElementById("submitBtn")
let zipInput = document.getElementById("zipInput")
let zippers = 77002

window.onload=loadData(zippers)


submitBtn.addEventListener("click",function(){
    zippers= zipInput.value
    loadData(zippers)
})
    function loadData(zippers){
    let localWeather= `https://api.openweathermap.org/data/2.5/weather?zip=${zippers}&units=imperial&apiKey=5c532f33d76a318783dd01c47721de8e`
    fetch(localWeather)
    .then(response=>response.json())
        .then(weatherItems=>{
        console.log(weatherItems.main)
        console.log(weatherItems)
        let sunset = new Date(weatherItems.sys.sunset*1000)
        let sunrise = new Date(weatherItems.sys.sunrise*1000)
        let windDirection = getDirection(weatherItems.wind.deg)
       //search inside the object in the array
        console.log(weatherItems.weather[0].main)


    
    let weatherBug = `
    <h3> Weather from ${weatherItems.name}:</h3>
    <h4> Current Temperature: ${weatherItems.main.temp} Deg</h4>
    <h4> Wind Speed : ${weatherItems.wind.speed} Mph;    Direction: ${windDirection}</h4>
    <h4> Sunrise: ${sunrise.toLocaleTimeString()} Sunset: ${sunset.toLocaleTimeString()}</h4>
    <image id= "icon" src= http://openweathermap.org/img/w/${weatherItems.weather[0].icon}.png>
   
    `
    weather.innerHTML=weatherBug


        let localNews= `https://gnews.io/api/v2/?q=${weatherItems.name}&token=114071df888d1c4880c2bff07c8ffc33`     
    //let Houston = `https://newsapi.org/v2/everything?sources=nbc-news&q=${json.name}+country=US&sortBy=popularity&apiKey=1a6cdc031db640ff9e62b8e0e7716746`
        fetch(localNews)
        .then(response=>response.json())
    
        .then(function(json){ return json
            
        })
            .then (function(newsItems){
            console.log(newsItems)
            let newsID = newsItems.articles.map(function(news){
                console.log(news)
                if (news.image ==""){
                    
                    return `
                    <li> ${news.title}</li>
                    <a href = ${news.link}>Click to get story</a>
                    
            
                
                          `}
                else {
                return `
                <li> ${news.title}</li>
                <a href = ${news.link}>Click to get story</a>
                <img class="test" src = ${news.image}>
        
            
                      `
                }
            }) 
    
            news.innerHTML=newsID.join("")
    
           
        })









})



}

let weatherunlocked = " https://api.weatherunlocked.com/api/current/Houston?app_id=bd380335&app_key=0e7fb52b9aa056322bb61397d5c1e88a"

function getDirection(angle) {
    let directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
     
}

//console.log(getDirection(0))
//console.log(getDirection(90))
//console.log(getDirection(180))
//console.log(getDirection(270))
//console.log(getDirection(180))
//console.log(getDirection(45))
//console.log(getDirection(135))
//console.log(getDirection(225))
//console.log(getDirection(305))
