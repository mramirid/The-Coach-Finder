<template>
  <section>FILTER</section>

  <base-card>
    <div class="controls">
      <base-button mode="outline">Refresh</base-button>
      <base-button to="/register">Register as Coach</base-button>
    </div>
    <ul v-if="hasCoaches">
      <coach-item v-for="coach in coaches" :key="coach.id" :coach="coach" />
    </ul>
    <h3 v-else>No coaches found</h3>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import CoachItem from "@/components/coaches/CoachItem.vue";

export default defineComponent({
  components: {
    CoachItem,
  },
  computed: {
    ...mapGetters("coaches", ["coaches", "hasCoaches"]),
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>