<template>
  <div class="col-sm-6 col-md-4 mt-4">
    <div class="card">
      <div class="card-header pt-3 pl-3 pb-0">
        <h6 class="card-title p-0">
          {{ stock.name }}
          <small>(price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
        </h6>
      </div>
      <div class="card-body">
        <input type="number"
          class="form-control"
          placeholder="Quantity"
          v-model="quantity"
          :class="{danger: inSufficientQuantity}"
        >
        <button
          class="btn btn-success mt-3"
          @click="sellStock"
          :disabled="inSufficientQuantity || quantity <= 0 || !Number.isInteger(Number(quantity))"
        >
          {{ inSufficientQuantity ? 'Not enough stocks' : 'Sell' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default{
  props: ['stock'],
  data(){
    return{
      quantity: ''
    }
  },
  computed: {
    inSufficientQuantity(){
      return Number(this.quantity) > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions({
      placeSellOrder: 'sellStock'
    }),
    sellStock(){
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: Number(this.quantity)
      }
      this.placeSellOrder(order);
      this.quantity = '';
    },
  }
}
</script>

<style scoped>
.card-header{
  background: #D9EDF7;
  color: #3F7B98;
}
.danger{
  border: 1px solid red;
}
</style>
