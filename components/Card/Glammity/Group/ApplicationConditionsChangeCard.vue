<template>
  <v-card>
    <v-card-text>
      募集条件変更
    </v-card-text>

    <v-row>
      <ChangeInfo
        title="Glammity名"
        :info="`テストGlammity`"
        is-input="input"
      />
      <ChangeInfo
        title="募集人数"
        :info="`テストGlammity`"
        is-input="overflow"
      />

      <ChangeInfo title="コメント" :info="`テストGlammity`" is-input="input" />

      <ChangeInfo title="募集日程" :info="`テストGlammity`" is-input="date" />
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ChangeInfo from '@/components/Card/Glammity/Group/ChangeInfo.vue'

@Component({
  components: {
    ChangeInfo
  }
})
export default class ApplicationConditionsChangeCard extends Vue {}
</script>
