<template>
  <Payment />
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

onNuxtReady(async () => {
  try {
    await store.paymentInfo();
  } catch (err) {
    await navigateTo("");
  }
});
</script>

<style lang="scss" scoped></style>
