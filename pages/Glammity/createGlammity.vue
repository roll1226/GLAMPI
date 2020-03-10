<template>
  <div class="mb-3">
    <h1>GLAMMITY作成ページ</h1>
    <div class="mx-12">
      <GlammityName />
      <FacilityName />
      <Plan />
      <GlammityOption />
      <GuestNumber />
      <Recruitment />
      <Schedule />
      <CommentGlammityCreate />

      <CreateBtn />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammityName from '@/components/createGlammity/glammityName.vue'
import FacilityName from '@/components/createGlammity/facilityName.vue'
import Plan from '@/components/createGlammity/plan.vue'
import GuestNumber from '@/components/createGlammity/GuestNumber.vue'
import Schedule from '@/components/createGlammity/schedule.vue'
import GlammityOption from '@/components/createGlammity/GlammityOption.vue'
import Recruitment from '@/components/createGlammity/Recruitment.vue'
import CommentGlammityCreate from '@/components/createGlammity/Comment.vue'
import CreateBtn from '@/components/Btn/Glammity/Create/CreateBtn.vue'

@Component({
  components: {
    GlammityName,
    FacilityName,
    Plan,
    GuestNumber,
    Schedule,
    GlammityOption,
    Recruitment,
    CommentGlammityCreate,
    CreateBtn
  }
})
export default class CreateGlammity extends Vue {
  created() {
    this.$store.commit('search/RESET_FACILITY_QUERY')
  }
}
</script>
