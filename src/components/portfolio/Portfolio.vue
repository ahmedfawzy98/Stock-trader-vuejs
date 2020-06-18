<template>
  <div>
    <div class="card-deck" v-if="stocks.length > 0">
      <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock>
    </div>
    <h3 v-else class="mt-3">You don't have any stocks</h3>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Stock from './Stock.vue';
export default{
  computed: {
    ...mapGetters({
      stocks: 'stockPortfolio',
    })
  },
  components: {
    appStock: Stock
  }
}
</script>
