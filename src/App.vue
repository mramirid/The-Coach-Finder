<template>
  <the-header />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

import TheHeader from "./components/layouts/TheHeader.vue";

export default defineComponent({
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch("auth/tryAutoLogin");
  },
  computed: {
    ...mapGetters("auth", {
      didAutoLogout: "didAutoLogout",
    }),
  },
  watch: {
    didAutoLogout(curValue: boolean, oldValue: boolean) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/coaches");
      }
    },
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>