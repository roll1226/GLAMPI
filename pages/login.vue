<template>
  <div>
    <v-btn disabled @click="regist">
      施設保存
    </v-btn>

    <v-divider></v-divider>

    <v-text-field v-model="name" label="iconの名前"></v-text-field>
    <v-text-field
      v-model="className"
      label="fontawersomeのclass"
    ></v-text-field>

    <v-icon large>
      {{ className }}
    </v-icon>

    <br />

    <v-btn class="mb-1" :loading="loading" @click="icon">
      icon保存
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { firestore, timestamp } from '@/plugins/firebase'
const uuid = require('uuid/v4')

@Component
export default class registFacility extends Vue {
  loading: boolean = false
  name: string = ''
  className: string = ''

  regist() {
    const facilityId = uuid()
      .split('-')
      .join('')
      .slice(0, -12)
    firestore
      .collection('facilities')
      .doc(facilityId)
      .set({
        createdAt: timestamp,
        displayName: 'facilityUrl3',
        email: 'plplp',
        info: ['沖縄の暑さを感じよ！', 'ナンクルナイサー'],
        like: 0,
        name: '沖縄那覇ステーション',
        officerName: 'roll',
        pay: 0,
        phoneNumber: '080-0000-0000',
        ruby: 'おきなわなはすてーしょん',
        searchQuery: ['沖縄', '那覇', 'ステーション', '沖縄那覇ステーション'],
        slider: [
          'http://anihonetwallpaper.com/image/2020/01/48502-BanG_Dream-AobaMoca-PC-Wallpaper.jpg',
          'http://anihonetwallpaper.com/image/2019/05/47339-BanG_Dream-AobaMoca-PC-Wallpaper.jpg',
          'http://anihonetwallpaper.com/image/2017/09/42553-BanG_Dream-AobaMoca-PC.jpg',
          'http://anihonetwallpaper.com/image/2019/10/48064-BanG_Dream-AobaMoca-PC-Wallpaper.jpg'
        ],
        streetAddress: ['沖縄', '那覇', '1-23-23']
      })
      .then(() => {
        firestore
          .collection('facilities')
          .doc(facilityId)
          .collection('plans')
          .add({
            details: ['モカ可愛い！', 'モカ最高！！！'],
            pay: 20000,
            planImage:
              'http://anihonetwallpaper.com/image/2019/07/47532-BanG_Dream-AobaMoca-PC-Wallpaper.jpg',
            planTitle: 'モカ素晴らしい'
          })
      })
  }

  icon() {
    if (this.name === '' || this.className === '') return
    this.loading = true
    firestore
      .collection('tags')
      .add({
        tag: this.name,
        icon: this.className
      })
      .then(() => {
        this.name = ''
        this.className = ''
        this.loading = false
        console.log('OK')
      })
  }
}
</script>
