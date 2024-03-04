<template>
  <div class="container">
    <h4>Your Balance</h4>
    <h1> $ {{ balance }}</h1>
  </div>
</template>

<script>
export default {
    name: 'Balance',
    props : ['balance']

}
</script>

