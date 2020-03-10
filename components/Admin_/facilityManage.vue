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
            <div class="mr-n4">
              <v-col cols="auto" class="mr-n12">
                <v-btn elevation="1" small class="mr-n12">
                  プレビュー
                </v-btn>
              </v-col>
            </div>
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
          height="576.5px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount2 = $event"
        >
          <template v-slot:item.preview>
            <div class="mr-n4">
              <v-col cols="auto" class="mr-n12">
                <v-btn elevation="1" small class="mr-n12">
                  プレビュー
                </v-btn>
              </v-col>
            </div>
          </template>
          <template v-slot:item.regist>
            <div>
              <v-col cols="auto" class="mx-n12">
                <v-btn elevation="1" small class="mr-n12">
                  登録
                </v-btn>
              </v-col>
            </div>
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
import { IFacility } from '@/store/adminFacility'

interface IHeader {
  text: string
  value: string
  sortable: boolean | null
}

@Component
export default class UserManageAdmin extends Vue {
  public facility: number = this.$store.state.adminFacility.facilities.length
  public registFacility: number = 3
  public tab: number = 0
  public page: number = 1
  public pageCount: number = 0
  public page2: number = 1
  public pageCount2: number = 0
  public itemsPerPage: number = 10
  data() {
    return {
      headers2: [
        {
          text: '施設名',
          value: 'facility',
          sortable: false
        },
        { text: '', value: 'preview', sortable: false },
        { text: '', value: 'regist', sortable: false }
      ],
      facilities2: [
        {
          facility: '野々山温泉'
        },
        {
          facility: '札幌ビール'
        },
        {
          facility: 'サーターアンダギー'
        }
      ]
    }
  }
  headers: IHeader[] = [
    { text: '施設名', value: 'facility', sortable: null },
    { text: '', value: 'preview', sortable: false }
  ]

  get facilities(): IFacility[] {
    return this.$store.state.adminFacility.facilities
  }
  created() {
    // const url = this.$route.params.id
    // console.log(url)
    this.$store.commit('adminFacility/CLEAR_INFO')
    this.$store.dispatch('adminFacility/getFacilities')
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
