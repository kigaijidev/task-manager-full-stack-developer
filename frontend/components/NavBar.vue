<template>
  <nav>
    <h1>todo</h1>

    <div class="nav-plan" v-if="store.user.isAuth" @click="handlePlan">
      <h2>{{ store.user.plan }}</h2>
    </div>
    <div class="profile" v-if="store.user.isAuth" @click="handlePayment">
      <Icon name="streamline:money-currency-dollar-dollar-exchange-payment-forex-finance-currency-money-foreign" @click="" class="p-icon" />
      <h2>{{ store.user.currency }}</h2>
    </div>
    <div class="profile" v-if="store.user.isAuth" @click="handleProfile">
      <Icon name="iconamoon:profile" @click="" class="p-icon" />
      <h2>{{ store.user.name }}</h2>
    </div>
    <div
      class="log-out"
      title="Log Out"
      @click="handleSignOut"
      v-if="store.user.isAuth"
    >
      <Icon name="tabler:logout" class="out-icon" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

const handleSignOut = async () => {
  try {
    await store.signOut();
    navigateTo("/sign-in");
  } catch (err) {}
};

const handleProfile = async () => {
  try {
    navigateTo("/profile");
  } catch (err) {}
};

const handlePayment = async () => {
  try {
    navigateTo("/payment");
  } catch (err) {}
};

const handlePlan = async () => {
  try {
    navigateTo("/plan-list");
  } catch (err) {}
};

</script>

<style lang="scss" scoped>
nav {
  margin-top: 40px;
  margin-bottom: 20px;
  @include align-vertical;
}
h1 {
  text-transform: uppercase;
  flex: 1;
  color: white;
  letter-spacing: 12px;
  font-size: 1.5rem;
}

.nav-plan {
  padding: 10px 10px;
  @include align-vertical;
  border-radius: 27px;
  background-color: red;

  h2 {
    color: white;
    margin: 0;
    font-size: 1rem;
  }
}

.profile {
  padding: 10px 15px;
  @include align-vertical;
  border-radius: 27px;

  .p-icon {
    margin-bottom: 3px;
    color: white;
    font-size: 1.5rem;
  }
  h2 {
    color: white;
    margin: 0;
    margin-left: 10px;
    font-size: 1rem;
  }
}

.profile:hover {
  border: 1px solid #3838ff;
}

.log-out {
  margin-left: 10px;
  cursor: pointer;

  .out-icon {
    font-size: 1.5rem;
    color: white;
  }
  &:hover {
    .out-icon {
      color: $main-Fcolor;
    }
  }
}
</style>
