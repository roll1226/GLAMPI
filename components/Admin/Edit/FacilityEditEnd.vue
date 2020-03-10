<template>
  <div justify="center">
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">
          更新しました。
        </v-card-title>

        <v-card-text>
          <div>
            反映まで時間がかかる場合があります。
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="closeCard">
            戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FacilityEditEnd extends Vue {
  get dialog(): boolean {
    return this.$store.state.facilityEdit.endDialog
  }

  set dialog(value: boolean) {
    this.$store.commit('facilityEdit/SET_END_DIALOG', value)
  }

  closeCard() {
    this.$store.commit('facilityEdit/SET_END_DIALOG', false)
  }
}
</script>
