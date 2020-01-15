<template>
  <div>
    <h1>GLAMMITY作成ページ</h1>
    <glammityName></glammityName>
    <sisetuName></sisetuName>
    <plan></plan>
    <people></people>
    <schedule></schedule>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import glammityName from '@/components/createGlammity/glammityName.vue'
import sisetuName from '@/components/createGlammity/sisetuName.vue'
import plan from '@/components/createGlammity/plan.vue'
import people from '@/components/createGlammity/people.vue'
import schedule from '@/components/createGlammity/schedule.vue'

@Component({
  components: {
    glammityName,
    sisetuName,
    plan,
    people,
    schedule
  }
})
export default class template extends Vue {}
</script>
