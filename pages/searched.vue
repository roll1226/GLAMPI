<template>
  <div>
    <h1>
      検索後
    </h1>

    <v-row>
      <v-col lg="4" md="4" sm="4" xs="12">
        <v-card class="mx-auto" outlined>
          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col lg="8" md="8" sm="8" xs="12">
        <SearchedFasility
          v-for="(facility, index) in facilityList"
          :key="index"
          :fasility-name="facility.facilityName"
          :address="facility.address"
          :plan-name="facility.planName"
          :plan-pay="facility.planPay"
          :introduction-url="facility.introduction"
          :grammity-url="facility.grammity"
          :facility-img="facility.facilityImg[0]"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchedFasility from '@/components/Card/Search/SearchedFasility.vue'
import { firestore } from '@/plugins/firebase'

interface IFacility {
  facilityName: string
  facilityImg: string
  address: string
  planName: string
  planPay: number
  introduction: string
  grammity: string
}

@Component({
  components: {
    SearchedFasility
  }
})
export default class Searched extends Vue {
  facilityList: IFacility[] = []

  async created() {
    this.$store.commit('search/CLEAR_QUERY')
    const searchQuery = this.$route.query.facilityKeyWord
    await firestore
      .collection('facilities')
      .where('searchQuery', 'array-contains', searchQuery)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            console.log(doc.data())
            console.log(doc.id)
            const facility = doc.data()

            await firestore
              .collection('facilities')
              .doc(doc.id)
              .collection('plans')
              .orderBy('pay', 'asc')
              .limit(1)
              .get()
              .then((queryPlan) => {
                if (!queryPlan.empty) {
                  queryPlan.forEach((docPlan) => {
                    const plan = docPlan.data()

                    const facilityName = facility.name
                    const address = `${facility.streetAddress[0]}${facility.streetAddress[1]}`
                    const facilityImg = facility.slider
                    const planName = plan.planTitle
                    const planPay = plan.pay
                    const introduction = facility.displayName
                    const grammity = introduction

                    const facilityArray = {
                      facilityName,
                      facilityImg,
                      address,
                      planName,
                      planPay,
                      introduction,
                      grammity
                    }
                    this.facilityList.push(facilityArray)
                  })
                }
              })
          })
        }
      })
  }
}
</script>
