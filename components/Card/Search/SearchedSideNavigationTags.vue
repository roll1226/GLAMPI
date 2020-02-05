<template>
  <v-card>
    <v-card-text>
      <v-chip-group column>
        <v-chip v-for="(tag, index) in tags" :key="index">
          <v-icon left class="px-1">
            {{ tag.icon }}
          </v-icon>

          {{ tag.tag }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

export interface ITags {
  tag: string
  icon: string
}

@Component
export default class SearchedSideNavigationTags extends Vue {
  tags: ITags[] = [
    {
      tag: '駅近',
      icon: 'fas fa-train'
    },
    {
      tag: 'プール完備',
      icon: 'fas fa-swimmer'
    },
    {
      tag: 'ペット同伴OK!',
      icon: 'fas fa-paw'
    },
    {
      tag: ' 車OK!',
      icon: 'fas fa-car'
    },
    {
      tag: '海近',
      icon: 'fas fa-water'
    },
    {
      tag: 'コンセントプラグあり',
      icon: 'fas fa-plug'
    },
    {
      tag: '手ぶら',
      icon: 'fas fa-sign-language'
    },
    {
      tag: '夜空が見える',
      icon: 'fas fa-star-and-crescent'
    },
    {
      tag: '朝食付き',
      icon: 'fas fa-bread-slice'
    }
  ]
}
</script>
