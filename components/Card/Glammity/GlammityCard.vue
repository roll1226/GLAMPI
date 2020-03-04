<template>
  <v-card class="mx-auto" max-width="300" elevation="4">
    <v-img class="white--text align-end" height="200px" :src="glammityImage">
      <v-card-title style="text-shadow: 1px 2px 3px #000; ">
        {{ glammityName }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      GLAMMITY紹介文
    </v-card-subtitle>

    <v-card-text
      class="text--primary"
      style="white-space: pre;"
      v-text="introduction"
    >
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <!-- 詳細飛ぶ -->
      <v-btn
        outlined
        class="glammity-btn"
        :to="`/Glammity/${url}/glammityIntroduction`"
      >
        詳細
      </v-btn>
      <!-- 参加する -->
      <JoinBtn
        :is-block="true"
        :glammity-name="glammityName"
        :glammity-id="url"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import JoinBtn from '@/components/Btn/Glammity/JoinBtn.vue'

@Component({
  components: {
    JoinBtn
  }
})
export default class GlammityCard extends Vue {
  @Prop({ required: true, default: '' })
  glammityImage!: string

  @Prop({ required: true, default: '' })
  glammityName!: string

  @Prop({ required: true, default: '' })
  introduction!: string

  @Prop({ required: true, default: '' })
  url!: string
}
</script>

<style lang="scss">
.glammity-btn {
  &.theme--light.v-btn {
    color: $site_color_2;
    caret-color: $site_color_2;
  }
}
</style>
