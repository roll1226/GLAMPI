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
import GlammityName from '@/components/CreateGlammity/GlammityName.vue'
import FacilityName from '@/components/CreateGlammity/FacilityName.vue'
import Plan from '@/components/CreateGlammity/Plan.vue'
import GuestNumber from '@/components/CreateGlammity/GuestNumber.vue'
import Schedule from '@/components/CreateGlammity/Schedule.vue'
import GlammityOption from '@/components/CreateGlammity/GlammityOption.vue'
import Recruitment from '@/components/CreateGlammity/Recruitment.vue'
import CommentGlammityCreate from '@/components/CreateGlammity/Comment.vue'
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
