<template>
  <div class="weather-wrapper">
    <h1><span>V</span>EATHER</h1>
    <form id="weather-form" v-on:submit="submitHandler">
      <span>City not found</span>
      <input v-on:input="inputHandler" type="text" name="cityInput">
      <input type="submit" value="">

      <ul id="weather-form-prompts">
        <li v-for="city in cities" :key="city.id" v-on:click="promptsHandler">
          {{ city }}
        </li>
      </ul>

    </form>

    <div class="main-weather" v-if="weather != {}">
      <div>
          <p>Temp: {{this.weather.temp}}C°</p>
          <p>Feels like: {{this.weather.realFeel}}C°</p>
          <p>Humidity: {{this.weather.humidity}}%</p>
          <p>Wind: {{this.weather.windSpeed}}m/s {{this.weather.windDirection}}</p>
      </div>
      <div>
        <img :src="this.weather.icon" alt="">
        <p>{{this.weather.main}}</p>
      </div>
    </div>

    <div class="vue-slick-wrapper" v-if="weatherToday.length != 0" >
      <h2>Today</h2>
      <VueSlickCarousel class="vue-slick today" v-bind="slickConfig">
        <template #prevArrow="arrowOption">
          <div class="custom-arrow">
            {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
          </div>
        </template>
        <div class="weather-thumbs" v-bind:class="checkActive(item)" v-on:click="addActive(item)" v-for="item in weatherToday" :key="item.id">
          <h3>{{item.time}}</h3>
          <div class="weather-thumbs-icon">
            <p>{{item.main}}</p>
            <img :src="item.icon" alt="">
          </div>
          <p>Temp: {{item.temp}}C°</p>
          <p>Feels like: {{item.realFeel}}C°</p>
          <p>Humidity: {{item.humidity}}%</p>
          <p>Wind: {{item.windSpeed}}m/s {{item.windDirection}}</p>
        </div>
        <template #nextArrow="arrowOption">
          <div class="custom-arrow">
            {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
          </div>
        </template>
      </VueSlickCarousel>
    </div>
    
    <div class="vue-slick-wrapper" v-if="weatherTomorrow.length != 0">
      <h2>Tomorrow</h2>
      <VueSlickCarousel class="vue-slick tomorrow" v-bind="slickConfig">
        <template #prevArrow="arrowOption">
          <div class="custom-arrow">
            {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
          </div>
        </template>
        <div class="weather-thumbs" v-bind:class="checkActive(item)" v-on:click="addActive(item)" v-for="item in weatherTomorrow" :key="item.id">
          <h3>{{item.time}}</h3>
          <div class="weather-thumbs-icon">
            <p>{{item.main}}</p>
            <img :src="item.icon" alt="">
          </div>
          <p>Temp: {{item.temp}}C°</p>
          <p>Feels like: {{item.realFeel}}C°</p>
          <p>Humidity: {{item.humidity}}%</p>
          <p>Wind: {{item.windSpeed}}m/s {{item.windDirection}}</p>
        </div>
        <template #nextArrow="arrowOption">
          <div class="custom-arrow">
            {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
          </div>
        </template>
      </VueSlickCarousel>
    </div>
    
    <div class="vue-slick-wrapper" v-if="weatherAfterTomorrow.length != 0">
      <h2>
        {{new Intl.DateTimeFormat('en', { month: 'long' }).format(weatherAfterTomorrow[0].date)}}
        {{new Date(weatherAfterTomorrow[0].date).getDate()}}, 
        {{weatherAfterTomorrow[0].day}}
      </h2>
      <VueSlickCarousel class="vue-slick afterTomorrow" v-bind="slickConfig">
        <template #prevArrow="arrowOption">
          <div class="custom-arrow">
            {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
          </div>
        </template>
        <div class="weather-thumbs" v-bind:class="checkActive(item)" v-on:click="addActive(item)" v-for="item in weatherAfterTomorrow" :key="item.id">
          <h3>{{item.time}}</h3>
          <div class="weather-thumbs-icon">
            <p>{{item.main}}</p>
            <img :src="item.icon" alt="">
          </div>
          <p>Temp: {{item.temp}}C°</p>
          <p>Feels like: {{item.realFeel}}C°</p>
          <p>Humidity: {{item.humidity}}%</p>
          <p>Wind: {{item.windSpeed}}m/s {{item.windDirection}}</p>
        </div>
        <template #nextArrow="arrowOption">
          <div class="custom-arrow">
            {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
          </div>
        </template>
      </VueSlickCarousel>
    </div>

    <div class="vue-slick-wrapper" v-if="weatherAfter2days.length != 0">
      <h2>
        {{new Intl.DateTimeFormat('en', { month: 'long' }).format(weatherAfter2days[0].date)}}
        {{new Date(weatherAfter2days[0].date).getDate()}}, 
        {{weatherAfter2days[0].day}}
      </h2>
      <VueSlickCarousel class="vue-slick after2days" v-bind="slickConfig">
        <template #prevArrow="arrowOption">
          <div class="custom-arrow">
            {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
          </div>
        </template>
        <div class="weather-thumbs" v-bind:class="checkActive(item)" v-on:click="addActive(item)" v-for="item in weatherAfter2days" :key="item.id">
          <h3>{{item.time}}</h3>
          <div class="weather-thumbs-icon">
            <p>{{item.main}}</p>
            <img :src="item.icon" alt="">
          </div>
          <p>Temp: {{item.temp}}C°</p>
          <p>Feels like: {{item.realFeel}}C°</p>
          <p>Humidity: {{item.humidity}}%</p>
          <p>Wind: {{item.windSpeed}}m/s {{item.windDirection}}</p>
        </div>
        <template #nextArrow="arrowOption">
          <div class="custom-arrow">
            {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
          </div>
        </template>
      </VueSlickCarousel>
    </div>

  </div>
</template>

<script>
import API from '../config/api.js'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

const getDirection = function (angle) {
  const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE']
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8]
}

const getDay = function (day) {
    var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  var d = new Date(day);
  var n = d.getDay();
  return(days[n]);
}

export default {
  name: 'Weather',
  components: {
    VueSlickCarousel
  },
  
  data() {
    return {
      cities: [],
      weather: {},
      weatherToday: [],
      weatherTomorrow: [],
      weatherAfterTomorrow: [],
      weatherAfter2days: [],
      slickConfig: {
        "dots": false,
        "speed": 500,
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "arrows": true,
        "infinite": false
      }
    }
  },

  async mounted() {
    this.getWeather(this.$store.state.city.city)
  },

  methods: {
    addToHistory: function(item){
      const historyProps = {}
      historyProps.realDate = new Date()
      historyProps.date = item.date
      historyProps.weatherDate = item.date
      historyProps.temp = item.temp
      historyProps.realFeel = item.realFeel
      historyProps.windDirection = item.windDirection
      historyProps.windSpeed = item.windSpeed
      historyProps.humidity = item.humidity

      this.$store.state.history.history.push(historyProps)
      localStorage.setItem('history', JSON.stringify(this.$store.state.history.history))
    },
    checkActive: function(item){
      if (item.active == true){
        return "active"
      }
    },
    addActive: function(curItem){
      const date = curItem.date
      
      this.weatherToday.forEach(item=>{
        const itemDate = item.date
        if ( date == itemDate ){
          item.active = true
          this.weather = item
          this.addToHistory(item)
        }else{
          item.active = false
        }
      })
      this.weatherTomorrow.forEach(item=>{
        const itemDate = item.date
        if ( date == itemDate ){
          item.active = true
          this.weather = item
          this.addToHistory(item)
        }else{
          item.active = false
        }
      })
      this.weatherAfterTomorrow.forEach(item=>{
        const itemDate = item.date
        if ( date == itemDate ){
          item.active = true
          this.weather = item
          this.addToHistory(item)
        }else{
          item.active = false
        }
      })
      this.weatherAfter2days.forEach(item=>{
        const itemDate = item.date
        if ( date == itemDate ){
          item.active = true
          this.weather = item
          this.addToHistory(item)
        }else{
          item.active = false
        }
      })
    },
    inputHandler: function(e){
      let value = e.target.value
      fetch(`${API.Dadata.url}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${API.Dadata.key}`
        },
        body: JSON.stringify({
          language: 'en',
          query: value,
          count: 5,
          from_bound: { "value": "city" },
          to_bound: { "value": "city" },
        })
      })
      .then(response => response.json())
      .then((data) => {
        let values = data.suggestions
        this.cities = []

        values.forEach(item=> {
          this.cities.push(item.data.city)
        })

        if (values.length < 1){
          this.cities = []
        }
         
      });
    },

    getWeather: function (cityName) {
      const input = document.querySelector('#weather-form').elements.cityInput
      const city = cityName || input.value
      
      fetch(`${API.Weather.url}forecast?units=metric&q=${city}&appid=${API.Weather.key}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then((data) => {
        if ( data.cod == "404" ){
          input.classList.add('error')
          this.cities = []
          return
        }
        this.weatherToday = []
        this.weatherTomorrow = []
        this.weatherAfterTomorrow = []
        this.weatherAfter2days = []
        this.cities = []
        this.$store.state.city.city = city
        input.value = this.$store.state.city.city
        localStorage.setItem('city', this.$store.state.city.city)
        input.classList.remove('error')
        const weatherItems = []
        const currentDate = new Date()
        let lastWeatherDate = currentDate.setDate(currentDate.getDate() + 4)
        lastWeatherDate = new Date(lastWeatherDate)
        lastWeatherDate.setHours(23)

        data.list.forEach(item =>{
          const date = new Date(item.dt_txt)
          if ( date < lastWeatherDate && date > (new Date()) ){
            weatherItems.push(item)
          }
        })

        // get current weather
        fetch(`${API.Weather.url}weather?units=metric&q=${city}&appid=${API.Weather.key}`, {
          method: 'GET',
        })
        .then(response => response.json())
        .then((data) => {
          const weatherParams = {}

          // get date & time
          const date = new Date()
          const ho = new Intl.DateTimeFormat('ru', { hour: 'numeric' }).format(date);
          let mi = new Intl.DateTimeFormat('ru', { minute: 'numeric' }).format(date);
          if ( mi < 10 ){
            mi = "0" + mi
          }
          weatherParams.date = date
          weatherParams.day = getDay(date)
          weatherParams.time = `${ho}:${mi}`

          // get weather properties
          weatherParams.humidity = data.main.humidity
          weatherParams.temp = data.main.temp
          weatherParams.realFeel = data.main.feels_like
          weatherParams.windDirection = getDirection(data.wind.deg)
          weatherParams.windSpeed = data.wind.speed
          weatherParams.main = data.weather[0].main
          weatherParams.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

          weatherParams.active = true
          
          this.weatherToday.unshift(weatherParams)
          this.weather = weatherParams
          this.addToHistory(weatherParams)
        });

        // get other weather
        weatherItems.forEach(item =>{
          const weatherParams = {}

          // get date & time
          const date = new Date(item.dt_txt)
          const ho = new Intl.DateTimeFormat('ru', { hour: 'numeric' }).format(date);
          let mi = new Intl.DateTimeFormat('ru', { minute: 'numeric' }).format(date);
          if ( mi == 0 ){
            mi = mi + "0"
          }
          weatherParams.date = date
          weatherParams.day = getDay(date)
          weatherParams.time = `${ho}:${mi}`

          // get weather properties
          weatherParams.humidity = item.main.humidity
          weatherParams.temp = item.main.temp
          weatherParams.realFeel = item.main.feels_like
          weatherParams.windDirection = getDirection(item.wind.deg)
          weatherParams.windSpeed = item.wind.speed
          weatherParams.main = item.weather[0].main
          weatherParams.icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`

          let dateTomorrow = new Date().setDate(new Date().getDate() + 1)
          dateTomorrow = new Date(dateTomorrow).getDate()
          let dateAfterTomorrowDay = new Date().setDate(new Date().getDate() + 2)
          dateAfterTomorrowDay = new Date(dateAfterTomorrowDay).getDate()
          let dateAfter2Day = new Date().setDate(new Date().getDate() + 3)
          dateAfter2Day = new Date(dateAfter2Day).getDate()

          switch (date.getDate()) {
            case (new Date().getDate()):
              this.weatherToday.push(weatherParams)
              break
            case (dateTomorrow):
              this.weatherTomorrow.push(weatherParams)
              break
            case (dateAfterTomorrowDay):
              this.weatherAfterTomorrow.push(weatherParams)
              break
            case (dateAfter2Day):
              this.weatherAfter2days.push(weatherParams)
              break
          }
        })
      })
    },

    promptsHandler: function(e){
      e.target.closest('form').elements.cityInput.value = e.target.innerHTML
      this.cities = []
      e.target.closest('form').elements.cityInput.classList.remove('error')
    },
      
    submitHandler: function(e){
      e.preventDefault()
      this.getWeather()
    }
  }

}
</script>

<style scoped lang="scss">
h1{
  span{
    color: #42b983;
  }
}

.weather-wrapper{
  width: 100%;
  max-width: 700px;
  margin: auto;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

form {
  position: relative;
  width: 100%;

  span{
    display: none;
  }

  input[type=text] {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 70px 0 10px;
    box-sizing: border-box;
    font-size: 26px;
    position: relative;

    &.error{
      border: 2px solid #8f2b2b;
      background-color: #8f2b2b3b;
    }
  }
  input[type=submit] {
    margin-left: -50px;
    height: 50px;
    width: 50px;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    outline: none;
    position: absolute;
    right: 0;
    top: 0;
    background-image: url('../assets/magnifier.png');
    background-size: 50% 50%;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  ul{
    width: 100%;
    position: absolute;
    z-index: 10;
    margin: 0;

    li{
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #000000;
      margin: 0;
      box-sizing: border-box;
      background-color: #ffffff;

      &:last-child{
        border-bottom: 0;
      }

      &:first-child{
        border-bottom: 1px solid #000000;
      }

      &:hover{
        color: #ffffff;
        background-color: #42b983;
        border: 0;
        cursor: pointer;
      }
    }
  }
}

.slick-prev:before, .slick-next:before{
  color: #000000;
}

.vue-slick-wrapper{
  h2{
    text-align: center;
  }
}

.vue-slick{
  width: 90%;
  display: block;
  margin: 20px auto;
  text-align: left;

  h3{
    margin: 15px 0 0;
  }

  button{
    display: none;
  }

  .weather-thumbs-icon{
    display: flex;
    align-items: center;
    
    p{
      font-weight: bold;
    }
  }
}

.weather-thumbs{

  img{
    pointer-events: none
  }

  &:focus{
    outline: none;
  }

  &.active{
    background-color: #42b983;
  }
}

.main-weather{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p{
    font-size: 20px;
  }

  div:last-child{
    width: 30%;

    img{
      width: 100%;
    }

    p{
      font-size: 24px;
      margin-top: -20px;
    }
  }
}
</style>
