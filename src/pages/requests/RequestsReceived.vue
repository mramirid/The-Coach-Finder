<template>
  <base-card>
    <header>
      <h2>Requests Received</h2>
    </header>
    <ul v-if="hasRequests">
      <request-item
        v-for="request in receivedRequests"
        :key="request.id"
        :request="request"
      />
    </ul>
    <h3 v-else>You haven't received any requests yet!</h3>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import RequestItem from "@/components/requests/RequestItem.vue";

export default defineComponent({
  components: {
    RequestItem,
  },
  computed: {
    ...mapGetters("requests", {
      receivedRequests: "requests",
      hasRequests: "hasRequests",
    }),
  },
});
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>