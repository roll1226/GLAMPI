<template>
  <v-col cols="4">
    <v-file-input
      v-model="inputImage"
      class="imageInput"
      accept="image/*"
      label="オプションイメージ"
      @change="createImage"
    ></v-file-input>
    <v-img
      v-show="uploadedImage"
      :src="uploadedImage"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="400"
      max-height="250"
    ></v-img>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class FacilityOptionEdit extends Vue {
  inputImage?: null = null
  uploadedImage: string | ArrayBuffer | null =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5s_Eb1IVAun_V4M-QW_6VrE5xYSSluHdb-F5Hp4Qv5FgeEZee&s'

  @Prop({ required: true, default: 0 })
  indexCnt!: number

  createImage(file: any) {
    if (file !== undefined && file !== null && file !== '') {
      if (file.name.lastIndexOf('.') <= 0) {
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        this.uploadedImage = reader.result
        this.$store.commit('facilityEdit/SET_SLIDER_EDIT_IMAGE', {
          img: file,
          cnt: this.indexCnt
        })
      })
    } else {
      this.uploadedImage =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5s_Eb1IVAun_V4M-QW_6VrE5xYSSluHdb-F5Hp4Qv5FgeEZee&s'
      this.$store.commit('facilityEdit/SET_SLIDER_EDIT_IMAGE', {
        img: null,
        cnt: this.indexCnt
      })
    }
  }
}
</script>
