<template>
  <h1 class="w-text">Payment</h1>
  <form @submit.prevent="handleUpdatePayment">
    <label for="fullName">Full Name</label>
    <input
      type="text"
      name="fullName"
      id="fullName"
      placeholder="enter your name..."
      class="custom-container field"
      v-model="form.fullName"
    />

    <label for="bank">Bank</label>
    <input
      type="text"
      name="bank"
      id="bank"
      placeholder="enter your bank..."
      class="custom-container field"
      v-model="form.bank"
    />

    <label for="bankNumber">Bank number</label>
    <input
      type="text"
      name="bankNumber"
      id="bankNumber"
      placeholder="enter your bank number..."
      class="custom-container field"
      v-model="form.bankNumber"
    />

    <input type="submit" value="Update" class="submit" />

    <NuxtLink class="btn" to="/home">
      <Icon name="ion:arrow-undo" /> Back 
    </NuxtLink>
  </form>
</template>

<script setup lang="ts">
//----------------Vueildate---------------------//
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import err from "@/models/errorModel";
import errMsg from "models/errorMsgModel";

//----------------Pinia---------------------//
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

type formData = {
  fullName: string;
  bank: string;
  bankNumber: string;
};

const form = ref<formData>({ fullName: store.user.fullName, bank: store.user.bank, bankNumber: store.user.bankNumber });
const apiError = ref<errMsg>({ msgResponse: "" });

const rules = computed(() => {
  return {
    fullName: {
      required: helpers.withMessage("The name field is required", required),
    },
    bank: {
      required: helpers.withMessage("The bank field is required", required),
    },
    bankNumber: {
      required: helpers.withMessage("The bank number field is required", required),
    }
  };
});

const $v = useVuelidate(rules, form);

const handleUpdatePayment = async () => {
  const validate: boolean = await $v.value.$validate();
  if (validate) {
    await store.updatePayment(
      form.value.fullName,
      form.value.bank,
      form.value.bankNumber
    ).then(async () => {
      await navigateTo("/home");
    }).catch((err) => {
      apiError.value.msgResponse = err;
    });
  }
};
</script>

<style lang="scss">
form {
  width: 400px;
  margin-top: 50px;
  padding: 20px;
  @include page-center;
  background-color: #383b5c;
  border-radius: 4px;
}

.w-text {
  text-align: center;
}

label {
  display: block;
  margin-top: 25px;
  color: $main-Fcolor;
}
.field {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  @include input-styled;
}
.submit {
  @include input-styled;
  margin-top: 25px;
  padding: 12px 10px;
  float: right;
  width: 30%;
  height: initial;
  cursor: pointer;
  background-color: $main-color;
  border-radius: 4px;
  color: $main-Fcolor;

  &:hover {
    background-color: lighten($main-color, 30%);
  }
}

.error {
  margin-top: 12px;
  color: darken(red, 3%);
  font-size: 0.9rem;
  text-decoration: underline;
  margin-left: 5px;
}
.err-input {
  border: 2px solid red;
}
</style>
