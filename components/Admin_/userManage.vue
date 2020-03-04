<template>
  <div>
    <v-row class="pa-0 ma-0 mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <v-card-text class="black--text">
          <v-row class="ma-0" justify="space-around">
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                登録者数<br /><span>{{ users }}件</span>
              </p>
            </v-col>
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                不正ユーザ数<br /><span>{{ unauthorizedUsers }}件</span>
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-card elevation="0" class="black--text">
        <v-card-title>登録ユーザ</v-card-title>
        <v-data-table
          :headers="headers"
          :items="username"
          :page.sync="page"
          height="576.5px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.action>
            <div>
              <v-col cols="auto" class="mx-n12">
                <v-btn elevation="1" small class=" mr-n12">
                  詳細
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
        <v-card-title>不正ユーザ</v-card-title>
        <v-data-table
          :headers="headers2"
          :items="username2"
          :page.sync="page2"
          height="576.5px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount2 = $event"
        >
          <template v-slot:item.action>
            <div>
              <v-col cols="auto" class="mx-n12">
                <v-btn elevation="1" small class=" mr-n12">
                  詳細
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
import { IUser } from '@/store/adminUser'

interface IHeader {
  text: string
  value: string
  sortable: boolean | null
}

@Component
export default class UserManageAdmin extends Vue {
  public users: number = 48132
  public unauthorizedUsers: number = 12
  public tab: number = 0
  public page: number = 1
  public pageCount: number = 0
  public page2: number = 1
  public pageCount2: number = 0
  public itemsPerPage: number = 10
  data() {
    return {
      headers2: [
        { text: 'ユーザ名', value: 'name', sortable: false },
        { text: '', value: 'action', sortable: false }
      ],
      username2: [
        {
          name: 'Guest4'
        }
      ]
    }
  }

  headers: IHeader[] = [
    { text: 'ユーザ名', value: 'user', sortable: null },
    { text: '', value: 'action', sortable: false }
  ]

  get username(): IUser[] {
    return this.$store.state.adminUser.users
  }
  created() {
    // const url = this.$route.params.id
    // console.log(url)
    this.$store.commit('adminUser/CLEAR_INFO')
    this.$store.dispatch('adminUser/getUsers')
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
