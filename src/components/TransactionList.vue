<template>
  <h3>Transactions</h3>
  <ul class="list" v-for="transaction in transactions" :key="transaction.id">
    <li :class="transaction.amount < 0 ? 'minus' : 'plus'">
      <p>
        {{ transaction.description }} <span>${{ transaction.amount }}</span>
      </p>
      <font-awesome-icon
        class="delete-btn"
        @click="deleteTransaction(transaction.id)"
        :icon="['fas', 'trash']"
      ></font-awesome-icon>
      <font-awesome-icon
        class="edit-btn"
        :icon="['fas', 'edit']"
        @click="toggleEditModal(transaction)"
      />
    </li>

    <div
      class="modal"
      :id="'modal-' + transaction.id"
      aria-hidden="true"
      v-if="showEditModal === transaction.id"
    >
      <div class="modal-dialog">
        <div class="modal-header">
          <h2>Edit Transaction</h2>
          <a
            href="#"
            class="btn-close"
            aria-hidden="true"
            @click="toggleEditModal(null)"
            >×</a
          >
        </div>
        <div class="modal-body">
          <label>Description:</label>
          <input type="text" v-model="editedDescription" required />
          <label>Amount + -</label>
          <input type="number" v-model="editedAmount" required />
        </div>
        <div class="modal-footer">
          <a href="#" class="btn" @click="saveEditedTransaction(transaction),toggleEditModal(null)">Save</a>
        </div>
      </div>
    </div>
  </ul>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["transactions"],
  emits: ["transactionDeleted","updatedTransaction"],
  setup(props, { emit }) {
    let showEditModal = ref(null);
    let editedDescription = ref("");
    let editedAmount = ref(null);

    const deleteTransaction = (id) => {
      emit("transactionDeleted", id);
    };

    const toggleEditModal = (transaction) => {
      showEditModal.value = transaction ? transaction.id : null;
      editedDescription.value = transaction ? transaction.description : "";
      editedAmount.value = transaction ? transaction.amount : null;
    };

    const saveEditedTransaction = (transaction) => {
      transaction.amount = editedAmount.value
      transaction.description = editedDescription.value

      emit('updatedTransaction', transaction)

    }

    return { deleteTransaction, showEditModal,editedDescription, editedAmount,toggleEditModal,saveEditedTransaction};
  },
};
</script>

<style>
</style>