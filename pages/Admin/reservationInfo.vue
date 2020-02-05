<template>
  <div>
    <v-row>
      <v-col cols="2" class="ml-6">
        <v-tabs optional="true" vertical="true">
          <!--optional:アクティブなアイテムなし
          初期状態では選択なし-->
          <v-tab>予約一覧</v-tab>
          <v-tab>収益</v-tab>
          <v-tab>情報登録</v-tab>
          <v-tab>お問い合わせ</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-row cols="2" class="">
          <v-cord>
            <v-cord-title>
              予約一覧/ID
              <v-space></v-space>
            </v-cord-title>
            <v-simple-table style="width: 500px;">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">お客様名</th>
                    <th class="text-left"><v-btn small>予約取り消し</v-btn></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.title }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-cord>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  data() {
    return {
      desserts: [
        {
          name: '予約日',
          title: '2019年1月1日'
        },
        {
          name: '状態',
          title: '宿泊前'
        },
        {
          name: 'checkin',
          title: '2019年1月20日'
        },
        {
          name: 'checkout',
          title: '2019年1月25日'
        },
        {
          name: 'プラン',
          title: 'Aプラン'
        },
        {
          name: 'オプション',
          title: 'BBQ'
        },
        {
          name: '人数',
          title: '5名様'
        },
        {
          name: 'キャンセル料',
          title: '0円'
        },
        {
          name: '連絡先',
          title: '080-1234-3345,'
        },
        {
          name: '支払い方法',
          title: 'クレジット'
        }
      ]
    }
  }
})
export default class FacilityIndex extends Vue {}
</script>
