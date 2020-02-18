<template>
  <div>
    <v-row>
      <v-col lg="3" md="3" sm="3" xs="12">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                glammity検索
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        <GlammitySearchedCard />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammitySearchedCard from '@/components/Card/Glammity/GlammitySearchedCard.vue'

@Component({
  components: {
    GlammitySearchedCard
  }
})
export default class glammityIndex extends Vue {
  created() {
    this.$store.dispatch('glammitySearched/getGlammitys')
  }
}
</script>
