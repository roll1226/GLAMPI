<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="body-2 mb-1">
          GLAMMITY一覧
        </div>

        <v-list-item-title class="headline mb-1">
          <v-row dense>
            <v-col
              v-for="(glammity, cardIndex) in displayLists"
              :key="cardIndex"
              lg="4"
              md="4"
              sm="4"
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
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="length"
              @input="pageChange"
            ></v-pagination>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammityCard from '@/components/Card/Glammity/GlammityCard.vue'
import { IGlammity } from '@/store/facilityGlammity'

@Component({
  components: {
    GlammityCard
  }
})
export default class GlammityListCard extends Vue {
  get pageSlice(): number {
    return this.$store.state.facilityGlammity.pageSlice
  }

  get length(): number {
    return this.$store.state.facilityGlammity.length
  }

  get page(): number {
    return this.$store.state.facilityGlammity.page
  }

  get displayLists(): IGlammity[] {
    return this.$store.state.facilityGlammity.displayLists
  }

  created() {
    this.$store.commit(
      'facilityGlammity/SET_PAGE_SLICE',
      window.parent.screen.width
    )
    this.$store.dispatch('facilityGlammity/getFaclity', this.$route.params.id)
  }

  pageChange(pageNumber: number) {
    this.$store.commit('facilityGlammity/CHANGE_PAGE', pageNumber)
  }
}
</script>
