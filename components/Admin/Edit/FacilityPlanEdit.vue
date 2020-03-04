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

      <v-col class="pt-0">
        <v-file-input
          v-model="inputImage"
          class="imageInput"
          accept="image/*"
          label="プランイメージ"
          @change="createImage"
        ></v-file-input>

        <v-text-field
          v-model="planTitle"
          label="プラン名"
          single-line
        ></v-text-field>

        <v-text-field
          v-model="maxGuests"
          label="宿泊人数"
          single-line
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="pay"
          label="値段"
          single-line
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="details"
          label="プランについて"
          single-line
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class FacilityPlanEdit extends Vue {
  inputImage?: null = null
  uploadedImage: string | ArrayBuffer | null =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5s_Eb1IVAun_V4M-QW_6VrE5xYSSluHdb-F5Hp4Qv5FgeEZee&s'

  @Prop({ required: true, default: 0 })
  indexCnt!: number

  get planTitle(): string {
    return this.$store.state.facilityEdit.planEdit[this.indexCnt].planTitle
  }
  get maxGuests(): string {
    return this.$store.state.facilityEdit.planEdit[this.indexCnt].maxGuests
  }
  get pay(): string {
    return String(this.$store.state.facilityEdit.planEdit[this.indexCnt].pay)
  }
  get details(): string {
    return this.$store.state.facilityEdit.planEdit[this.indexCnt].details
  }

  set planTitle(value: string) {
    this.$store.commit('facilityEdit/SET_PLAN_EDIT_TITLE', {
      value,
      cnt: this.indexCnt
    })
  }
  set maxGuests(value: string) {
    this.$store.commit('facilityEdit/SET_PLAN_EDIT_MAX_GUESTS', {
      value,
      cnt: this.indexCnt
    })
  }
  set pay(value: string) {
    this.$store.commit('facilityEdit/SET_PLAN_EDIT_PAY', {
      value,
      cnt: this.indexCnt
    })
  }
  set details(value: string) {
    this.$store.commit('facilityEdit/SET_PLAN_EDIT_DETAILS', {
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
        this.$store.commit('facilityEdit/SET_PLAN_EDIT_IMAGE', {
          img: file,
          cnt: this.indexCnt
        })
      })
    } else {
      this.uploadedImage =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5s_Eb1IVAun_V4M-QW_6VrE5xYSSluHdb-F5Hp4Qv5FgeEZee&s'
      this.$store.commit('facilityEdit/SET_PLAN_EDIT_IMAGE', {
        img: null,
        cnt: this.indexCnt
      })
    }
  }
}
</script>
