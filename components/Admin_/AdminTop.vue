<template>
  <div>
    <v-row class="pa-0 ma-0 mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <v-card-text class="black--text">
          <v-row class="ma-0" justify="space-around">
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                施設登録申請数<br /><span>{{ reservation }}件</span>
              </p>
            </v-col>
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                不正ユーザ申請中<br /><span>{{ cancel }}件</span>
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-card elevation="0" class="black--text">
        <v-card-title>登録申請施設</v-card-title>
        <v-data-table
          :headers="headers"
          :items="facilityName"
          :page.sync="page"
          height="527.5px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.preview>
            <v-btn small class="mr-2">
              プレビュー
            </v-btn>
          </template>
          <template v-slot:item.action>
            <v-btn small class="mr-2">
              詳細
            </v-btn>
          </template></v-data-table
        >
      </v-card>
    </v-row>
    <v-row class="text-center px-0 pt-6 pb-0">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminTop extends Vue {
  public reservation: number = 5
  public cancel: number = 4
  public tab: number = 0
  public page: number = 1
  public pageCount: number = 0
  public itemsPerPage: number = 10
  data() {
    return {
      headers: [
        {
          text: '施設名',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '', value: 'preview', sortable: false },
        { text: '', value: 'action', sortable: false }
      ],
      facilityName: [
        {
          name: 'Guest1'
        },
        {
          name: 'Guest2'
        },
        {
          name: 'Guest3'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.v-card {
  width: 100%;
}

p span {
  display: inline-block;
  padding-top: 10px;
  font-size: 1.7em;
}
</style>
