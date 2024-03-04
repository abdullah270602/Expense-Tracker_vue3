<template>
  <h3>Add New Transaction</h3>
    <form @submit.prevent="addTransaction">
        <div class="form-control">
            <label>Description:</label>
            <input type="text" placeholder="House Rent" v-model="description" required>
        </div>
        <div class="form-control">
            <label>Amount + -</label>
            <input type="number" placeholder="-500" v-model="amount" required>
        </div>

        <div>
            <button class="btn" >Add Transaction</button>
        </div>
    </form>
</template>

<script>


import { ref, } from 'vue'

export default {
    emits : ['addNewTransaction'],
    setup(props, {emit}){
        const amount = ref(null)
        const description = ref('')
       

        const addTransaction = () => {
            const transaction = { amount: amount.value, description: description.value }
            emit('addNewTransaction', transaction)


            // Reset form values after adding a transaction
            amount.value = 0;
            description.value = '';

        }

        
        return { amount, description, addTransaction}
    }
}
</script>

<style>

</style>