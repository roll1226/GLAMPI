<template>
  <v-footer class="white" padless>
    <v-row justify="center" no-gutters>
      <v-toolbar-items v-for="(link, index) in links" :key="index">
        <v-btn
          text
          class="px-10 py-2 caption"
          active-class="font-weight-bold"
          :to="link.displayName"
        >
          {{ link.name }}
        </v-btn>
        <v-divider
          v-if="index !== 4"
          class="mobile-divider"
          vertical
        ></v-divider>
      </v-toolbar-items>

      <!-- fontsize:overline
      padding:上下16px-->
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
  isResize: boolean = true
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
      displayName: '/officerAdminFacility/facilityRegistration'
    }
  ]

  created() {
    if (window.innerWidth < 770) this.isResize = false
  }
}
</script>
<style lang="scss">
.v-footer {
  margin: 40px 0 0 0;
}
.v-btn::before,
.v-btn::after {
  background-color: #fff;
}

@media screen and(max-width: 770px) {
  .mobile-divider {
    display: none;
  }
}
</style>
