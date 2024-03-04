<template>
  <Header />
  <Balance :balance="balance" />
  <IncomeExpenses :income="income" :expense="expense" />
  <TransactionList
    :transactions="transactions"
    @transactionDeleted="HandletransactionDeleted"
    @updatedTransaction="handleUpdatedTransaction"
  />
  <AddTransaction @addNewTransaction="addNewTransaction" />
</template>

<script>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";

import { ref, computed } from "vue";

import { useToast } from "vue-toastification";

export default {
  name: "Home",
  components: {
    Header,
    Balance,
    IncomeExpenses,
    TransactionList,
    AddTransaction,
  },

  setup() {
    const toast = useToast();

    const transactions = ref([{ id: 1, amount: -600, description: "Rent" }]);

    const income = computed(() => {
      let totalIncome = 0;
      for (const transaction of transactions.value) {
        if (transaction.amount > 0) {
          totalIncome += parseFloat(transaction.amount);
        }
      }
      return totalIncome;
    });

    const expense = computed(() => {
      let totalExpense = 0;
      for (const transaction of transactions.value) {
        if (transaction.amount < 0) {
          totalExpense += parseFloat(transaction.amount);
        }
      }
      return totalExpense;
    });

    const balance = computed(() => {
      return income.value + expense.value;
    });

    const addNewTransaction = (transaction) => {
      if (transaction.amount === 0) {
        toast.warning("Amount cannot be zero!");
        return;
      } else {
        transactions.value.push({
          id: generateUniqueId(),
          description: transaction.description,
          amount: transaction.amount,
        });
        toast.success("Transaction added.");
      }
    };

    const HandletransactionDeleted = (id) => {
      transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id
      );

      toast.success("Transaction deleted.");
    };

    const handleUpdatedTransaction = (updatedtransaction) => {
      if (updatedtransaction.amount === 0) {
        toast.warning("Amount cannot be zero!");
        return;
      } else {
        for (const transaction of transactions.value) {
          if (transaction.id === updatedtransaction.id) {
            transaction.amount = updatedtransaction.amount;
            transaction.description = updatedtransaction.description;
            break;
          }
        }
        toast.success("Transaction Updated.");
      }
    };

    // Generate unique ID
    const generateUniqueId = () => {
      return Math.floor(Math.random() * 1000000);
    };

    return {
      transactions,
      addNewTransaction,
      balance,
      income,
      expense,
      HandletransactionDeleted,
      handleUpdatedTransaction,
    };
  },
};
</script>

