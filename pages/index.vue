<template>
  <div>
    <v-img
      src="https://firebasestorage.googleapis.com/v0/b/j4k1-b789f.appspot.com/o/glampy%2Ftop.jpg?alt=media&token=01d75370-7f04-4932-b3dd-c9d286798a01"
      aspect-ratio="1"
      class="grey lighten-2"
      max-height="540"
      style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center;"
      gradient="rgba(255,255,255,.4), rgba(255,255,255,.4)"
    >
      <SearchInput
    /></v-img>

    <div class="top-page-introduction-wrap">
      <v-row>
        <v-col>
          <h3 class="ml-10 top-page-glammity-title headline font-weight-bold">
            GLAMMITY
          </h3>
        </v-col>
      </v-row>
      <v-row class="top-page-introduction-lists">
        <v-col
          v-for="(glammity, cardIndex) in cards"
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
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/Logo.vue'
import SearchInput from '@/components/Input/Search/SearchInput.vue'
import GlammityCard from '@/components/Card/Glammity/GlammityCard.vue'

interface IGlammity {
  title: string
  text: string
  src: string
}

@Component({
  components: {
    Logo,
    SearchInput,
    GlammityCard
  }
})
export default class IndexPage extends Vue {
  cards: IGlammity[] = [
    {
      title: 'GLAMMITY1',
      text: '凄い',
      src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
    },
    {
      title: 'GLAMMITY2',
      text: 'やばい',
      src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
    },
    {
      title: 'GLAMMITY3',
      text: '博俊',
      src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
    },
    {
      title: 'GLAMMITY4',
      text: '優人',
      src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
    }
  ]
}
</script>

<style lang="scss">
.top-page-glammity-title {
  color: $site_color_2;
}
.top-page-introduction-wrap {
  margin-top: 18px;
  .top-page-introduction-lists {
    margin-left: 65px;
    margin-right: 65px;
  }
}
</style>
