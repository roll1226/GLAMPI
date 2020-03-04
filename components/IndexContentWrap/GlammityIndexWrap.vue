<template>
  <div class="top-page-introduction-wrap">
    <v-row no-gutters>
      <v-col>
        <h3 class="top-page-titles">
          G L A M M I T Y
        </h3>
      </v-col>
    </v-row>

    {{ glammitys }}
    <v-row class="top-page-cards">
      <v-col
        v-for="(glammity, cardIndex) in glammitys"
        :key="cardIndex"
        lg="3"
        md="3"
        sm="3"
        xs="6"
      >
        <GlammityCard
          :glammity-image="glammity.src"
          :glammity-name="glammity.title"
          :introduction="glammity.text"
          :url="glammity.url"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammityCard from '@/components/Card/Glammity/GlammityCard.vue'
import { IGlammity } from '@/store'

@Component({
  components: {
    GlammityCard
  }
})
export default class GlammityIndexWrap extends Vue {
  get glammitys(): IGlammity {
    return this.$store.state.getGlammityList
  }
}
</script>
