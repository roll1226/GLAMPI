<template>
  <v-expansion-panels accordion>
    <v-expansion-panel
      v-for="(prefecture, prefecturesIndex) in prefectures"
      :key="prefecturesIndex"
    >
      <v-expansion-panel-header expand-icon="mdi-menu-down">
        {{ prefecture.prefectures }}
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-card-actions
          v-for="(prefectureName, prefectureIndex) in prefecture.prefecture"
          :key="prefectureIndex"
          @click="searchTag(prefectureName)"
        >
          <v-btn text block>
            {{ prefectureName }}
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

export interface IPrefectures {
  prefectures: string
  prefecture: [...string[]]
}

@Component
export default class SearchedSideNavigation extends Vue {
  prefectures: IPrefectures[] = [
    {
      prefectures: '都道府県で絞る',
      prefecture: [
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県'
      ]
    }
  ]

  searchTag(prefecture: string) {
    console.log(prefecture)
    this.$router.push(
      `/searched?facilityKeyWord=&prefectures=${prefecture}&tag=`
    )
  }
}
</script>

<style lang="scss">
.v-expansion-panel-content {
  height: auto;
  max-height: 300px;
  overflow-x: hidden;
}
</style>
