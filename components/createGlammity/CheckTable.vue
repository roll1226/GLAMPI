<template>
  <tr>
    <td>{{ title }}</td>
    <td style="white-space: pre;">{{ value }}</td>
  </tr>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CreateTable extends Vue {
  @Prop({ required: true, default: '' })
  title!: string

  @Prop({ required: true, default: '' })
  value!: string
}
</script>
