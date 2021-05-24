<template>
  <Suspense>
    <template #default>
      <TimeLine />
    </template>
    <template #fallback>
      <div class="columns">
        <div class="column is-one-third" />
        <div class="column is-one-third">
            <Progress />
        </div>
        <div class="column is-one-third" />
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeLine from './Timeline.vue';
import Progress from './Progress.vue';

export default defineComponent({
  name: 'Home',

  components: {
    TimeLine,
    Progress
  }
})
</script>