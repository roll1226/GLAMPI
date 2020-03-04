<template>
  <v-card-actions>
    <v-btn @click="updateFacilityEdit">
      更新
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" :persistent="editLoading" max-width="400">
        <v-card :loading="editLoading">
          <v-card-title class="headline">
            施設情報を更新しますか？
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text color="green lighten-2">
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

@Component
export default class CheackEditBtn extends Vue {
  editLoading: boolean = false
  get dialog(): boolean {
    return this.$store.state.facilityEdit.dialog
  }

  set dialog(value: boolean) {
    this.$store.commit('facilityEdit/SET_EDIT_DIALOG', value)
  }

  updateFacilityEdit() {
    this.$store.commit('facilityEdit/SET_EDIT_DIALOG', true)
    this.$store.dispatch('facilityEdit/updateFacilityEdit')
  }

  closeCard() {
    this.$store.commit('facilityEdit/SET_EDIT_DIALOG', false)
  }
}
</script>
