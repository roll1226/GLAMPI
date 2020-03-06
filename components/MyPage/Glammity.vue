<template>
  <v-row no-gutters class="glammity-wrap">
    <v-col
      v-for="(glammity, cardIndex) in cards"
      :key="cardIndex"
      lg="12"
      md="12"
      sm="12"
      xs="12"
    >
      <MypageGlammityCard
        :glammity-image="glammity.src"
        :glammity-name="glammity.title"
        :introduction="glammity.text"
        :glammity-url="glammity.text"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MypageGlammityCard from '@/components/Card/Mypage/MypageGlammityCard.vue'

interface ICard {
  title: string
  text: string
  src: string
}

@Component({
  components: {
    MypageGlammityCard
  }
})
export default class Glammity extends Vue {
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
