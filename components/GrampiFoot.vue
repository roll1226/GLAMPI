<template>
  <v-footer class="mt-4" padless>
    <v-row justify="center" class="glampi-footer" no-gutters>
      <v-toolbar-items v-for="(link, index) in links" :key="index">
        <v-btn text class="my-2" :to="link.displayName">
          <span class="glampi-footer-btn">
            {{ link.name }}
          </span>
        </v-btn>
        <v-divider
          v-show="index !== 4"
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
.glampi-footer {
  background-color: $site_color_2;
  color: $site_color_8;
}

.glampi-footer-btn {
  color: $site_color_8;
}
</style>
