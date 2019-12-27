<template>
  <v-footer class="glampi-footer-wrap" padless>
    <v-row justify="center" class="glampi-footer" no-gutters>
      <v-toolbar-items v-for="(link, index) in links" :key="index">
        <v-btn
          text
          class="my-2 px-10 block caption glampi-footer-btn"
          :to="link.displayName"
        >
          {{ link.name }}
        </v-btn>
        <v-divider
          v-if="index !== 4"
          vertical
          class="my-2 mx-4"
          style="background: white;"
        ></v-divider>
      </v-toolbar-items>

      <v-col class="text-center py-4 overline" cols="12">
        &copy;2019-2020 J4K1 GLAMPI.All right reserved
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
<style lang="scss">
.glampi-footer-wrap {
  margin-top: 100px;
  .glampi-footer {
    background-color: $site_color_2;
    color: $site_color_8;
    .glampi-footer-btn {
      &.theme--light.v-btn {
        color: $site_color_8;
        caret-color: $site_color_8;
        border-radius: 50px 50px 50px 50px;
      }
    }
  }
}
</style>
