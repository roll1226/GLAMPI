<template>
  <div class="glammity-introduction">
    <h2 class="mt-6 mb-5">{{ glammityData.glammityName }} | 詳細ページ</h2>

    <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      width="500"
    >
      <v-carousel-item
        v-for="(slider, i) in glammityData.slider"
        :key="i"
        :src="slider"
      ></v-carousel-item>
    </v-carousel>

    <v-card tile elevation="0">
      <v-card-text>
        <v-row class="flex-column flex-sm-row">
          <v-col>
            <div>
              施設名
            </div>
            <p class="display-1 text--primary text-center">
              {{ glammityData.facilityName }}
            </p>
          </v-col>

          <v-col>
            <div>
              プラン名
            </div>
            <p class="display-1 text--primary text-center">
              {{ glammityData.planName }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row class="flex-column flex-sm-row">
          <v-col>
            <div>
              現在の参加人数
            </div>
            <p class="display-1 text--primary text-center">
              {{ glammityData.users.length }}人
            </p>
          </v-col>

          <v-col>
            <div>
              募集人数
            </div>
            <p class="display-1 text--primary text-center">
              {{ glammityData.numberOfApplicants }}人
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row class="flex-column flex-sm-row">
          <v-col>
            <div>
              現在の一人当たりの金額
            </div>
            <p class="display-1 text--primary text-center">
              {{
                (
                  glammityData.allPay / glammityData.users.length
                ).toLocaleString()
              }}円
            </p>
          </v-col>

          <v-col> </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <div>
          日程
        </div>
        <p class="display-1 text--primary text-center">
          {{ glammityData.checkIn }} - {{ glammityData.checkOut }}
        </p>
      </v-card-text>
    </v-card>

    <v-card tile elevation="0">
      <v-card-text>
        <div>
          主査者からのコメント
        </div>
        <p class="display-1 text--primary text-center">
          {{ glammityData.comment }}
        </p>
      </v-card-text>
    </v-card>

    <v-card tile elevation="0">
      <v-card-subtitle class="pb-0">
        参加中のメンバー
      </v-card-subtitle>

      <v-slide-group multiple show-arrows>
        <v-slide-item v-for="(user, index) in glammityData.users" :key="index">
          <v-card-text class="px-5 text-center">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-avatar size="150" v-on="on">
                  <v-img class="elevation-4" :src="user.userImg"></v-img>
                </v-avatar>
              </template>

              <span>
                {{ user.userName }}
              </span>
            </v-tooltip>
          </v-card-text>
        </v-slide-item>
      </v-slide-group>
    </v-card>

    <JoinBtn
      :is-block="false"
      :glammity-name="glammityData.glammityName"
      :is-outlined="true"
      :glammity-id="this.$route.params.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import JoinBtn from '@/components/Btn/Glammity/JoinBtn.vue'
import { IGlammity } from '@/store/glammityJoin'

interface IAvater {
  userName: string
  img: string
}

@Component({
  components: {
    JoinBtn
  }
})
export default class glammityIndex extends Vue {
  get glammityData(): IGlammity {
    return this.$store.state.glammityJoin.glammity
  }

  get id(): boolean {
    return this.$store.state.login.userUid
  }

  created() {
    this.$store.commit('glammityJoin/RESET_GLAMMITY')
    this.$store.commit('glammityJoin/SET_IS_GROUP', null)
    const url = this.$route.params.id
    this.$store.dispatch('glammityJoin/getGlammity', url)
  }
}
</script>
<style lang="scss">
.glammity-introduction {
  h2 {
    font-size: 2em;
    color: $site_color_2;
  }
  .v-card {
    width: 80%;
    margin: 30px auto 0;
  }
}

@media screen and (max-width: 770px) {
  .glammity-introduction {
    h2 {
      font-size: 1.5em;
    }
    .v-card {
      width: 100%;
      margin: 30px auto 0;
    }
  }
}
</style>
