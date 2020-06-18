<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" to="/">Stock Trader</router-link>
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto">
      <router-link class="nav-link" activeClass= "active" to='/portfolio'>Portfolio</router-link>
      <router-link class="nav-link" activeClass= "active" to="/stocks">Stocks</router-link>
    </ul>
    <ul class="navbar-nav open">
      <li class="nav-item"><a class="nav-link" href="#" @click="endDay">End Day</a></li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle"
          href="#" id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          ref="dropdownMenu"
        >Save & Load</a>
        <div class="dropdown-menu"
          aria-labelledby="navbarDropdownMenuLink"
          :class="{show: isDropdownOpened}"
        >
          <a class="dropdown-item" href="#" @click="saveData">Save Data</a>
          <a class="dropdown-item" href="#" @click="loadData">Load Data</a>
        </div>
      </li>
      <li class="nav-item pl-2">
      <strong class="navbar-text">Funds: {{ funds | currency }}</strong>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import {mapActions} from 'vuex';
export default{
  data(){
    return{
      isDropdownOpened: false
    }
  },
  computed: {
    funds(){
      return this.$store.getters.funds;
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: 'randomizeStocks',
      fetchData: 'loadData'
    }),
    endDay(){
      this.randomizeStocks();
    },
    saveData(){
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      };
      this.$http.put('data.json', data);
    },
    loadData(){
      this.fetchData();
    },
    dropdownState(e){
      let element = this.$refs.dropdownMenu;
      let target = e.target;
      if(element == target || element.contains(target)){
        this.isDropdownOpened = true;
      }else{
        this.isDropdownOpened = false;
      }
    }
  },
  created(){
    document.addEventListener('click', this.dropdownState);
  },
  destroyed(){
    document.removeEventListener('click', this.dropdownState);
  }
}
</script>
