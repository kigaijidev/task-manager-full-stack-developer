<template>
  <form @submit.prevent="handleChangePassword">
    <label for="cpassword">Current Password</label>
    <input
      type="password"
      name="cpassword"
      id="cpassword"
      placeholder="enter your currnent password..."
      class="custom-container field"
      v-model="form.cpassword"
    />

    <label for="npassword">New Password</label>
    <input
      type="password"
      name="npassword"
      id="npassword"
      placeholder="enter your new password..."
      class="custom-container field"
      v-model="form.npassword"
    />
    
    <label for="validpassword">Validate Password</label>
    <input
      type="password"
      name="validpassword"
      id="validpassword"
      placeholder="enter your validate password..."
      class="custom-container field"
      v-model="form.validpassword"
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

//----------------Pinia---------------------//
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

type formData = {
  cpassword: string;
  npassword: string;
  validpassword: string;
};
const form = ref<formData>({ cpassword: "", npassword: "", validpassword: "" });
const apiError = ref<err>({ email: "", password: "", msgResponse: "" });

const rules = computed(() => {
  return {
    cpassword: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "Password must be at least 6 charcters or digits ",
        minLength(6)
      ),
    },
    npassword: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "Password must be at least 6 charcters or digits ",
        minLength(6)
      ),
    },
    validpassword: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "Password must be at least 6 charcters or digits ",
        minLength(6)
      ),
    },
  };
});

const $v = useVuelidate(rules, form);

const handleChangePassword = async () => {
  const validate: boolean = await $v.value.$validate();
  if (validate) {
    await store.changePassword(
      form.value.cpassword,
      form.value.npassword,
      form.value.validpassword
    ).then(async () => {
      form.value.cpassword = "";
      form.value.npassword = "";
      form.value.validpassword = "";
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

.btn {
  margin-top: 20px;
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
