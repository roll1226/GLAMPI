<template>
  <v-card max-width="300">
    <v-img class="white--text align-end" height="200px" :src="image">
      <v-card-title>
        {{ optionTitle }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{ pay }}円</v-card-subtitle>

    <v-card-text class="text--primary" style="word-wrap: pre;" v-text="texts">
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
  optionTitle!: string

  @Prop({ required: true, default: '' })
  pay!: number

  @Prop({ required: true, default: '' })
  texts!: ''

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
      this.$store.commit('reservation/SET_NOW_ACTIVE', {
        active: '',
        pay: 0,
        optionTitle: ''
      })
    } else {
      this.isActive = true
      this.$store.commit('reservation/SET_NOW_ACTIVE', {
        active: e,
        pay: num,
        optionTitle: this.optionTitle
      })
    }
  }
}
</script>
