<template>
  <div
    class="panel-block"
    data-test="post"
  >
    <div>
        <a href="#" data-test="title">
            {{ post.title }}
        </a>
        <div data-test="post-data">
            {{ post.created.format('do MMM') }}
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Post } from './types'

export default defineComponent({
  name: 'TimelinePost',

  props: {
    post: {
      type: Object as () => Post,
      required: true
    },
  },
})
</script>