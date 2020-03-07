<template>
  <v-card-actions>
    <v-spacer></v-spacer>

    <v-btn outlined color="success" @click="updateFacilityEdit">
      更新
    </v-btn>

    <v-btn outlined color="primary" @click="openCheckSite">
      確認する
    </v-btn>

    <CheckFacilitySite />

    <div justify="center">
      <v-dialog v-model="dialog" :persistent="editLoading" max-width="400">
        <v-card :loading="editLoading">
          <v-card-title class="headline">
            施設情報を更新しますか？
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text color="green lighten-2" @click="update">
              更新
            </v-btn>

            <v-btn color="error" text @click="closeCard">
              戻る
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card-actions>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CheckFacilitySite from '../../Admin/Edit/CheckFacilitySite.vue'

@Component({
  components: {
    CheckFacilitySite
  }
})
export default class CheackEditBtn extends Vue {
  get dialog(): boolean {
    return this.$store.state.facilityEdit.dialog
  }

  get editLoading(): boolean {
    return this.$store.state.facilityEdit.loading
  }

  set dialog(value: boolean) {
    this.$store.commit('facilityEdit/SET_EDIT_DIALOG', value)
  }

  updateFacilityEdit() {
    this.$store.commit('facilityEdit/SET_EDIT_DIALOG', true)
  }

  update() {
    this.$store.commit('facilityEdit/SET_LOADING', true)
    this.$store.dispatch(
      'facilityEdit/updateFacilityEdit',
      this.$route.params.id
    )
  }

  closeCard() {
    this.$store.commit('facilityEdit/SET_EDIT_DIALOG', false)
  }

  openCheckSite() {
    this.$store.commit('facilityEdit/SET_SITE_DIALOG', true)
  }
}
</script>
