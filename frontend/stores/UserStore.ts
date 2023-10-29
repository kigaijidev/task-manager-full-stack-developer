import { defineStore } from "pinia";
import User from "@/models/userModel";
import axios from "axios";
import { JwtDecode, getCookie, getDateFormat } from "../helper/index";
import { TaskList } from ".nuxt/components";
import { useTaskStore } from "@/stores/TaskStore";

export type RootState = {
  user: User;
  apiLink: string;
};

export const useUserStore = defineStore(
  "userStore",

  {
    state: (): RootState => ({
      user: {
        _id: "",
        name: "",
        email: "",
        isAuth: false,
        currency: 0,
        plan: "",
        expiredDay: "",
        lastAccess: "",
        fullName: "",
        bank: "",
        bankNumber: ""
      },
      apiLink: useRuntimeConfig().public.API_BASE_URL,
    }),

    getters: {},
    actions: {
      //-----------------------*****Sign UP*****-----------------------------///
      async signUp(name: string, email: string, password: string) {
        await axios.post(this.apiLink + "auth/signup", { name, email, password }, {
          headers:{
            "Content-Type": "application/json"
          }
        }).catch((err) => {
          throw err.response.data.message;
        });
      },

      //-----------------------*****Sign IN*****-----------------------------///
      async signIn(email: string, password: string) {
        await axios.post(this.apiLink + "auth/login", { email, password }, {
          headers:{
            "Content-Type": "application/json"
          }
        })
        .then((res) => {
          const result = res.data.metadata;
          const { token, user } = result;

          document.cookie = `token=${token}`;
          document.cookie = `userId=${user.UserID}`;
          this.user._id = user.UserID;
          this.user.name = user.Name;
          this.user.email = user.Email;
          this.user.isAuth = true;
        }).catch((err) => {
          throw err.response.data.message;
        });
      },

      async getUser() {
        const token = getCookie('token');

        if(!token){
          await navigateTo('')
        }

        const { UserID } = JwtDecode(token);

        const response = await axios.get(this.apiLink + "user/info", {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "client-id": UserID
          }
        }).catch((err) => {
          throw err.response.data.message;
        })

        const user = response.data.metadata;

        if(!user){
          await navigateTo('')
        }

        this.user._id = user.UserID;
        this.user.name = user.Name;
        this.user.email = user.Email;
        this.user.isAuth = true;
        this.user.currency = user.Payments.Currency;
        this.user.plan = user.UserSubscriptions[0].SubscriptionPlans.Name;
        this.user.expiredDay = getDateFormat(user.SubscriptionExpiryDate);
        this.user.lastAccess = getDateFormat(user.LastAccessDate);
      },
      async signOut() {
        const token = getCookie('token');
        const { UserID } = JwtDecode(token);
        await axios.post(this.apiLink + "auth/logout", {} , {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "client-id": UserID
          }
        })
        .then(async (res) => {
          const store = useTaskStore();
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          this.user._id = '';
          this.user.name = '';
          this.user.email = '';
          this.user.isAuth = false;
          store.tasks = []
          await navigateTo('')
        }).catch((err) => {
          throw err.data.errors;
        });
      },

      async updateInfo(name: string) {
        const token = getCookie('token');
        await axios.patch(this.apiLink + "user/info", { name }, {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "client-id": this.user._id
          }
        }).catch((err) => {
          throw err.response.data.message;
        });
      },

      async paymentInfo() {
        const token = getCookie('token');
        const { UserID } = JwtDecode(token);
        await axios.get(this.apiLink + "payment", {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "client-id": UserID
          }
        })
        .then((response) => {
          const payment = response.data.metadata;

          this.user.fullName = payment.FullName;
          this.user.bank = payment.Bank;
          this.user.bankNumber = payment.BankNumber;
        }).catch((err) => {
          throw err.response.data.message;
        });
      },

      async updatePayment(fullName: string, bank: string, bankNumber: string) {
        const token = getCookie('token');
        await axios.patch(this.apiLink + "payment", { fullName, bank, bankNumber }, {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "client-id": this.user._id
          }
        })
        .then((response) => {
          const payment = response.data.metadata;

          this.user.fullName = payment.FullName;
          this.user.bank = payment.Bank;
          this.user.bankNumber = payment.BankNumber;
        }).catch((err) => {
          throw err.response.data.message;
        });
      },

      async changePassword(oldPass: string, newPass: string, validNewPass: string) {
        const token = getCookie('token');
        const { UserID } = JwtDecode(token)
        await axios.patch(this.apiLink + "auth/change-password", { oldPass, newPass, validNewPass }, {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "client-id": UserID
          }
        }).catch((err) => {
          throw err.response.data.message;
        });
      },

      async userExists(){
        const token = getCookie('token');

        if(!token){
          await navigateTo('')
        }

        const user = JwtDecode(token);

        if(!user){
          await navigateTo('')
        }
      }
    },
  }
);
