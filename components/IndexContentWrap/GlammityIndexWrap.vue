<template>
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
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammityCard from '@/components/Card/Glammity/GlammityCard.vue'

interface ICard {
  title: string
  text: string
  src: string
}

@Component({
  components: {
    GlammityCard
  }
})
export default class GlammityIndexWrap extends Vue {
  cards: ICard[] = [
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
