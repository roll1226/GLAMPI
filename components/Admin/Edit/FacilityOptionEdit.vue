<template>
  <div>
    <v-row class="align-center">
      <v-col>
        <v-img
          v-show="uploadedImage"
          :src="uploadedImage"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="400"
          max-height="250"
        ></v-img>
      </v-col>

      <v-col cols="7">
        <v-file-input
          v-model="inputImage"
          class="imageInput"
          accept="image/*"
          label="オプションイメージ"
          @change="createImage"
        ></v-file-input>

        <v-text-field
          v-model="optionTitle"
          label="オプション名"
          single-line
        ></v-text-field>

        <v-text-field
          v-model="pay"
          label="値段"
          single-line
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="details"
          label="オプションについて"
          single-line
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class FacilityOptionEdit extends Vue {
  inputImage?: null = null
  uploadedImage: string | ArrayBuffer | null =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5s_Eb1IVAun_V4M-QW_6VrE5xYSSluHdb-F5Hp4Qv5FgeEZee&s'

  @Prop({ required: true })
  indexCnt!: number

  get optionTitle(): string {
    return this.$store.state.facilityEdit.optionEdit[this.indexCnt].optionTitle
  }
  get pay(): string {
    return String(this.$store.state.facilityEdit.optionEdit[this.indexCnt].pay)
  }
  get details(): string {
    return this.$store.state.facilityEdit.optionEdit[this.indexCnt].details
  }

  set optionTitle(value: string) {
    this.$store.commit('facilityEdit/SET_OPTION_EDIT_TITLE', {
      value,
      cnt: this.indexCnt
    })
  }
  set pay(value: string) {
    this.$store.commit('facilityEdit/SET_OPTION_EDIT_PAY', {
      value,
      cnt: this.indexCnt
    })
  }
  set details(value: string) {
    this.$store.commit('facilityEdit/SET_OPTION_EDIT_DETAILS', {
      value,
      cnt: this.indexCnt
    })
  }

  createImage(file: any) {
    if (file !== undefined && file !== null && file !== '') {
      if (file.name.lastIndexOf('.') <= 0) {
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        this.uploadedImage = reader.result
        this.$store.commit('facilityEdit/SET_OPTION_EDIT_IMAGE', {
          img: file,
          cnt: this.indexCnt
        })
      })
    } else {
      this.uploadedImage =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5s_Eb1IVAun_V4M-QW_6VrE5xYSSluHdb-F5Hp4Qv5FgeEZee&s'
      this.$store.commit('facilityEdit/SET_OPTION_EDIT_IMAGE', {
        img: null,
        cnt: this.indexCnt
      })
    }
  }
}
</script>
