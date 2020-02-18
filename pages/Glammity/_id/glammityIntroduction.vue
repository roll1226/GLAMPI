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
        v-for="(slider, i) in glammityImg"
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
              沖縄那覇ステーション
            </p>
          </v-col>

          <v-col>
            <div>
              プラン名
            </div>
            <p class="display-1 text--primary text-center">
              なんか凄いプラン
            </p>
          </v-col>

          <v-col>
            <div>
              募集人数
            </div>
            <p class="display-1 text--primary text-center">
              10人
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text class="pt-0">
        <div>
          現在、一人当たりの金額
        </div>
        <p class="display-1 text--primary text-center">
          {{ pay.toLocaleString() }}円
        </p>
      </v-card-text>

      <v-card-text class="pt-0">
        <div>
          日程
        </div>
        <p class="display-1 text--primary text-center">
          2020/02/23
        </p>
      </v-card-text>
    </v-card>

    <v-card class="mx-3">
      <v-card-text>
        <div>
          主査者からのコメント
        </div>
        <p class="display-1 text--primary text-center">
          aaaaaaaaa
        </p>
      </v-card-text>
    </v-card>

    <v-card class="mx-3">
      <v-card-subtitle class="pb-0">
        参加中のメンバー
      </v-card-subtitle>

      <v-slide-group multiple show-arrows>
        <v-slide-item v-for="(user, index) in avater" :key="index">
          <v-card-text class="px-5 text-center">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-avatar size="150" v-on="on">
                  <v-img class="elevation-4" :src="user.img"></v-img>
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
  name: string = 'Glammity名'
  pay: number = 45000 / 5

  glammityImg: [...string[]] = [
    'https://mr59fqlw.user.webaccel.jp/img/_image.php?fname=/campsite_image/13449/img_1_1124.jpg&ts=105457',
    'https://www.lantern.camp/wp-content/uploads/2016/12/1282f9ed053e3af3f7b8fc9a68c843b9-2000x1331.jpg'
  ]

  avater: IAvater[] = [
    {
      userName: '宮森あおい',
      img:
        'https://rr.img.naver.jp/mig?src=http%3A%2F%2Fimgcc.naver.jp%2Fkaze%2Fmission%2FUSER%2F20160803%2F75%2F7541965%2F1%2F300x300x9e61b2acbed2454172982374.jpg%2F300%2F600&twidth=300&theight=600&qlt=80&res_format=jpg&op=r'
    },
    {
      userName: '安原絵麻',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/81993eq-Y3L._CR450,250,1440,1280_.jpg'
    },
    {
      userName: '坂木しずか',
      img:
        'https://rr.img.naver.jp/mig?src=http%3A%2F%2Fimgcc.naver.jp%2Fkaze%2Fmission%2FUSER%2F20150701%2F14%2F1110024%2F253%2F400x480x6f1163f2e7becc1fa2693cab.jpg%2F300%2F600&twidth=300&theight=600&qlt=80&res_format=jpg&op=r'
    },
    {
      userName: '藤堂美沙',
      img: 'https://i.imgur.com/BYnLUM9.jpg'
    },
    {
      userName: '今井みどり',
      img:
        'https://rr.img.naver.jp/mig?src=http%3A%2F%2Fi0.wp.com%2Fkaola.jp%2Fwp-content%2Fuploads%2F2015%2F02%2F1d266a2ed938e5b3878bb54751ccd4ea.jpg&twidth=1200&theight=1200&qlt=80&res_format=jpg&op=r'
    }
  ]

  created() {
    const url = this.$route.params.id
    this.$store.dispatch('glammityJoin/getGlammity', url)
  }
}
</script>
