<template>
  <div class="inc-exp-container">
    <div>
        <h4>Income</h4>
        <p class="money plus"> $ +{{ income }}</p>
    </div>
    <div>
        <h4>Expenses</h4>
        <p class="money minus">$ {{ expense }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props : ['income','expense']
}
</script>

<style>

</style>