/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function getWeather(cityCode){
    myAxios({
        url:'http://hmajax.itheima.net/api/weather',
        method:'GET',
        params:{
            city:cityCode
        }
    }).then(res => {
        // console.log(res);
        const weatherData = res.data
        console.log(weatherData);
        const title = ` <span class="dateShort">${weatherData.dateShort}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${weatherData.dateLunar}</span>
        </span>`
        document.querySelector('.title').innerHTML = title

        const location = `<img src="${weatherData.weatherImg}" alt="">
        <span class="area">${weatherData.area}</span>`
        document.querySelector('.location').innerHTML = location

        const weatherBox = ` <div class="tem-box">
        <span class="temp">
          <span class="temperature">${weatherData.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${weatherData.psPm25}</span>
          <span class="psPm25Level">${weatherData.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${weatherData.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${weatherData.weather}</span>
          </li>
          <li class="windDirection">${weatherData.windDirection}</li>
          <li class="windPower">${weatherData.windPower}</li>
        </ul>`
        document.querySelector('.weather-box').innerHTML = weatherBox

       const todayWeather = `<div class="range-box">
       <span>今天：</span>
       <span class="range">
         <span class="weather">${weatherData.todayWeather.weather}</span>
         <span class="temNight">${weatherData.todayWeather.temNight}</span>
         <span>-</span>
         <span class="temDay">${weatherData.todayWeather.temDay}</span>
         <span>℃</span>
       </span>
     </div>
     <ul class="sun-list">
       <li>
         <span>紫外线</span>
         <span class="ultraviolet">${weatherData.todayWeather.ultraviolet}</span>
       </li>
       <li>
         <span>湿度</span>
         <span class="humidity">${weatherData.todayWeather.humidity}</span>%
       </li>
       <li>
         <span>日出</span>
         <span class="sunriseTime">${weatherData.todayWeather.sunriseTime}</span>
       </li>
       <li>
         <span>日落</span>
         <span class="sunsetTime">${weatherData.todayWeather.sunsetTime}</span>
       </li>
     </ul>`
     document.querySelector('.today-weather').innerHTML = todayWeather

     const dayForecast = weatherData.dayForecast.map(item => {
        return `<li class="item">
        <div class="date-box">
          <span class="dateFormat">${item.dateFormat}</span>
          <span class="date">${item.date}</span>
        </div>
        <img src="${item.weatherImg}" alt="" class="weatherImg">
        <span class="weather">${item.weather}</span>
        <div class="temp">
          <span class="temNight">${item.temNight}</span>-
          <span class="temDay">${item.temDay}</span>
          <span>℃</span>
        </div>
        <div class="wind">
          <span class="windDirection">${item.windDirection}</span>
          <span class="windPower">${item.windPower}</span>
        </div>
      </li>`
     })
     document.querySelector('.week-wrap').innerHTML = dayForecast
    })
}
getWeather(localStorage.getItem('cityCode') || '110100')

document.querySelector('.search-city').addEventListener('input',(e)=>{
    myAxios({
        url:'http://hmajax.itheima.net/api/weather/city',
        method:'GET',
        params:{
            city:e.target.value
        }
    }).then((res)=>{
       const cityList = res.data.map(item =>{
            return `<li class="city-item" data-code='${item.code}'>${item.name}</li>`
        }).join('')
        document.querySelector('.search-list').innerHTML = cityList
    })
})

document.querySelector('.search-list').addEventListener('click',(e)=>{
    if(e.target.classList.contains('city-item')){
       const cityCode = e.target.dataset.code
    //    console.log(cityCode);
       getWeather(cityCode)
       localStorage.setItem('cityCode',cityCode)
    }
})