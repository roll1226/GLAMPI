<template>
  <div>
    <v-row class="pa-0 ma-0 mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <v-card-text class="black--text">
          <v-row class="ma-0" justify="space-around">
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                施設登録数<br /><span>{{ facility }}件</span>
              </p>
            </v-col>
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                施設登録申請数<br /><span>{{ registFacility }}件</span>
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-card elevation="0" class="black--text">
        <v-card-title>登録済み施設</v-card-title>
        <v-data-table
          :headers="headers"
          :items="facilities"
          :page.sync="page"
          height="527.5px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.preview>
            <v-btn elevation="1" small class="mr-2">
              プレビュー
            </v-btn>
          </template></v-data-table
        >
      </v-card>
    </v-row>
    <v-row class="text-center px-0 pt-6 pb-4">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>
    <v-row class="px-0 pt-4 pb-0">
      <v-card elevation="0" class="black--text">
        <v-card-title>申請中施設</v-card-title>
        <v-data-table
          :headers="headers2"
          :items="facilities2"
          :page.sync="page2"
          height="527.5px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount2 = $event"
        >
          <template v-slot:item.preview>
            <v-btn elevation="1" small class="mr-2">
              プレビュー
            </v-btn>
          </template>
          <template v-slot:item.regist>
            <v-btn elevation="1" small class="mr-2">
              登録
            </v-btn>
          </template></v-data-table
        >
      </v-card>
    </v-row>
    <v-row class="text-center px-0 pt-6 pb-0">
      <v-pagination
        v-model="page2"
        :length="pageCount2"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class UserManageAdmin extends Vue {
  public facility: number = 3
  public registFacility: number = 13
  public tab: number = 0
  public page: number = 1
  public pageCount: number = 0
  public page2: number = 1
  public pageCount2: number = 0
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
        { text: '', value: 'preview', sortable: false }
      ],
      facilities: [
        {
          name: 'Guest1'
        },
        {
          name: 'Guest2'
        },
        {
          name: 'Guest3'
        }
      ],
      headers2: [
        {
          text: '施設名',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '', value: 'preview', sortable: false },
        { text: '', value: 'regist', sortable: false }
      ],
      facilities2: [
        {
          name: 'Guest4'
        },
        {
          name: 'Guest5'
        },
        {
          name: 'Guest6'
        },
        {
          name: 'Guest7'
        },
        {
          name: 'Guest8'
        },
        {
          name: 'Guest9'
        },
        {
          name: 'Guest10'
        },
        {
          name: 'Guest11'
        },
        {
          name: 'Guest12'
        },
        {
          name: 'Guest13'
        },
        {
          name: 'Guest14'
        },
        {
          name: 'Guest15'
        },
        {
          name: 'Guest16'
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
