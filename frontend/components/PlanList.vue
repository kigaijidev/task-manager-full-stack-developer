<template>
  <p class="error">
    {{ apiError.msgResponse }}
  </p>
  <div class="loading" v-if="isLoading">Loading Plans...</div>
  <div class="plan-list" v-else>
    <div class="custom-container" v-for="plan in viewPlans">
      <div class="checkbox" @click="upgradePlan(plan.PlanID)">
        <Icon name="typcn:tick" v-if="plan.Name === storeUser.user.plan" />
      </div>
      <div class="plan" :class="[plan.Name === storeUser.user.plan ? 'checked' : '']">
        {{ plan.Name }}: {{ plan.MaxTodos }} todos &lpar;price: ${{ plan.Price }}/month&rpar;
      </div>
      <Icon v-if="plan.Name === storeUser.user.plan && plan.Name !== 'Free'"
        name="ic:baseline-close" title="Cancel"
        class="delete"
        @click="cancelPlan()"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import errMsg from "@/models/errorMsgModel";
import { useUserStore } from "@/stores/UserStore";
const store = useTaskStore();
const storeUser = useUserStore();

const apiError = ref<errMsg>({ msgResponse: "" });

const viewPlans = store.plans;

const isLoading = ref<Boolean>(false);

onNuxtReady(async () => {
  isLoading.value = true;
  await store.fetchPlans().finally(() => {
    isLoading.value = false;
  });
});

const upgradePlan = async (PlanID: any) => {
  store.upgradePlan(PlanID).catch((err) => {
    apiError.value.msgResponse = err;
  })
}

const cancelPlan = async () => {
  store.cancelPlan().catch((err) => {
    apiError.value.msgResponse = err;
  })
}
</script>

<style lang="scss">
.loading {
  margin: 10px auto;
  background-color: #2b2a2a;
  color: white;
  font-size: 1.4rem;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  padding: 10px;
  @include all-center;
}

.plan-list {
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  .checkbox {
    @include all-center;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      color: white;
      background-color: #8b94e9;
    }
  }

  .custom-container:hover .delete {
    visibility: visible;
  }
}
.delete {
  font-size: 1.4rem;
  margin-right: 5px;
  color: $main-Fcolor;
  cursor: pointer;
  visibility: hidden;
}

.plan {
  flex: 1;
  height: 30px;
  padding: 0;
  margin-top: 20px;
  background-color: inherit;
  color: $main-Fcolor;
  font-weight: 700;
  font-size: 0.9rem;
  position: relative;

  &::after {
    content: "";
    width: calc(100% + 74px);
    height: 1px;
    background-color: $border-color;
    position: absolute;
    bottom: -10px;
    left: -41px;
  }

  &.checked {
    font-size: large;
    text-decoration: dashed;
    color: #00ff00;
  }
}

.filter-container {
  max-width: 100%;
  padding: 10px 12px;
  background-color: $main-color;
  @include align-vertical;
  flex-wrap: wrap;

  border-radius: 4px;

  span,
  h3 {
    letter-spacing: 1px;
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    color: $options-color;

    @media (width > 576px) {
      font-size: 0.85rem;
    }
  }

  span {
    cursor: pointer;
  }
}

.all {
  margin-left: auto;
  margin-right: 7px;
  @media (width > 576px) {
    margin-right: 20px;
  }
}

.completed {
  margin-left: 7px;
  @media (width > 576px) {
    margin-left: 20px;
  }
  @media (width > 420px) {
    margin-right: auto;
  }
}

.clear {
  width: 100%;
  margin-top: 5px;
  text-align: center;
  @media (width > 420px) {
    text-align: initial;
    width: initial;
    margin-top: 0;
  }
}

.filter-container span:hover {
  color: $hover-color;
}

span.active {
  color: $selection-color;
}
</style>
