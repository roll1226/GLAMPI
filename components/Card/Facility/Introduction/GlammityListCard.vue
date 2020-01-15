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

interface IGlammity {
  title: string
  text: string
  src: string
}

@Component({
  components: {
    GlammityCard
  }
})
export default class GlammityListCard extends Vue {
  pageSlice: number = 0
  length: number = 0
  page: number = 1

  list: IGlammity[] = [
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
  displayLists?: IGlammity[] = []

  created() {
    if (window.parent.screen.width <= 420) {
      this.pageSlice = 1
    } else {
      this.pageSlice = 3
    }
  }

  mounted() {
    this.length = Math.ceil(this.list.length / this.pageSlice)
    this.displayLists = this.list.slice(0, this.pageSlice)
  }

  pageChange(pageNumber: number) {
    this.displayLists = this.list.slice(
      this.pageSlice * (pageNumber - 1),
      this.pageSlice * pageNumber
    )
  }
}
</script>
