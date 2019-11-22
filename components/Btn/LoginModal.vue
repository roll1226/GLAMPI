<template>
  <div>
    <v-btn color="primary" @click.stop="dialog = true">
      ログイン
    </v-btn>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">
            ログイン
          </v-card-title>

          <v-text-field
            ref="name"
            v-model="computedUser"
            :rules="[() => !!computedUser || '入力しろ']"
            label="メールアドレス"
            class="px-6"
          ></v-text-field>

          <v-text-field
            v-model="computedPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rules.required, rules.min, rules.max]"
            name="input-10-1"
            label="パスワード"
            hint="6文字以上、20文字以内で入力してください"
            class="px-6"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="success"
              :disabled="!formIsValid"
              :loading="loading"
              @click="login"
            >
              ログイン
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator'

@Component({
  computed: {
    loading(): boolean {
      return this.$store.state.login.loading
    }
  }
})
export default class LoginModal extends Vue {
  public show1: boolean = false
  public dialog: boolean = false

  public rules: {} = {
    required: (value: string) => !!value || 'パスワードを入力してください',
    min: (v: string) => v.length >= 6 || '6文字以上で入力してください',
    max: (v: string) => v.length < 21 || '20文字以内で入力してください'
  }

  public get formIsValid(): string {
    return this.user && this.password
  }

  @Emit('login')
  private login() {}

  @Prop({ required: true })
  user: string = ''

  @Prop({ required: true })
  password: string = ''

  get computedUser() {
    return this.user
  }

  set computedUser(value: string) {
    this.$emit('update:user', value)
  }

  get computedPassword() {
    return this.password
  }

  set computedPassword(value: string) {
    this.$emit('update:password', value)
  }
}
</script>
