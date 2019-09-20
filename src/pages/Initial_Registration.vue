<template>
    <div>
        <v-alert type="warning" v-if="show_alert">
          アカウントを作成できませんでした
        </v-alert>

        <v-form ref="form" v-model="valid">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                            v-model="id"
                            :rules="[rules.required, rules.equal]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="ID"
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
                            :rules="[rules.required, rules.min ,rules.max,rules.passrules]"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-2"
                            label="パスワード"
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
                            :rules="[rules.repass]"
                            :type="show3 ? 'text' : 'password'"
                            name="input-10-3"
                            label="再パスワード"
                            counter
                            @click:append="show3 = !show3"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-select
                            v-model="grade"
                            :items="grades"
                            :rules="[rules.required]"
                            :menu-props="{ top: true, offsetY: true }"
                            label="学年"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-btn :disabled="!valid"
                       color="success"
                       @click="signup">登録
                </v-btn>
                <div v-if="Screen_transition($store.state.user.logined)"></div>
            </v-row>
        </v-form>
        </v-container>
        </v-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show_alert: false,
                valid: true,
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
                rules: {
                    required: value => !!value || "必ず入力してください",
                    min: v => v.length >= 8 || "８文字以上入力してください",
                    max: v => v.length <= 72 || "７２文字以下までの入力にしてください",
                    equal: v => v.length == 8 || "学籍番号を入力してください",
                    repass: v => v == this.password || "同じパスワードを入力してください",
                    passrules: v => {
                      const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,72}$/;
                      return pattern.test(v) || "半角英小文字大文字数字をそれぞれ1種類以上含んでください"
                    }
                }
            };
        },
        methods: {
            signup(){
              this.$store.dispatch('post_new_user',{id: this.id, password: this.password, grade: this.grade});
              if(this.$store.state.user.logined == false){
                this.show_alert = "true";
              }
            },
            Screen_transition(h) {
                // console.log(h);
                if (h) {
                    this.$router.push("ClassSchedule");
                    return true;
                } else {
                    // console.log(era);
                }
            }
        }
    };
</script>
<style scoped>
</style>
