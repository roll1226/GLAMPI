<template>
  <div>
    <v-card class="mx-auto mt-5" max-width="700">
      <v-img class="white--text align-end" :src="planImg" height="300px">
        <v-card-title>
          {{ planTitle }}
        </v-card-title>
      </v-img>

      <v-card-text class="text--primary">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>
                  チェックイン〜チェックアウト
                </td>
                <td>
                  {{
                    `${dates[0].replace(/-/g, '/')}~${dates[1].replace(
                      /-/g,
                      '/'
                    )}`
                  }}
                </td>
              </tr>
              <tr>
                <td>
                  宿泊人数
                </td>
                <td>{{ guestNumber }}人</td>
              </tr>
              <tr>
                <td>
                  オプション
                </td>
                <td>
                  {{ optionTitle }}
                </td>
              </tr>
              <tr>
                <td>
                  合計
                </td>
                <td>{{ totalPay.toLocaleString() }}円</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <Stripe class="mb-1" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Stripe from '~/components/Btn/Stripe.vue'

@Component({
  components: {
    Stripe
  }
})
export default class reservation extends Vue {
  created() {
    this.$store.commit('reservation/ADDITION')
  }

  get totalPay() {
    return this.$store.state.reservation.totalPay
  }

  get dates(): [...string[]] {
    return this.$store.state.reservation.dates
  }

  get optionTitle(): string {
    return this.$store.state.reservation.optionTitle === ''
      ? 'オプションは選択されていません。'
      : this.$store.state.reservation.optionTitle
  }

  get planTitle(): string {
    return this.$store.state.reservation.planTitle
  }

  get facilityId(): string {
    return this.$store.state.facility.uuid
  }

  get facility(): string {
    return this.$store.state.facility.facility
  }

  get planImg(): string {
    return this.$store.state.reservation.planImg
  }

  get guestNumber(): string {
    return this.$store.state.reservation.guest
  }
}
</script>
optionPayplanPay
