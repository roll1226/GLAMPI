<template>
  <div>
    <h1>会員登録</h1>
    <!-- 姓(sei),名(mei) -->
    <div class="mx-12">
      <seimei></seimei>
      <!-- セイ(seiKana),メイ(meiKana) -->
      <seimeiKana></seimeiKana>
      <!--性別(row)-->
      <row></row>
      <!-- 生年月日(birthValue)-->
      <v-row>
        <v-col cols="12" sm="4">
          <v-overflow-btn
            :items="dropdown"
            v-model="birthValue"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <address1></address1>
    </div>
    <div class="mx-12">
      <email></email>
      <password></password>
      <tel></tel>
      <username></username>
    </div>
    <!-- <v-btn :loading="loading" color="promise" justify="end" @click="regist">
      会員登録
    </v-btn> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import seimei from '@/components/UserRegistration1/seimei.vue'
import seimeiKana from '@/components/UserRegistration1/seimeiKana.vue'
import address1 from '@/components/UserRegistration1/address.vue'
import row from '@/components/UserRegistration1/sex.vue'
import email from '@/components/UserRegistration/email.vue'
import password from '@/components/UserRegistration/password.vue'
import tel from '@/components/UserRegistration/tel.vue'
import username from '@/components/UserRegistration/username.vue'

@Component({
  components: {
    seimei,
    seimeiKana,
    row,
    address1,
    email,
    password,
    tel,
    username
  }
})
export default class UserRegistration extends Vue {
  // async testComment() {
  //   await firestore
  //     .collection('facilities')
  //     .where('displayName', '==', this.$route.params.id)
  //     .get()
  //     .then((snapshot) => {
  //       if (!snapshot.empty) {
  //         snapshot.forEach(async (doc) => {
  //           await firestore
  //             .collection('facilities')
  //             .doc(doc.id)
  //             .collection('comments')
  //             .add({
  //               createdAt: timestamp,
  //               star: this.rating,
  //               text: this.comment,
  //               userId: 'mZ7qYdUy04iiJiM8SvFI'
  //             })
  //             .then(() => {
  //               this.clearComment()
  //             })
  //         })
  //       }
  //     })
  public dropdown: string = ''
  data: {} = {
    dropdown: ['a']
  }
}
</script>
