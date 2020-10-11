<template>
  <base-card>
    <h2>Register</h2>
    <coach-form @save-data="saveData" />
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CoachForm from "@/components/coaches/CoachForm.vue";
import Coach from "@/models/Coach";

export default defineComponent({
  components: {
    CoachForm,
  },
  methods: {
    saveData(newCoach: Coach) {
      this.$store.dispatch("coaches/registerCoach", newCoach);
      this.$router.replace("/coaches");
    },
  },
});
</script>