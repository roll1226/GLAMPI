<template>
  <v-card>
    <v-card-text>
      <v-chip-group column>
        <v-chip
          v-for="(tag, index) in tags"
          :key="index"
          @click="searchTag(tag.tag)"
        >
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
import { firestore } from '@/plugins/firebase'

export interface ITags {
  tag: string
  icon: string
}

@Component
export default class SearchedSideNavigationTags extends Vue {
  tags: ITags[] = []

  async created() {
    const tags = await firestore.collection('tags').get()
    console.log(tags.docs.length)
    for (let index = 0; index < tags.docs.length; index++) {
      const tag = tags.docs[index].data().tag
      const icon = tags.docs[index].data().icon

      const tagList = {
        tag,
        icon
      }

      this.tags.push(tagList)
    }
  }

  searchTag(tag: string) {
    this.$router.push(`/searched?facilityKeyWord=&prefectures=&tag=${tag}`)
  }
}
</script>
