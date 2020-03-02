<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col><passwordBefore /></v-col>
      </v-row>
      <v-row>
        <v-col><passwordAfter /></v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import passwordBefore from '@/components/MyPage/Form/passwordBefore.vue'
import passwordAfter from '@/components/MyPage/Form/passwordAfter.vue'

@Component({
  components: {
    passwordBefore,
    passwordAfter
  }
})
export default class PasswordMypage extends Vue {}
</script>
