<template>
  <div>
    <v-btn @click="dialog = true">
      作成
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="400" :persistent="craeteLoading">
        <v-card :loading="craeteLoading">
          <template>
            <v-card-title class="headline">
              この内容で登録しますか？
            </v-card-title>

            <v-card-text>
              <v-simple-table>
                <tbody>
                  <CreateTable title="GLAMMITY名" :value="glammityName" />

                  <CreateTable title="施設" :value="facilityName" />

                  <CreateTable title="プラン" :value="planTitle" />
                  <CreateTable title="オプション" :value="optionTitle" />

                  <CreateTable title="募集人数" :value="`${guestNumber}人`" />

                  <CreateTable
                    title="募集日程"
                    :value="shapingRecruitmentDates"
                  />

                  <CreateTable title="日程" :value="shapingDates" />

                  <CreateTable title="コメント" :value="comment" />
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="error" text @click="createGlammity">
                作成
              </v-btn>

              <v-btn color="error" text @click="closeCard">
                直す
              </v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CreateTable from '@/components/CreateGlammity/CheckTable.vue'
import { firestore } from '@/plugins/firebase'

@Component({
  components: {
    CreateTable
  }
})
export default class CreateBtn extends Vue {
  dialog: boolean = false

  get shapingDates(): string {
    return this.dates.join(' ~ ')
  }

  get shapingRecruitmentDates(): string {
    return this.recruitmentDates.join(' ~ ')
  }

  get glammityName(): string {
    return this.$store.state.glammityCreate.glammityName
  }

  get facilityName(): string {
    return this.$store.state.glammityCreate.facilityName
  }

  get planTitle(): string {
    return this.$store.state.glammityCreate.planTitle
  }

  get optionTitle(): string {
    return this.$store.state.glammityCreate.optionTitle
  }

  get guestNumber(): number {
    return this.$store.state.glammityCreate.guestNumber
  }

  get recruitmentDates(): [...string[]] {
    return this.$store.state.glammityCreate.recruitmentDates
  }

  get dates(): [...string[]] {
    return this.$store.state.glammityCreate.dates
  }

  get comment(): string {
    return this.$store.state.glammityCreate.comment
  }

  get facilityId(): string {
    return this.$store.state.glammityCreate.facilityId
  }

  get planPay(): number {
    return this.$store.state.glammityCreate.planPay
  }

  get optionPay(): number {
    return this.$store.state.glammityCreate.optionPay
  }

  get totalDate(): number {
    return this.$store.state.glammityCreate.totalDate
  }

  get planId(): string {
    return this.$store.state.glammityCreate.planId
  }

  get optionId(): string {
    return this.$store.state.glammityCreate.optionId
  }

  get userId(): string {
    return this.$store.state.login.userUid
  }

  get craeteLoading(): boolean {
    return this.$store.state.glammityCreate.loading
  }

  closeCard() {
    this.dialog = false
  }

  async createGlammity() {
    const totalPay = this.totalDate * this.planPay + this.optionPay
    this.$store.commit('glammityCreate/SET_LOADING', true)

    await firestore
      .collection('glammity')
      .add({
        comment: this.comment,
        facilityUrl: this.facilityId,
        isReservation: false,
        name: this.glammityName,
        numberOfApplicants: this.guestNumber,
        applicationPeriod: [
          this.recruitmentDates[0].replace(/-/g, '/'),
          this.recruitmentDates[1].replace(/-/g, '/')
        ],
        checkIn: this.dates[0].replace(/-/g, '/'),
        checkOut: this.dates[1].replace(/-/g, '/'),
        allPay: totalPay,
        plan: this.planId,
        option: this.optionId,
        organizer: this.userId
      })
      .then(async (glammityId) => {
        await firestore
          .collection('glammity')
          .doc(glammityId.id)
          .collection('member')
          .doc(this.userId)
          .set({
            userStates: 'host'
          })

        await firestore
          .collection('glammity')
          .doc(glammityId.id)
          .collection('messages')
          .add({})
        this.$store.commit('glammityCreate/SET_LOADING', false)
        this.$store.commit('glammityCreate/RESET_DATA')
        this.$store.commit('search/RESET_FACILITY')
        this.$store.commit('search/RESET_FACILITY_QUERY')
        this.$router.push(`/Glammity/Group/${glammityId.id}/glammityGroup`)
      })
  }
}
</script>
