import { defineStore } from "pinia";
import Task from "models/todoModel";
import { JwtDecode, getCookie } from "../helper/index";

export type RootState = {
  tasks: Task[];
  plans: Plan[];
  apiLink: string;
};
import { useUserStore } from "@/stores/UserStore";
import axios from "axios";
import Plan from "models/planModel";

export const useTaskStore = defineStore("taskStore", {
  state: (): RootState => ({
    tasks: [],
    plans: [],
    apiLink: useRuntimeConfig().public.Todos_URL,
  }),

  getters: {
    allTasks(): Task[] {
      return this.tasks;
    },
    completedTasks(): Task[] {
      return this.tasks.filter((task) => task.IsCompleted);
    },
    leftTasks(): Task[] {
      return this.tasks.filter((task) => !task.IsCompleted);
    },
  },
  actions: {
    async fetchTasks() {
      const store = useUserStore();
      const token = getCookie('token');
      const { UserID } = JwtDecode(token);
      await axios.get(this.apiLink + "todo", {
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "client-id": UserID
        }
      }).then((res) => {
        const result = res.data.metadata;
        this.tasks = result;
      }).catch((err) => {
        this.tasks = [];
        throw err.response.data.message;
      })
    },

    async fetchPlans() {
      const store = useUserStore();
      const token = getCookie('token');

      if(!token){
        await navigateTo('')
      }

      const { UserID } = JwtDecode(token);
      await axios.get(this.apiLink + "plan", {
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "client-id": UserID
        }
      }).then((res) => {
        const result = res.data.metadata;
        this.plans = result;
      }).catch((err) => {
        this.plans = [];
        throw err.response.data.message;
      })
    },

    async addTask(title: string) {
      if(!title){
        return;
      }
      const token = getCookie('token');
      const store = useUserStore();
      await axios.post(this.apiLink + "todo", { title: title }, {
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "client-id": store.user._id
        }
      })
      .then(async (res) => {
        await this.fetchTasks();
      }).catch((err) => {
        throw err.response.data.message;
      });
    },
    async deleteTask(id: string) {
      const store = useUserStore();
      const token = getCookie('token');
      const task = this.tasks.find((t) => t.TodoID === id) as Task;
      await axios.delete(this.apiLink + `todo/${task.TodoID}`, {
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "client-id": store.user._id
        }
      }).then(async () => {
        await this.fetchTasks();
      }).catch((err) => {
        throw err.response.data.message;
      })
    },
    async clearCompleted() {
      this.completedTasks.forEach(
        async (task) => await this.deleteTask(task.TodoID)
      );
      await this.fetchTasks();
    },
    async toggleFinished(id: string) {
      const store = useUserStore();
      const token = getCookie('token');
      const task = this.tasks.find((t) => t.TodoID === id) as Task;
      await axios.patch(this.apiLink + `todo/update-status/${task.TodoID}`, {}, {
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "client-id": store.user._id
        }
      }).then(() => {
        task.IsCompleted = !task.IsCompleted;
      }).catch((err) => {
        throw err.response.data.message;
      })
    },
    async upgradePlan(planId: string) {
      const store = useUserStore();
      const token = getCookie('token');
      const { UserID } = JwtDecode(token);
      const plan = this.plans.find((p) => p.PlanID === planId) as Plan;
      await axios.patch(this.apiLink + `subscription/${plan.PlanID}`, {}, {
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "client-id": UserID
        }
      }).then(async () => {
        await navigateTo('/home')
      }).catch((err) => {
        throw err.response.data.message;
      })
    },
    async cancelPlan() {
      const store = useUserStore();
      const token = getCookie('token');
      const { UserID } = JwtDecode(token);
      await axios.patch(this.apiLink + `subscription/cancel`, {}, {
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "client-id": UserID
        }
      }).then(async () => {
        await navigateTo('/home')
      }).catch((err) => {
        throw err.response.data.message;
      })
    },
  },
});
