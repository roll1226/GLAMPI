<template>
  <div>
    <v-card max-width="900" class="mx-auto">
      <v-container>
        情報登録
        <v-textarea label="施設紹介" name=""></v-textarea>
        予約プラン
        <v-layout row>
          <v-flex xs4>
            <v-flex xs11>
              <v-file-input
                v-model="file"
                accept="image/*"
                label="File input"
                @change="getFileName"
              ></v-file-input>
              <v-img
                v-show="uploadedImage"
                :src="uploadedImage"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="250"
                max-height="200"
              ></v-img>
              <canvas id="canvas"></canvas>
            </v-flex>
          </v-flex>
          <v-flex xs7>
            <v-text-field label="プランタイトル" single-line></v-text-field>
            <v-text-field label="サブタイトル" single-line></v-text-field>
            <v-text-field label="値段" single-line></v-text-field>
          </v-flex>
        </v-layout>
        スライド画像
        <v-file-input
          v-model="file"
          accept="image/*"
          label="File input"
          @change="getFileName"
        ></v-file-input>
        <v-img
          v-show="uploadedImage"
          :src="uploadedImage"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="250"
          max-height="200"
        ></v-img>
        <canvas id="canvas"></canvas>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { storage } from '@/plugins/firebase'
import ReservationPlan from '@/components/Admin/ReservationPlan.vue'

// interface imageType {
//   file: string
//   name: string
//   type: string
// }

@Component({
  components: {
    ReservationPlan
  }
})
export default class reservationInfoEdit extends Vue {
  // test?: string = ''
  // file?: object[] = []
  // uploadedImage: string =
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5s_Eb1IVAun_V4M-QW_6VrE5xYSSluHdb-F5Hp4Qv5FgeEZee&s'
  // getFileName(e: any) {
  //   this.createImage(this.file)
  //   storage
  //     .ref()
  //     .child(`images/${e.name}`)
  //     .put(e)
  //     .then(() => {
  //       console.log('Uploaded a blob or file!')
  //     })
  //     .catch((e: any) => {
  //       console.log(e)
  //     })
  //   this.test = e
  // }
  // createImage(file: any) {
  //   const reader = new FileReader()
  //   reader.onload = (e: any) => {
  //     this.uploadedImage = e.target.result
  //   }
  //   reader.readAsDataURL(file)
  // }
}
</script>
