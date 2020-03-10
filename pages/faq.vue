<template>
  <div class="mt-10 pt-3">
    <v-card width="1200" class="mx-auto">
      <v-card-title class="flex-column pt-6">
        <h2 class="text-center" style="color: rgb(87, 95, 69);">
          よくある質問
        </h2>

        <v-divider
          width="600"
          class="mt-3 mb-4 mx-auto"
          color="rgb(87, 95, 69)"
        ></v-divider>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            v-for="(faq, index) in faqList"
            :key="index"
            lg="4"
            md="4"
            sm="12"
          >
            <v-card outlined>
              <v-card-title>
                {{ faq.title }}
              </v-card-title>

              <v-divider class="mx-3"></v-divider>

              <v-card-text>
                {{ faq.text }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface IFaqList {
  title: string
  text: string
}

@Component
export default class Faq extends Vue {
  faqList: IFaqList[] = [
    {
      title: '質問1',
      text: 'hogehogehoge'
    },
    {
      title: '質問2',
      text: 'hogehogehoge'
    },
    {
      title: '質問3',
      text: 'hogehogehoge'
    },
    {
      title: '質問4',
      text: 'hogehogehoge'
    },
    {
      title: '質問5',
      text: 'hogehogehoge'
    },
    {
      title: '質問6',
      text: 'hogehogehoge'
    },
    {
      title: '質問7',
      text: 'hogehogehoge'
    },
    {
      title: '質問8',
      text: 'hogehogehoge'
    },
    {
      title: '質問9',
      text: 'hogehogehoge'
    },
    {
      title: '質問10',
      text: 'hogehogehoge'
    },
    {
      title: '質問11',
      text: 'hogehogehoge'
    },
    {
      title: '質問12',
      text: 'hogehogehoge'
    },
    {
      title: '質問13',
      text: 'hogehogehoge'
    },
    {
      title: '質問14',
      text: 'hogehogehoge'
    },
    {
      title: '質問15',
      text: 'hogehogehoge'
    },
    {
      title: '質問16',
      text: 'hogehogehoge'
    },
    {
      title: '質問17',
      text: 'hogehogehoge'
    },
    {
      title: '質問18',
      text: 'hogehogehoge'
    }
  ]
}
</script>
