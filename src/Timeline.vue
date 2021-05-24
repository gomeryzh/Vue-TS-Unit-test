<template>
    <nav class="is-primary panel">
        <p class="panel-tabs">
            <a
                :class="[{'is-active': selectedPeriod === period}]"
                href="#"
                v-for="period in periods"
                :key="period"
                @click="setPeriod(period)"
                data-test="period"
            >

                {{ period }}
            </a>
        </p>
        <TimelinePost v-for="post in posts" :key="post.id" :post="post"/>
    </nav>
</template>

<script lang="ts">
  import { defineComponent, ref, computed  } from 'vue';
  import { Period, Post } from './types'
  import { useStore } from './store'
  import moment from 'moment';
  import TimelinePost from './TimelinePost.vue'

  export default defineComponent({
    name: 'Timeline',

    components: {
        TimelinePost
    },

    async setup() {
      const periods: Period[] = ['today', 'this week', 'this month'];
      const selectedPeriod = ref<Period>('today');
      const setPeriod = (period: Period) => {
          selectedPeriod.value = period;
      };
      const store = useStore();

      if(!store.getState().posts.loaded) {
          await store.getPosts();
      }

      const allPosts = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
        const post = store.getState().posts.all[id];
        return acc.concat(post)
      }, []);

      const posts = computed(() => allPosts.filter(post => {
                if (
                    selectedPeriod.value === 'today' &&
                    post.created.isAfter(moment().subtract(1, 'day'))
                ) {
                    return true
                }
                if (
                    selectedPeriod.value === 'this week' &&
                    post.created.isAfter(moment().subtract(1, 'week'))
                ) {
                    return true
                }
                if (
                    selectedPeriod.value === 'this month' &&
                    post.created.isAfter(moment().subtract(1, 'month'))
                ) {
                    return true
                }
                return false
            })
        );

      return {
          periods,
          selectedPeriod,
          setPeriod,
          posts
      }
    },
  })
</script>