<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ coach.hourlyRate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in coach.areas"
        :key="area"
        :type="area"
        :title="area"
      />
    </div>
    <div class="actions">
      <base-button mode="outline" :to="coachContactLink">Contact</base-button>
      <base-button :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Coach from "@/models/Coach";

export default defineComponent({
  props: {
    coach: {
      type: Object as PropType<Coach>,
      required: true,
    },
  },
  computed: {
    fullName(): string {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
    coachContactLink(): string {
      return `${this.$route.path}/${this.coach.id}/contact?displayForm=true`;
    },
    coachDetailsLink(): string {
      return `${this.$route.path}/${this.coach.id}`;
    },
  },
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>