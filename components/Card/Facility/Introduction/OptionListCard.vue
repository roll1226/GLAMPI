<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="body-2 mb-1">
          オプション一覧
        </div>

        <v-list-item-title class="headline mb-1">
          <v-row dense>
            <v-col
              v-for="(option, cardIndex) in displayLists"
              :key="cardIndex"
              lg="4"
              md="4"
              sm="4"
              xs="6"
            >
              <v-card class="mx-auto" max-width="300">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="option.src"
                >
                  <v-card-title>
                    {{ option.title }}
                  </v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0">
                  金額: {{ option.pay.toLocaleString() }}円
                </v-card-subtitle>

                <v-card-text
                  class="text--primary"
                  v-text="option.texts"
                ></v-card-text>
              </v-card>
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
import { firestore } from '@/plugins/firebase'
import { IOption } from '@/store/facility'

@Component
export default class OptionListCard extends Vue {
  pageSlice: number = 0
  length: number = 0
  page: number = 1

  list: IOption[] = []

  displayLists?: IOption[] = []

  async created() {
    if (window.parent.screen.width <= 420) {
      this.pageSlice = 1
    } else {
      this.pageSlice = 3
    }

    await firestore
      .collection('facilities')
      .where('displayName', '==', this.$route.params.id)
      .get()
      .then((snapshot) => {
        snapshot.forEach(async (doc) => {
          await firestore
            .collection('facilities')
            .doc(doc.id)
            .collection('options')
            .orderBy('pay', 'asc')
            .get()
            .then((optionSnapshot) => {
              optionSnapshot.forEach((optionDoc) => {
                const options = optionDoc.data()
                const title = options.title
                const texts = options.texts
                const src = options.img
                const pay = options.pay
                const displayName = options.displayName

                const optionsList = {
                  title,
                  texts,
                  src,
                  pay,
                  displayName
                }
                console.log(optionsList)
                this.list.push(optionsList)
              })
              this.$store.commit('facility/SET_OPTION', this.list)
              this.slise()
            })
        })
      })
  }

  mounted() {
    this.length = Math.ceil(this.list.length / this.pageSlice)
    this.displayLists = this.list.slice(0, this.pageSlice)
  }

  slise() {
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
