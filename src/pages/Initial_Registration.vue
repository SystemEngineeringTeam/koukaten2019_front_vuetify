<template>
  <div>
    <v-alert type="warning" v-if="show_alert">
      アカウントを作成できませんでした
    </v-alert>

    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="id" :counter="6" :rules="id_rules" label="学籍番号(例 k19000)" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="password"
            :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_pass ? 'text' : 'password'"
            :rules="pass_rules"
            label="パスワード"
            hint="半角アルファベットで8文字以上、小文字大文字数字をそれぞれ1文字以上含む"
            counter
            @click:append="show_pass = !show_pass"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="repassword"
            :append-icon="show_repass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_repass ? 'text' : 'password'"
            :rules="repass_rules"
            name="input-10-3"
            label="再パスワード"
            counter
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-col>
      </v-row>
      <!--<v-row>
        <v-col cols="3">
          <v-select
            v-model="grade"
            :items="grades"
            :rules="[rules.required]"
            :menu-props="{ top: true, offsetY: true }"
            label="学年"
          ></v-select>
        </v-col>
      </v-row>-->
      <v-row>
        <v-btn :disabled="!valid" color="success" @click="signup">登録 </v-btn>
        <div v-if="Screen_transition($store.state.user.logined)"></div>
      </v-row>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show_alert: false,
      valid: true,
      id: '',
      grade: 0,
      semester: '',
      x: false,
      show_pass: false,
      show_repass: false,
      id: '',
      password: '',
      repassword: '',
      grades: ['1', '2', '3', '4'],
      id_rules: [
        v => !!v || '必ず入力してください',
        v => {
          const pattern = /^[evcbmpdsalthkx][0-9]{5}$/;
          return pattern.test(v) || '学籍番号のフォーマットが違います';
        }
      ],
      pass_rules: [
        v => !!v || '必ず入力してください',
        v => (v && v.length >= 8 && v.length <= 72) || '８文字以上７２文字以内で入力してください',
        v => {
          const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,72}$/;
          return pattern.test(v) || '半角英小文字大文字数字をそれぞれ1文字以上含んでください';
        }
      ],
      repass_rules: [v => !!v || '必ず入力してください', v => v == this.password || '同じパスワードを入力してください'],
      rules: {
        required: value => !!value || '必ず入力してください',
        min: v => v.length >= 8 || '８文字以上入力してください',
        max: v => v.length <= 72 || '７２文字以下までの入力にしてください',
        equal: v => v.length == 8 || '学籍番号を入力してください',
        repass: v => v == this.password || '同じパスワードを入力してください',
        passrules: v => {
          const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,72}$/;
          return pattern.test(v) || '半角英小文字大文字数字をそれぞれ1文字以上含んでください';
        }
      }
    };
  },
  methods: {
    signup() {
      this.$store.dispatch('post_new_user', {
        id: this.id,
        password: this.password,
        grade: this.grade
      });
      if (this.$store.state.user.logined == false) {
        setTimeout(this.enable, 1500);
      }
    },
    enable: function() {
      this.show_alert = true;
    },
    Screen_transition(h) {
      // console.log(h);
      if (h) {
        this.$router.push('ClassSchedule');
        return true;
      } else {
        // console.log(era);
      }
    }
  }
};
</script>
<style scoped></style>
