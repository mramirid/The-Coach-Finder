<template>
  <base-dialog
    :show="!!errorMessage"
    title="An error occurred!"
    @close="closeErrorDialog"
  >
    <p>{{ errorMessage }}</p>
  </base-dialog>

  <coach-filter @change-filter="setFilters" />

  <base-card>
    <div class="controls">
      <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
      <base-button v-if="!isCoach && !isLoading" to="/register">
        Register as Coach
      </base-button>
    </div>

    <div v-if="isLoading">
      <base-spinner />
    </div>
    <ul v-else-if="hasCoaches">
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :coach="coach"
      />
    </ul>
    <h3 v-else>No coaches found</h3>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter, { Filters } from "@/components/coaches/CoachFilter.vue";
import Coach from "@/models/Coach";

export default defineComponent({
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null as string | null,
      filters: {
        frontend: true,
        backend: true,
        career: true,
      } as Filters,
    };
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters: Filters) {
      this.filters = updatedFilters;
    },
    async loadCoaches() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("coaches/loadCoaches");
      } catch (error) {
        this.errorMessage = error.message || "Something went wrong!";
      } finally {
        this.isLoading = false;
      }
    },
    closeErrorDialog() {
      this.errorMessage = null;
    },
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"] as Coach[];
      return coaches.filter((coach) => {
        if (this.filters.frontend && coach.areas.includes("frontend")) {
          return true;
        } else if (this.filters.backend && coach.areas.includes("backend")) {
          return true;
        } else if (this.filters.career && coach.areas.includes("career")) {
          return true;
        } else {
          return false;
        }
      });
    },
    ...mapGetters("coaches", ["isCoach", "hasCoaches"]),
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