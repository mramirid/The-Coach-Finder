<template>
  <main>
    <base-dialog
      :show="!!errorMessage"
      @close="closeErrorDialog"
      title="An Error Occurred"
    >
      <p>{{ errorMessage }}</p>
    </base-dialog>

    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner />
    </base-dialog>

    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="userAuthInput.email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="userAuthInput.password"
          />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </main>
</template>

<script lang="ts">
import UserAuthInput from "@/models/UserAuthInput";
import { defineComponent } from "vue";

enum AuthMode {
  LOGIN = "Login",
  SIGNUP = "Signup",
}

export default defineComponent({
  data() {
    return {
      formIsValid: true,
      mode: AuthMode.LOGIN,
      isLoading: false,
      errorMessage: null as string | null,
      userAuthInput: {
        email: "",
        password: "",
      } as UserAuthInput,
    };
  },
  computed: {
    submitButtonCaption(): string {
      return this.mode;
    },
    switchModeButtonCaption(): string {
      switch (this.mode) {
        case AuthMode.LOGIN:
          return `Signup Instead`;
        case AuthMode.SIGNUP:
          return "Login Instead";
        default:
          return "If I remove this, vetur will give me an error 🤔";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      if (
        this.userAuthInput.email === "" ||
        !this.userAuthInput.email.includes("@") ||
        this.userAuthInput.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      try {
        this.isLoading = true;
        switch (this.mode) {
          case AuthMode.LOGIN:
            await this.$store.dispatch("auth/login", this.userAuthInput);
            break;
          case AuthMode.SIGNUP:
            await this.$store.dispatch("auth/signup", this.userAuthInput);
            break;
        }
        this.$router.replace("/coaches");
      } catch (error) {
        this.errorMessage = error.message || "Could not authenticate you";
      } finally {
        this.isLoading = false;
      }
    },
    switchAuthMode() {
      switch (this.mode) {
        case AuthMode.LOGIN:
          this.mode = AuthMode.SIGNUP;
          break;
        case AuthMode.SIGNUP:
          this.mode = AuthMode.LOGIN;
          break;
      }
    },
    closeErrorDialog() {
      this.errorMessage = null;
    },
  },
});
</script>

<style scoped>
form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>