<template>
  <div>
    <v-select
      v-model="value"
      :items="tags"
      item-text="tag"
      item-value="icon"
      return-object
      chips
      label="タグ"
      multiple
      solo
      flat
      outlined
      clearable
      :elevation="0"
      no-data-text="選択出来るタグはありません"
    ></v-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { firestore } from '@/plugins/firebase'
import { ITagsList } from '@/store/facilityEdit'

@Component
export default class FacilityOptionEdit extends Vue {
  tags: ITagsList[] = []
  get value(): ITagsList {
    return this.$store.state.facilityEdit.tagsEdit
  }

  set value(value: ITagsList) {
    this.$store.commit('facilityEdit/SET_TAG_EDIT', value)
  }

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
}
</script>
