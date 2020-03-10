<template>
  <div class="top-page-introduction-wrap index-wrap-tag">
    <v-row no-gutters>
      <v-col>
        <h3 class="top-page-titles">
          タグ検索
        </h3>
      </v-col>
    </v-row>

    <v-row class="top-page-cards">
      <v-col>
        <v-card :elevation="0">
          <v-card-text class="pt-0">
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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchedSideNavigationTags from '@/components/Card/Search/SearchedSideNavigationTags.vue'
import { firestore } from '@/plugins/firebase'

export interface ITags {
  tag: string
  icon: string
}

@Component({
  components: {
    SearchedSideNavigationTags
  }
})
export default class TagIndexWrap extends Vue {
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

<style lang="scss">
// .index-tag-mobile {
//   display: block;

//   max-width: 300px;
//   margin: 0 auto;
// }

.index-tag-pc {
  display: none;
}

@media screen and (min-width: 770px) {
  // .index-wrap-tag {
  //   margin-left: 14px;
  //   margin-right: 14px;
  // }

  .index-tag-mobile {
    display: none;
  }

  .index-tag-pc {
    display: block;
  }
}
</style>
