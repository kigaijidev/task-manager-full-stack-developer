<template>
  <Title>Change Password | Todo List</Title>
  <ChangePassword />
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

onNuxtReady(async () => {
  try {
    await store.getUser();
  } catch (err) {
    await navigateTo("");
  }
});
</script>

<style lang="scss" scoped></style>
