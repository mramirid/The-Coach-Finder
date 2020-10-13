<template>
  <main>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button v-if="!isFormDisplayed" :to="coachContactLink">
            Contact
          </base-button>
        </header>
        <router-view />
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :type="area"
          :title="area"
        />
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
  </main>
</template>

<script lang="ts">
import Coach from "@/models/Coach";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedCoach: null as Coach | null,
      isFormDisplayed: null as boolean | null,
    };
  },
  created() {
    this.isFormDisplayed = !!this.$route.query.displayForm;
    this.selectedCoach =
      (this.$store.getters["coaches/coaches"] as Coach[]).find((coach) => {
        return coach.id === this.id;
      }) || null;
  },
  computed: {
    fullName(): string {
      return `${this.selectedCoach?.firstName} ${this.selectedCoach?.lastName}`;
    },
    coachContactLink(): string {
      return `${this.$route.path}/contact?displayForm=true`;
    },
  },
  watch: {
    "$route.query.displayForm": function (displayForm: string) {
      this.isFormDisplayed = !!displayForm;
    },
  },
});
</script>