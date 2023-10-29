<template>
  <h1 class="w-text">Profile</h1>
  <form @submit.prevent="handleUpdate">
    <label for="name">Name</label>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="enter your name..."
      class="custom-container field"
      v-model="form.name"
      :class="[$v.name.$error ? 'err-input' : '']"
      @change="$v.email.$touch"
    />
    <p class="error" v-for="error in $v.name.$errors">
      {{ error.$message }}
    </p>

    <label for="email">Email: {{ store.user.email }}</label>

    <label for="expiredDay">Expired Date: {{ store.user.expiredDay ?? ''}}</label>
    
    <label for="lassAccess">Last Access: {{ store.user.lastAccess ?? '' }}</label>

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

//----------------Pinia---------------------//
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

type formData = {
  name: string;
};
const form = ref<formData>({ name: store.user.name });
const apiError = ref<err>({ email: "", password: "", msgResponse: "" });

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("The name field is required", required),
    },
  };
});

const $v = useVuelidate(rules, store.user);

const handleUpdate = async () => {
  const validate: boolean = await $v.value.$validate();
  if (validate) {
    await store.updateInfo(
      form.value.name
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
