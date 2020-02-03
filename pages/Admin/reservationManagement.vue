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
          <v-card>
            <v-card-title>
              予約一覧
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              hide-default-footer
              :headers="headers"
              :items="desserts"
              :search="search"
            ></v-data-table>
          </v-card>
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
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'ID'
        },
        { text: '人数', value: 'peopleNumber' },
        { text: 'プラン', value: 'plan' },
        { text: 'オプション', value: 'option' },
        { text: '状態', value: 'status' }
      ],
      desserts: [
        {
          id: '1',
          peopleNumber: 159,
          plan: 6.0,
          option: 24,
          status: 4.0
        },
        {
          id: '1',
          peopleNumber: 159,
          plan: 6.0,
          option: 24,
          status: 4.0
        },
        {
          id: '1',
          peopleNumber: 159,
          plan: 6.0,
          option: 24,
          status: 4.0
        },
        {
          id: '1',
          peopleNumber: 159,
          plan: 6.0,
          option: 24,
          status: 4.0
        },
        {
          id: '1',
          peopleNumber: 159,
          plan: 6.0,
          option: 24,
          status: 4.0
        }
      ]
    }
  }
})
export default class FacilityIndex extends Vue {}
</script>
