<template>
  <div class="m-3">
    <h1>Trade or View your portfolio</h1>
    <h3 class="small">You may Save & Load your Data</h3>
    <h3 class="small">Click on 'End Day' to begin a New Day!</h3>
    <hr>
    <p>Your funds: {{ funds | currency}}</p>
  </div>
</template>


<script>
export default{
  computed: {
    funds(){
      return this.$store.getters.funds;
    }
  }
}
</script>
