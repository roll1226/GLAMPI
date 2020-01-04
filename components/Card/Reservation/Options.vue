<template>
  <v-card class="mx-auto mb-5" max-width="300">
    <v-img class="white--text align-end" height="200px" :src="image">
      <v-card-title>
        {{ planTitle }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{ pay }}円</v-card-subtitle>

    <v-card-text class="text--primary">
      <div v-for="(text, index) in texts" :key="index">
        {{ text }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="success"
        outlined
        @click="selected(displayName, pay.split(',').join(''))"
      >
        <v-icon v-if="isActive && nowActive === displayName">
          fas fa-check
        </v-icon>
        <span v-else>
          選ぶ
        </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class reservation extends Vue {
  public selectedOption: string = ''
  isActive: boolean = false
  @Prop({ required: true, default: '' })
  planTitle!: string

  @Prop({ required: true, default: '' })
  pay!: number

  @Prop({ default: '' })
  texts!: [...string[]]

  @Prop({ required: true, default: '' })
  image!: string

  @Prop({ required: true, default: '' })
  displayName!: string

  get nowActive(): string {
    return this.$store.state.reservation.nowActive
  }

  selected(e: string, num: string) {
    if (this.nowActive === this.displayName) {
      this.isActive = false
      this.$store.commit('reservation/SET_NOW_ACTIVE', { active: '', pay: 0 })
    } else {
      this.isActive = true
      this.$store.commit('reservation/SET_NOW_ACTIVE', { active: e, pay: num })
    }
  }
}
</script>
