<template>
  <div>
    <v-row class="pa-0 ma-0 mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <!--カード内のpaddingは、v-card-textのクラスで調整
        初期値(今):16px = "pa-4"-->
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
      <v-card class="black--text">
        <v-card-title>不正ユーザ</v-card-title>
        <v-data-table
          :headers="headers"
          :items="username"
          :page.sync="page"
          height="527.3334px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount = $event"
        >
        </v-data-table>
      </v-card>
    </v-row>
    <v-row class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>
    <v-row class="pa-0 ma-0">
      <v-card class="black--text">
        <v-card-title>登録ユーザ</v-card-title>
        <v-data-table
          :headers="headers2"
          :items="username2"
          :page.sync="page2"
          height="527.3334px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount2 = $event"
        >
        </v-data-table>
      </v-card>
    </v-row>
    <v-row class="text-center pt-2">
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
  public users: number = 48132
  public unauthorizedUsers: number = 3
  public tab: number = 0
  public page: number = 1
  public pageCount: number = 0
  public itemsPerPage: number = 10
  public page2: number = 1
  public pageCount2: number = 0
  // public itemsPerPage2: number = 10
  data() {
    return {
      headers: [
        {
          text: 'ユーザ名',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ],
      username: [
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
          text: 'ユーザ名',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ],
      username2: [
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
        },
        {
          name: 'Guest17'
        },
        {
          name: 'Guest18'
        },
        {
          name: 'Guest19'
        },
        {
          name: 'Guest20'
        },
        {
          name: 'Guest21'
        },
        {
          name: 'Guest22'
        },
        {
          name: 'Guest23'
        },
        {
          name: 'Guest24'
        },
        {
          name: 'Guest25'
        },
        {
          name: 'Guest26'
        },
        {
          name: 'Guest27'
        },
        {
          name: 'Guest28'
        },
        {
          name: 'Guest29'
        },
        {
          name: 'Guest30'
        },
        {
          name: 'Guest31'
        },
        {
          name: 'Guest32'
        },
        {
          name: 'Guest33'
        },
        {
          name: 'Guest34'
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
