<template>
  <div>
    <v-card max-width="900" class="mx-auto">
      <v-container>
        情報登録
        <v-textarea label="施設紹介"></v-textarea>
        予約プラン
        <v-row>
          <v-col sm="4" class="px-5">
            <v-file-input
              v-if="file == 1"
              style="display: none"
              type="file"
              accept="image/*"
              @change="getFileName"
            ></v-file-input>
            <v-btn icon text @click="btnclick">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-img
              v-show="uploadedImage"
              :src="uploadedImage"
              aspect-ratio="1"
              class="grey lighten-2"
              max-width="250"
              max-height="200"
            ></v-img>
            <canvas id="canvas"></canvas>
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden" icon @click="click()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file1"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden1" icon text @click="click1()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add1 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file2"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden2" icon text @click="click2()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add2 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file3"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden3" icon text @click="click3()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add3 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file4"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden4" icon text @click="click4()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add4 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file5"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden5" icon text @click="click5()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add5 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file6"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden6" icon text @click="click6()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add6 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file7"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden7" icon text @click="click7()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add7 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file8"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden8" icon text @click="click8()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add8 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file9"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden9" icon text @click="click9()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <v-row v-if="add9 == 1" class="mt-n12 pt-0">
          <v-col sm="4" class="px-5">
            <v-file-input
              v-model="file10"
              accept="image/*"
              :src="uploadedImage"
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
          </v-col>
          <v-row>
            <v-col sm="11" class="mx-5">
              <v-text-field label="プランタイトル" single-line></v-text-field>
              <v-text-field label="サブタイトル" single-line></v-text-field>
              <v-text-field label="値段" single-line></v-text-field>
              <v-btn v-show="!hidden10" icon text @click="click10()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
        <div id="app"></div>
      </v-container>
      <v-container>
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
import { storage } from '@/plugins/firebase'
import ReservationPlan from '@/components/Admin/ReservationPlan.vue'
interface imageType {
  file: string
  name: string
  type: string
}
@Component({
  components: {
    ReservationPlan
  }
})
export default class reservationInfoEdit extends Vue {
  public add: number = 0
  public add1: number = 0
  public add2: number = 0
  public add3: number = 0
  public add4: number = 0
  public add5: number = 0
  public add6: number = 0
  public add7: number = 0
  public add8: number = 0
  public add9: number = 0
  public add10: number = 0
  hidden = false
  hidden1 = false
  hidden2 = false
  hidden3 = false
  hidden4 = false
  hidden5 = false
  hidden6 = false
  hidden7 = false
  hidden8 = false
  hidden9 = false
  test?: string = ''
  file?: object[] = []
  uploadedImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5s_Eb1IVAun_V4M-QW_6VrE5xYSSluHdb-F5Hp4Qv5FgeEZee&s'
  click() {
    this.add = 1
    this.hidden = !this.hidden
  }
  click1() {
    this.add1 = 1
    this.hidden1 = !this.hidden1
  }
  click2() {
    this.add2 = 1
    this.hidden2 = !this.hidden2
  }
  click3() {
    this.add3 = 1
    this.hidden3 = !this.hidden3
  }
  click4() {
    this.add4 = 1
    this.hidden4 = !this.hidden4
  }
  click5() {
    this.add5 = 1
    this.hidden5 = !this.hidden5
  }
  click6() {
    this.add6 = 1
    this.hidden6 = !this.hidden6
  }
  click7() {
    this.add7 = 1
    this.hidden7 = !this.hidden7
  }
  click8() {
    this.add8 = 1
    this.hidden8 = !this.hidden8
  }
  click9() {
    this.add9 = 1
    this.hidden9 = !this.hidden9
  }
  // btnclick(){

  // }
  getFileName(e: any) {
    this.createImage(this.file)
    storage
      .ref()
      .child(`${e.name}`)
      .put(e)
      .then(() => {
        console.log('Uploaded a blob or file!')
      })
      .catch((e: any) => {
        console.log(e)
      })
    this.test = e
  }
  createImage(file: any) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.uploadedImage = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>
