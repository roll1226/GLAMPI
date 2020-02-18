<template>
  <div class="pb-2">
    <h2>{{ name }} | 詳細ページ</h2>

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

    <v-card class="mx-3">
      <v-card-text class="pb-0">
        <v-row>
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

      <v-card-text class="pt-0">
        <div>
          現在、一人当たりの金額
        </div>
        <p class="display-1 text--primary text-center">
          {{
            (glammityData.allPay / glammityData.users.length).toLocaleString()
          }}円
        </p>
      </v-card-text>

      <v-card-text class="pt-0">
        <div>
          日程
        </div>
        <p class="display-1 text--primary text-center">
          {{ glammityData.checkIn }}
        </p>
      </v-card-text>
    </v-card>

    <v-card class="mx-3">
      <v-card-text>
        <div>
          主査者からのコメント
        </div>
        <p class="display-1 text--primary text-center">
          {{ glammityData.comment }}
        </p>
      </v-card-text>
    </v-card>

    <v-card class="mx-3">
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

    <JoinBtn :glammity-name="`Glammity名`" />
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

  created() {
    const url = this.$route.params.id
    this.$store.dispatch('glammityJoin/getGlammity', url)
  }
}
</script>
