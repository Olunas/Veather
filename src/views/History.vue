<template>
  <div class="history">
    <h1>HISTORY</h1>
    <div v-if="history.length == 0">
      <h2>Your history is clear</h2>
    </div>
    <div class="history-wrapper" v-else>
      <h2>Your history:</h2>
      <div class="history-grid-header">
        <div class="history-grid-item sort" :data-increase="increase" v-on:click="sort">
          Searching date
        </div>
        <div class="history-grid-item">
          Date
        </div>
        <div class="history-grid-item">
          Temperature
        </div>
        <div class="history-grid-item">
          Real Feel
        </div>
        <div class="history-grid-item">
          Humidity
        </div>
        <div class="history-grid-item">
          Wind
        </div>
      </div>
      <div class="history-grid" v-for="item in history" :key="item.id">
        <div class="history-grid-item">
          {{getDate(item.realDate)}}
        </div>
        <div class="history-grid-item">
          {{getDate(item.date)}}
        </div>
        <div class="history-grid-item">
          {{item.temp}}C°
        </div>
        <div class="history-grid-item">
          {{item.realFeel}}C°
        </div>
        <div class="history-grid-item">
          {{item.humidity}}%
        </div>
        <div class="history-grid-item">
          {{item.windSpeed}}m/s {{item.windDirection}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'History',
  
  data() {
    return {
      history: this.$store.state.history.history,
      increase: 'true'
    }
  },

  async mounted() {
  },

  methods: {
    sort: function(e){
      const dateElem = e.target
      if (dateElem.dataset.increase == 'true'){
        this.history.sort((a,b) => new Date(b.realDate) - new Date(a.realDate))
      }else{
        this.history.sort((a,b) => new Date(a.realDate) - new Date(b.realDate))
      }
      if ( this.increase == 'true' ){
        this.increase = 'false'
      }else{
        this.increase = 'true'
      }
    },
    getDate: function(date){
      date = new Date(date)
      const da = new Intl.DateTimeFormat('en', {day: 'numeric'}).format(date)
      const mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(date)
      const ho = new Intl.DateTimeFormat('ru', { hour: 'numeric' }).format(date)
      let mi = new Intl.DateTimeFormat('ru', { minute: 'numeric' }).format(date)
      if ( mi < 10 || mi == 0){
        mi = "0" + mi
      }
      return(`${da} ${mo} ${ho}:${mi}`)
    },
  }

}
</script>

<style scoped lang="scss">
.history-wrapper{
  width: 95%;
  max-width: 1200px;
  margin: auto;
}

.history-grid-header{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: left;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #000000;

  .history-grid-item.sort{
    cursor: pointer;

    &::after{
      content: ">";
      color: #42b983;
    }

    &[data-increase="true"]{
      &::after{
        display: inline-block;
        transform: rotate(-90deg);
      }
    }
    
    &[data-increase="false"]{
      &::after{
        display: inline-block;
        transform: rotate(90deg);
      }
    }
  }
}

.history-grid{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: left;
  padding: 20px 0;

  &:not(:last-child){
    border-bottom: 1px solid #000000;
  }

  &:hover{
    background-color: #42b983;
    border-bottom: none;
  }
}
</style>
