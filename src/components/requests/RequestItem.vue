<template>
  <li>
    <div>
      <a :href="emailLink">{{ request.email }}</a>
    </div>
    <p>{{ request.message }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import Request from "@/models/Request";

export default defineComponent({
  props: {
    request: {
      type: Object as PropType<Request>,
      required: true,
    },
  },
  computed: {
    emailLink(): string {
      return `mailto:${this.request.email}`;
    },
  },
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>