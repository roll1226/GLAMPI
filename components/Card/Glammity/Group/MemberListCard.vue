<template>
  <v-slide-group multiple show-arrows>
    <v-slide-item v-for="(user, index) in avater" :key="index">
      <v-card-text class="px-5 text-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-avatar size="150" v-on="on">
              <v-img class="elevation-4" :src="user.img"></v-img>
            </v-avatar>
          </template>

          <span>
            {{ user.userName }}
          </span>
        </v-tooltip>
      </v-card-text>
    </v-slide-item>
  </v-slide-group>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IAvatar } from '@/store/glammityGroup'

@Component
export default class MemberListCard extends Vue {
  get avater(): IAvatar {
    return this.$store.state.glammityGroup.avatar
  }
}
</script>
