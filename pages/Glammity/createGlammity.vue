<template>
  <div>
    <h1>GLAMMITY作成ページ</h1>
    <div class="mx-12">
      <GlammityName />
      <FacilityName />
      <Plan />
      <GlammityOption />
      <GuestNumber />
      <Schedule />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammityName from '@/components/CreateGlammity/GlammityName.vue'
import FacilityName from '@/components/CreateGlammity/FacilityName.vue'
import Plan from '@/components/CreateGlammity/Plan.vue'
import GuestNumber from '@/components/CreateGlammity/GuestNumber.vue'
import Schedule from '@/components/CreateGlammity/Schedule.vue'
import GlammityOption from '@/components/CreateGlammity/GlammityOption.vue'

@Component({
  components: {
    GlammityName,
    FacilityName,
    Plan,
    GuestNumber,
    Schedule,
    GlammityOption
  }
})
export default class CreateGlammity extends Vue {}
</script>
