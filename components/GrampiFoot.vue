<template>
  <v-footer color="lighten-1" class="mt-4" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        text
        rounded
        class="my-2"
        :to="link.displayName"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="grey lighten-2 lighten-2 py-4 text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>GLAMPI</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface footLink {
  name: string
  displayName: string
}

@Component
export default class GlampiFoot extends Vue {
  links: footLink[] = [
    {
      name: 'GLAMPIとは',
      displayName: '/about'
    },
    {
      name: 'よくある質問',
      displayName: '/faq'
    },
    {
      name: 'お問い合わせ',
      displayName: '/support'
    },
    {
      name: '運営ポリシー',
      displayName: '/policy'
    },
    {
      name: '施設登録はこちら',
      displayName: '/facilitiesRegistration'
    }
  ]
}
</script>
