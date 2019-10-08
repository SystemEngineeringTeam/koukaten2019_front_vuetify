<template>
  <!-- App.vue -->

  <v-app id="fontSetting">
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ $store.state.user.id }}</v-list-item-title>
          <!-- <v-list-item-title class="headline">未来予想図</v-list-item-title> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list color="#78BBE6" dense>
        <template v-if="!$store.state.user.logined">
          <v-list-item v-for="item in login_menu" :key="item.title" :value="item.link">
            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="item.link" class="headline text_none white--text">{{ item.title }}</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item v-for="item in logout_menu" :key="item.title" :value="item.link">
            <v-list-item-content>
              <v-list-item-title>
                <router-link
                  v-if="item.title === 'ログアウト'"
                  @click.native="$store.commit('logout')"
                  :to="item.link"
                  class="headline text_none white--text"
                >{{ item.title }}</router-link>
                <router-link
                  v-else
                  :to="item.link"
                  class="headline text_none white--text"
                >{{ item.title }}</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#78BBE6" height="80">
      <v-app-bar-nav-icon color="white" dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-col cols="2">
        <v-toolbar-title>
          <router-link class="a" to="/">
            <font class="white--text display-1 font-weight-black">未来予想図</font>
          </router-link>
        </v-toolbar-title>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-text>
            <span class="headline">共通:</span>
            <span
              :class="{
              'yellow--text text--darken-2 headline': is_not_enough(classification_total_unit('共通'), graduate_unit.kyotu)
            }"
              class="headline font-weight-bold"
            >{{ diff_unit(classification_total_unit('共通'), graduate_unit.kyotu) }}</span>
            <span class="headline">, 専門:</span>
            <span
              :class="{
              'yellow--text text--darken-2 headline': is_not_enough(classification_total_unit('専門'), graduate_unit.senmon)
            }"
              class="font-weight-bold headline"
            >{{ diff_unit(classification_total_unit('専門'), graduate_unit.senmon) }}</span>
            <span class="headline">, 総合A:</span>
            <span
              :class="{
              'yellow--text text--darken-2 headline': is_not_enough(classification_total_unit('総合A'), graduate_unit.A)
            }"
              class="font-weight-bold headline"
            >{{ diff_unit(classification_total_unit('総合A'), graduate_unit.A) }}</span>
            <span class="headline">, 総合A(英):</span>
            <span
              :class="{
              'yellow--text text--darken-2 headline': is_not_enough(classification_total_unit('英語'), graduate_unit.english)
            }"
              class="font-weight-bold headline"
            >{{ diff_unit(classification_total_unit('英語'), graduate_unit.english) }}</span>
            <span class="headline">, 総合B:</span>
            <span
              :class="{
              'yellow--text text--darken-2 headline': is_not_enough(classification_total_unit('総合B'), graduate_unit.B)
            }"
              class="font-weight-bold headline"
            >{{ diff_unit(classification_total_unit('総合B'), graduate_unit.B) }}</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-dialog v-model="show_dialog" max-width="400">
        <v-card>
          <v-card-title class="display-1 font-weight-bold">確認</v-card-title>

          <v-card-text class="headline font-weight-bold">
            <template v-if="!this.$store.state.is_enough_unit_graduate">
              卒業要件を満たしていません
              <br>
            </template>
            <template
              v-if="
              is_not_enough(classification_total_unit('共通'), graduate_unit.kyotu) ||
                is_not_enough(classification_total_unit('専門'), graduate_unit.senmon) ||
                is_not_enough(classification_total_unit('総合A'), graduate_unit.A) ||
                is_not_enough(classification_total_unit('総合B'), graduate_unit.B) ||
                is_not_enough(classification_total_unit('英語'), graduate_unit.english)
            "
            >
              <br>以下の単位が足りていません
              <br>
            </template>
            <template v-if="is_not_enough(classification_total_unit('共通'), graduate_unit.kyotu)">
              共通
              <br>
            </template>
            <template v-if="is_not_enough(classification_total_unit('専門'), graduate_unit.senmon)">
              専門
              <br>
            </template>
            <template v-if="is_not_enough(classification_total_unit('総合A'), graduate_unit.A)">
              総合A
              <br>
            </template>
            <template v-if="is_not_enough(classification_total_unit('英語'), graduate_unit.english)">
              総合A(英)
              <br>
            </template>
            <template v-if="is_not_enough(classification_total_unit('総合B'), graduate_unit.B)">総合B</template>
            <br>
            <template v-if="!this.$store.state.is_over_unit">1年間に取得できる単位数をオーバーしています</template>
            <br>このまま登録しますか？
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn color="green darken-1" text @click="show_dialog = false">キャンセル</v-btn>

            <v-btn color="green darken-1" text @click="register_on_dialog()">登録する</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="warning_delete" max-width="460">
        <v-card>
          <v-card-title class="display-1 font-weight-bold">確認</v-card-title>

          <v-card-text class="headline font-weight-bold">全ての登録された授業を取り消します</v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="green darken-1" text @click="warning_delete = false">キャンセル</v-btn>
            <v-btn color="green darken-1" text @click="delete_registered_lectures()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="1.5">
        <v-btn x-large value="save" v-on:click="save_lectuers">
          <v-icon>mdi-cloud-upload</v-icon>
          <span>保存</span>
        </v-btn>
      </v-col>

      <v-col cols="1.5">
        <v-btn x-large value="delete" v-on:click="delete_lectuers">
          <v-icon>mdi-delete</v-icon>
          <span>削除</span>
        </v-btn>
      </v-col>
      <v-col cols="1.5">
        <v-btn x-large value="unit" v-on:click="sheet = !sheet">
          <v-icon>mdi-numeric</v-icon>
          <span>単位確認</span>
        </v-btn>
      </v-col>
      <v-bottom-sheet v-model="sheet">
        <v-sheet>
          <CreditCalculator></CreditCalculator>
        </v-sheet>
      </v-bottom-sheet>

      <div class="flex-grow-1"></div>
      <!-- <div v-if="$store.state.user.logined">
        <b class="white--text">{{ $store.state.user.id }}</b>
       
      </div>
      <div v-else>
        <router-link to="/login" class="text_none">ログイン</router-link>
      </div>-->
      <!-- <v-btn>
                          <router-link to="/ClassSchedule">時間割エディタ</router-link>
      </v-btn>-->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

import CreditCalculator from './components/ClassSchedule/CreditCalculator';

Vue.use(Vuex);

export default {
  data() {
    return {
      drawer: null,
      common: true,
      specialty: true,
      general_A: true,
      general_A_en: true,
      general_B: true,
      compulsory: true,
      required_compulsory: true,
      choice: true,
      show_dialog: false,
      warning_delete: false,
      tabs: null,
      user: 1,
      is_edit: true,
      looking_grade: 1,
      looking_semester: '前期',
      major: 'kk',
      grades: [1, 2, 3, 4],
      semesters: ['前期', '後期'],
      timetables: [
        { grade: 1, semester: '前期' },
        { grade: 1, semester: '後期' },
        { grade: 2, semester: '前期' },
        { grade: 2, semester: '後期' },
        { grade: 3, semester: '前期' },
        { grade: 3, semester: '後期' },
        { grade: 4, semester: '前期' },
        { grade: 4, semester: '後期' }
      ],
      timetable: [],
      sheet: false,
      graduate_unit: {
        all: 124,
        kyotu: 10,
        senmon: 94,
        A: 8,
        B: 12,
        english: 6
      },
      login_menu: [
        { title: 'ホーム', link: '/' },
        { title: '時間割エディタ', link: '/ClassSchedule' },
        { title: '時間割ビューア', link: '/ClassScheduleView' },
        { title: 'ユーザー登録', link: '/Initial_Registration' },
        { title: 'ログイン', link: '/Login' }
      ],
      logout_menu: [
        { title: 'ホーム', link: '/' },
        { title: '時間割エディタ', link: '/ClassSchedule' },
        { title: '時間割ビューア', link: '/ClassScheduleView' },
        { title: 'ログアウト', link: '/' }
      ],
      login: true //true:ログイン済み false:未ログイン
    };
  },

  name: 'App',
  components: {
    CreditCalculator
  },
  methods: {
    is_not_enough(unit, enough_unit) {
      return unit < enough_unit;
    },
    classification_total_unit(classification) {
      let total_unit = 0;
      if (classification != '英語') {
        for (let grade = 1; grade <= 4; grade++) {
          total_unit += this.$store.state.unit_list[grade]['必修'][classification];
          total_unit += this.$store.state.unit_list[grade]['選択'][classification];
        }
      } else {
        for (let grade = 1; grade <= 4; grade++) {
          total_unit += this.$store.state.english_unit_list[grade]['必修'];
          total_unit += this.$store.state.english_unit_list[grade]['選択'];
        }
      }
      return total_unit;
    },
    diff_unit(total_unit, enough_unit) {
      let diff_unit = enough_unit - total_unit;
      if (diff_unit < 0) {
        diff_unit = 0;
      }
      return diff_unit;
    },
    save_lectuers() {
      if (!this.$store.state.is_enough_unit_graduate || !this.$store.state.is_over_unit) this.show_dialog = true;
      else {
        this.put_registered_lectures(this.mold_registered_lectures());
      }
    },
    delete_lectuers() {
      this.warning_delete = true;
    },
    delete_registered_lectures() {
      Vue.set(this.$store.state, 'registered_lectures', []);
      this.warning_delete = false;
    },
    mold_registered_lectures() {
      let data = [];
      let students_id = this.$store.state.user.id;
      this.$store.state.registered_lectures.forEach(lectures =>
        data.push({
          students_id: students_id,
          subject_code: lectures.subject_code,
          class_code: lectures.class_code,
          course_grade: lectures.grade,
          grade_point: 'Future'
        })
      );
      return data;
    },
    register_on_dialog() {
      this.put_registered_lectures(this.mold_registered_lectures());
      this.show_dialog = false;
    },
    put_registered_lectures(data) {
      let d = { data: data };
      axios.put(process.env.VUE_APP_URL_EDITOR, d, {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        },
        data: {}
      });
    }
  }
};
</script>

<style lang="scss">
#fontSetting {
  font-family: 'Avenir', 'Helvetica Neue', 'Helvetica', 'Arial', 'Hiragino Sans', 'ヒラギノ角ゴシック', YuGothic,
    'Yu Gothic', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic';
}

.a {
  font-size: 38px;
  text-decoration: none;
}
.text_none {
  text-decoration: none;
}
</style>

<!--<template>-->
<!--<v-app>-->
<!--<v-app-bar app>-->
<!--<v-toolbar-title class="headline text-uppercase">-->
<!--<span>Vuetify</span>-->
<!--<span class="font-weight-light">MATERIAL DESIGN</span>-->
<!--</v-toolbar-title>-->
<!--<v-spacer></v-spacer>-->
<!--<v-btn-->
<!--text-->
<!--href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
<!--target="_blank"-->
<!--&gt;-->
<!--<span class="mr-2">Latest Release</span>-->
<!--</v-btn>-->
<!--</v-app-bar>-->

<!--<v-content>-->
<!--<HelloWorld/>-->
<!--</v-content>-->
<!--</v-app>-->
<!--</template>-->

<!--<script>-->
<!--import HelloWorld from './components/HelloWorld';-->

<!--export default {-->
<!--name: 'App',-->
<!--components: {-->
<!--HelloWorld,-->
<!--},-->
<!--data: () => ({-->
<!--//-->
<!--}),-->
<!--};-->
<!--</script>-->
