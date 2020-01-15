<template>
  <div>
    <h1>GLAMMITY作成ページ</h1>
    <div class="mx-12">
      <glammityName></glammityName>
      <facilityName></facilityName>
      <plan></plan>
      <people></people>
      <schedule></schedule>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import glammityName from '@/components/createGlammity/glammityName.vue'
import facilityName from '@/components/createGlammity/facilityName.vue'
import plan from '@/components/createGlammity/plan.vue'
import people from '@/components/createGlammity/people.vue'
import schedule from '@/components/createGlammity/schedule.vue'

@Component({
  components: {
    glammityName,
    facilityName,
    plan,
    people,
    schedule
  }
})
export default class CreateGlammity extends Vue {}
</script>
