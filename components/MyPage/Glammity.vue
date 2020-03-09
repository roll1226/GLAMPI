<template>
  <v-row no-gutters class="glammity-wrap">
    <v-col
      v-for="(glammity, glammityIndex) in glammityList"
      :key="glammityIndex"
      lg="12"
      md="12"
      sm="12"
      xs="12"
    >
      <MypageGlammityCard
        :glammity-name="glammity.glammityName"
        :glammity-img="glammity.glammityImg"
        :introduction="glammity.introduction"
        :status="glammity.status"
        :url="glammity.url"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MypageGlammityCard from '@/components/Card/Mypage/MypageGlammityCard.vue'
import { IGlammity } from '@/store/mypage'

@Component({
  components: {
    MypageGlammityCard
  }
})
export default class Glammity extends Vue {
  get glammityList(): IGlammity[] {
    return this.$store.state.mypage.glammity
  }
}
</script>
