<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="ID" :counter="8" :rules="IDRules" label="学籍番号(例 k19068kk)" required></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_pass ? 'text' : 'password'"
        :rules="PassRules"
        label="パスワード"
        counter
        @click:append="show_pass = !show_pass"
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">ログインする</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data: () => ({
    valid: true,
    ID: "",
    password: "",
    show_pass: false,
    IDRules: [
      v => !!v || "学籍番号は必ず入力してください",
      v => (v && v.length == 8) || ""
    ],
    PassRules: [
      v => !!v || "パスワードは必ず入力してください",
      v =>  {
        const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
        return pattern.test(v) || "半角英小文字大文字数字をそれぞれ1種類以上含んでください"
      }
    ]
  }),

  methods: {
    login() {
      this.$store.dispatch("login", { ID: this.ID, password: this.password });
    }
  }
};
</script>

<style scoped>
</style>
