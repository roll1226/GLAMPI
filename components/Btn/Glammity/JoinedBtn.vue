<template>
  <div>
    <v-btn color="green darken-1" text @click="Joining">
      参加する
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">
            {{ glammityName }}に参加しました。
          </v-card-title>

          <v-card-actions class="text-center">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Yes, sir.
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class JoinedBtn extends Vue {
  dialog: boolean = false
  @Prop({ required: true, default: '' })
  glammityName!: string

  Joining() {
    this.dialog = true
  }
}
</script>
