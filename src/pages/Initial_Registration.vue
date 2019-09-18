<template>
  <div>
    <v-form>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="id"
              :rules="[rules.required, rules.equal]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="ID"
              hint="パスワードに設定可能な文字数です"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min ,rules.max]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-2"
              label="パスワード"
              hint="パスワードに設定可能な文字数です"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="repassword"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required ,rules.min ,rules.max]"
              :type="show3 ? 'text' : 'password'"
              name="input-10-3"
              label="再パスワード"
              hint="パスワードに設定可能な文字数です"
              counter
              @click:append="show3 = !show3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="3">
            <v-select
              v-model="grade"
              :items="grades"
              :menu-props="{ top: true, offsetY: true }"
              label="学年"
            ></v-select>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="3">
            <v-select
              v-model="semester"
              :items="semesters"
              :menu-props="{ top: true, offsetY: true }"
              label="専攻"
            ></v-select>
          </v-col>
        </v-row>
        <v-btn
          @click="$store.dispatch('post_new_user',{id: id,password: password,grade: grade,semester:semester})"
        >登録</v-btn>
      </v-container>
    </v-form>
    {{id}}
    {{password}}
    {{repassword}}
    {{grade}}
    {{semester}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      grade: 0,
      semester: "",
      x: false,
      show1: true,
      show2: false,
      show3: false,
      id: "",
      password: "",
      repassword: "",
      grades: ["1", "2", "3", "4"],
      semesters: [
        "EE",
        "EV",
        "CC",
        "CB",
        "MM",
        "MP",
        "DD",
        "DS",
        "FA",
        "FL",
        "HT",
        "HH",
        "KK",
        "KX"
      ],
      rules: {
        required: value => !!value || "必ず入力してください",
        min: v => v.length >= 9 || "９文字以上入力してください",
        max: v => v.length <= 16 || "１６文字以下までの入力にしてください",
        equal: v => v.length == 8 || "学籍番号を入力してください",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {}
};
</script>
<style scoped>
</style>