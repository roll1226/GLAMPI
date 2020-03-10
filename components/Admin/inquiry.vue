<template>
  <div>
    <v-row class="ma-0 pa-0">
      <v-col cols="auto" class="ma-0 pa-0">
        <v-tabs
          class="pa-0 ma-0 tabs"
          background-color="rgb(244,244,244)"
          active-class="font-weight-bold grey lighten-2"
          hide-slider
        >
          <v-tab class="black--text" elevation="0" @click="tab = 0"
            >未送信</v-tab
          >
          <v-tab class="black--text" elevation="0" @click="tab = 1"
            >送信済</v-tab
          >
        </v-tabs>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-card>
        <v-data-table
          v-if="tab == 0"
          class="ma-0 pa-0"
          height="527.5px"
          :headers="headers"
          :items="noSendInquiry"
          :page.sync="page"
          hide-default-footer
          no-data-text="お問い合わせはありません。"
          :loading="loading"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.action="{ item }">
            <div class="text-right">
              <v-btn
                outlined
                small
                class="mr-2"
                @click="openNoSendInquiryDetail(item)"
              >
                詳細
              </v-btn>
            </div>
          </template>
        </v-data-table>

        <v-data-table
          v-else-if="tab == 1"
          class="ma-0 pa-0"
          height="527.5px"
          :headers="headers"
          :items="sendedInquiry"
          :page.sync="page2"
          hide-default-footer
          no-data-text="お問い合わせはありません。"
          :loading="loading"
          @page-count="pageCount2 = $event"
        >
          <template v-slot:item.action="{ item }">
            <div class="text-right">
              <v-btn
                outlined
                small
                class="mr-2"
                @click="openSendedInquiryDetail(item)"
              >
                詳細
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-row v-if="tab == 0" class="text-center px-0 pt-6 pb-0">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>
    <v-row v-else-if="tab == 1" class="text-center px-0 pt-6 pb-0">
      <v-pagination
        v-model="page2"
        :length="pageCount2"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="450">
        <v-card>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ dialogTitle }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ dialogDate }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="pb-2">
            <v-card-text v-text="dialogText"></v-card-text>
          </v-card-text>

          <v-divider class="mx-2 pb-2"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <template v-if="!dialogIsSend">
              <FacilityInquirySendBtn />
            </template>

            <v-btn color="error" outlined @click="closeDetail">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import moment from 'moment'
import { firestore } from '@/plugins/firebase'
import FacilityInquirySendBtn from '@/components/Admin/FacilityInquirySendBtn.vue'

interface IHeader {
  text: string
  value: string
  sortable: boolean | null
}

interface IInquiry {
  date: string
  title: string
  email: string
  text: string
  isSend: boolean
}

@Component({
  components: {
    FacilityInquirySendBtn
  }
})
export default class InquiryFacility extends Vue {
  tab: number = 0
  page: number = 1
  pageCount: number = 0
  page2: number = 1
  pageCount2: number = 0
  itemsPerPage: number = 10

  loading: boolean = false

  dialog: boolean = false
  dialogTitle: string = ''
  dialogText: string = ''
  dialogDate: string = ''
  dialogIsSend: boolean | null = false

  headers: IHeader[] = [
    { text: '日付', value: 'date', sortable: null },
    { text: 'タイトル', value: 'title', sortable: null },
    { text: 'メールアドレス', value: 'email', sortable: null },
    { text: '', value: 'action', sortable: false }
  ]

  noSendInquiry: IInquiry[] = []
  sendedInquiry: IInquiry[] = []

  created() {
    this.loading = true
    this.getSendedInquiry()
    this.getNoSendInquiry()
  }

  async getNoSendInquiry() {
    const facilityFirebase = firestore.collection('facilities')

    const facility = await facilityFirebase
      .where('displayName', '==', this.$route.params.id)
      .get()

    const noSendInquiry = await facilityFirebase
      .doc(facility.docs[0].id)
      .collection('inquiry')
      .where('isSend', '==', false)
      .get()

    for (let index = 0; index < noSendInquiry.size; index++) {
      const list = {
        date: moment(
          noSendInquiry.docs[index].data().createdAt.toDate()
        ).format('YYYY/MM/DD'),
        title: noSendInquiry.docs[index].data().title,
        email: noSendInquiry.docs[index].data().email,
        text: noSendInquiry.docs[index].data().text,
        isSend: noSendInquiry.docs[index].data().isSend
      }

      await this.noSendInquiry.push(list)
    }

    this.loading = false
  }

  async getSendedInquiry() {
    const facilityFirebase = firestore.collection('facilities')

    const facility = await facilityFirebase
      .where('displayName', '==', this.$route.params.id)
      .get()

    const noSendInquiry = await facilityFirebase
      .doc(facility.docs[0].id)
      .collection('inquiry')
      .where('isSend', '==', true)
      .get()

    for (let index = 0; index < noSendInquiry.size; index++) {
      const list = {
        date: moment(
          noSendInquiry.docs[index].data().createdAt.toDate()
        ).format('YYYY/MM/DD'),
        title: noSendInquiry.docs[index].data().title,
        email: noSendInquiry.docs[index].data().email,
        text: noSendInquiry.docs[index].data().text,
        isSend: noSendInquiry.docs[index].data().isSend
      }

      await this.sendedInquiry.push(list)
    }

    this.loading = false
  }

  openNoSendInquiryDetail(inquiry: IInquiry) {
    this.dialog = true
    this.dialogTitle = inquiry.title
    this.dialogText = inquiry.text
    this.dialogDate = inquiry.date
    this.dialogIsSend = inquiry.isSend
  }

  openSendedInquiryDetail(inquiry: IInquiry) {
    this.dialog = true
    this.dialogTitle = inquiry.title
    this.dialogText = inquiry.text
    this.dialogDate = inquiry.date
    this.dialogIsSend = inquiry.isSend
  }

  closeDetail() {
    this.dialog = false
    this.dialogTitle = ''
    this.dialogText = ''
    this.dialogDate = ''
    this.dialogIsSend = null
  }
}
</script>

<style>
.v-data-table-header {
  background-color: #e0e0e0;
}
</style>
