<template>
  <div class="mt-10 pt-3">
    <v-card width="700" class="mx-auto">
      <v-card-title class="flex-column pt-6">
        <h2 class="text-center" style="color: rgb(87, 95, 69);">
          お問い合わせ
        </h2>

        <v-divider
          width="600"
          class="mt-3 mb-4 mx-auto"
          color="rgb(87, 95, 69)"
        ></v-divider>
      </v-card-title>

      <v-card-text class="pb-0">
        <v-text-field
          v-model="title"
          label="お問い合わせタイトル"
          color="rgb(87, 95, 69)"
        ></v-text-field>

        <v-text-field
          v-model="email"
          prepend-inner-icon="far fa-envelope"
          label="メールアドレス"
          color="rgb(87, 95, 69)"
        ></v-text-field>

        <v-overflow-btn
          v-model="facilityValue"
          class="my-2"
          color="rgb(87, 95, 69)"
          :items="facilityList"
          label="施設選択"
          prepend-icon="fas fa-campground"
          target="#dropdown-example-1"
          no-data-text="選択出来る施設はありません。"
        ></v-overflow-btn>

        <v-textarea
          v-model="text"
          label="質問内容"
          color="rgb(87, 95, 69)"
        ></v-textarea>

        <v-card-actions class="pb-3">
          <v-spacer></v-spacer>

          <v-btn
            outlined
            color="rgb(87, 95, 69)"
            :disabled="!isSet"
            @click="sendDialog"
          >
            送信
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>

    <div justify="center">
      <v-dialog v-model="dialog" :persistent="laoding" max-width="450">
        <v-card :loading="laoding">
          <v-card-title class="headline">
            この内容でお問い合わせしますか？
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text color="green lighten-2" @click="send">
              する
            </v-btn>

            <v-btn color="error" text @click="dialog = false">
              入力し直す
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-snackbar v-model="snackbar" color="success">
      お問い合わせを送信しました
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { firestore, timestamp } from '@/plugins/firebase'

interface IFacilityList {
  text: string
  value: string
}

@Component
export default class Support extends Vue {
  facilityList: IFacilityList[] = []
  facilityValue: string = ''
  title: string = ''
  email: string = ''
  text: string = ''
  dialog: boolean = false
  laoding: boolean = false
  snackbar: boolean = false

  get isSet(): string {
    return this.facilityValue && this.title && this.email && this.text
  }

  async created() {
    const facilityList = await firestore.collection('facilities').get()

    for (let index = 0; index < facilityList.size; index++) {
      const list = {
        text: facilityList.docs[index].data().name,
        value: facilityList.docs[index].id
      }

      this.facilityList.push(list)
    }
  }

  sendDialog() {
    this.dialog = true
  }

  async send() {
    this.laoding = true
    await firestore
      .collection('facilities')
      .doc(this.facilityValue)
      .collection('inquiry')
      .add({
        createdAt: timestamp,
        email: this.email,
        isSend: false,
        text: this.text,
        title: this.title
      })
      .then(() => {
        this.facilityValue = ''
        this.title = ''
        this.email = ''
        this.text = ''
      })

    this.dialog = false
    this.laoding = false
    this.snackbar = true
  }
}
</script>
