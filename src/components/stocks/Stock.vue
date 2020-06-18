<template>
  <div class="col-sm-6 col-md-4 mt-4">
    <div class="card">
      <div class="card-header pt-3 pl-3 pb-0">
        <h6 class="card-title p-0">
          {{ stock.name }}
          <small>(price: {{ stock.price }})</small>
        </h6>
      </div>
      <div class="card-body">
        <input type="number"
          class="form-control"
          placeholder="Quantity"
          v-model="quantity"
          :class="{danger: inSufficientFunds}"
        >
        <button
          class="btn btn-success mt-3"
          @click="buyStock"
          :disabled="inSufficientFunds || quantity <= 0 || !Number.isInteger(Number(quantity))"
        >
          {{ inSufficientFunds ? 'Insufficient Funds' : 'Buy' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: ['stock'],
  data(){
    return{
      quantity: ''
    }
  },
  computed: {
    funds(){
      return this.$store.getters.funds;
    },
    inSufficientFunds(){
      return this.stock.price * Number(this.quantity) > this.funds;
    }
  },
  methods: {
    buyStock(){
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: Number(this.quantity)
      }
      this.$store.dispatch('buyStock', order);
      this.quantity = '';
    }
  }
}
</script>

<style scoped>
.card-header{
  background: #DFF0D8;
  color: #3C763D;
}
.danger{
  border: 1px solid red;
}
</style>
