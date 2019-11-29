<template>
  <div class="mx-4">
    <!--{{ $store.state.can_register_lectures }}-->
    {{ $store.state.registered_lectures }}
    <!-- {{ $store.state.unit_list }} -->
    <!-- {{ $store.state.user }} -->
    <!-- {{ $route.path }} -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text class="headline text-center"
              >計画が立てられたら「保存」ボタンを押して保存してください</v-card-text
            >
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-row justify="space-around">
              <v-checkbox color="success" v-model="compulsory" label="必修"></v-checkbox>
              <v-checkbox color="success" v-model="required_compulsory" label="選択必修"></v-checkbox>
              <v-checkbox color="success" v-model="choice" label="選択"></v-checkbox>
            </v-row>
          </v-card>
          <br />
          <v-card>
            <v-row justify="space-around">
              <v-checkbox color="success" v-model="common" label="共通"></v-checkbox>
              <v-checkbox color="success" v-model="specialty" label="専門"></v-checkbox>
              <v-checkbox color="success" v-model="general_A" label="総合A"></v-checkbox>
              <v-checkbox color="success" v-model="general_A_en" label="総合A(英)"></v-checkbox>
              <v-checkbox color="success" v-model="general_B" label="総合B"></v-checkbox>
            </v-row>
          </v-card>
          <br />
          <v-tabs background-color="indigo" v-model="tabs" show-arrows grow dark>
            <v-tab
              class="headline"
              v-for="timetable in $store.state.timetables"
              :key="timetable.id"
              v-on:click="$store.commit('set_looking_timetable', timetable)"
            >
              <b>{{ timetable.grade }}{{ timetable.semester }}</b>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="timetable in timetables" :key="timetable.id">
              <TimeTableShow
                :is_edit="is_edit"
                :now_register="
                  get_grade_half_lectures($store.state.registered_lectures, timetable.grade, timetable.semester)
                "
                :can_register="
                  get_grade_half_sougouB_lectures(
                    $store.state.can_register_lectures,
                    timetable.grade,
                    timetable.semester,
                    common,
                    specialty,
                    general_A,
                    general_A_en,
                    general_B,
                    compulsory,
                    required_compulsory,
                    choice
                  )
                "
                :grade="timetable.grade"
              ></TimeTableShow>
            </v-tab-item>
          </v-tabs-items>
          <!-- <v-tabs v-model="tabs" show-arrows grow>
            <v-tab
              class="headline"
              v-for="timetable in $store.state.timetables"
              :key="timetable.id"
              v-on:click="$store.commit('set_looking_timetable', timetable)"
            >
              <b>{{ timetable.grade }}{{ timetable.semester }}</b>
            </v-tab>
          </v-tabs>-->
        </v-col>
      </v-row>
    </v-container>

    <!--ダイアログ-->
    <v-dialog v-model="show_dialog" max-width="400">
      <v-card>
        <v-card-title class="display-1 font-weight-bold">確認</v-card-title>

        <v-card-text class="headline font-weight-bold">
          <template v-if="!this.$store.state.is_enough_unit_graduate">
            卒業要件を満たしていません
            <br />
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
            <br />以下の単位が足りていません
            <br />
          </template>
          <template v-if="is_not_enough(classification_total_unit('共通'), graduate_unit.kyotu)">
            共通
            <br />
          </template>
          <template v-if="is_not_enough(classification_total_unit('専門'), graduate_unit.senmon)">
            専門
            <br />
          </template>
          <template v-if="is_not_enough(classification_total_unit('総合A'), graduate_unit.A)">
            総合A
            <br />
          </template>
          <template v-if="is_not_enough(classification_total_unit('英語'), graduate_unit.english)">
            総合A(英)
            <br />
          </template>
          <template v-if="is_not_enough(classification_total_unit('総合B'), graduate_unit.B)"
            >総合B</template
          >
          <br />
          <template v-if="!this.$store.state.is_over_unit"
            >1年間に取得できる単位数をオーバーしています</template
          >
          <br />このまま登録しますか？
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

    <!--登録ボタン-->

    <v-bottom-navigation fixed>
      <v-card>
        <v-card-text>
          <span>共通:</span>
          <span
            :class="{
              'yellow--text text--darken-2': is_not_enough(classification_total_unit('共通'), graduate_unit.kyotu),
              'green--text': !is_not_enough(classification_total_unit('共通'), graduate_unit.kyotu)
            }"
            class="font-weight-bold"
            >{{ diff_unit(classification_total_unit('共通'), graduate_unit.kyotu) }}</span
          >
          <span>専門:</span>
          <span
            :class="{
              'yellow--text text--darken-2': is_not_enough(classification_total_unit('専門'), graduate_unit.senmon),
              'green--text': !is_not_enough(classification_total_unit('専門'), graduate_unit.senmon)
            }"
            class="font-weight-bold"
            >{{ diff_unit(classification_total_unit('専門'), graduate_unit.senmon) }}</span
          >
          <span>総合A:</span>
          <span
            :class="{
              'yellow--text text--darken-2': is_not_enough(classification_total_unit('総合A'), graduate_unit.A),
              'green--text': !is_not_enough(classification_total_unit('総合A'), graduate_unit.A)
            }"
            class="font-weight-bold"
            >{{ diff_unit(classification_total_unit('総合A'), graduate_unit.A) }}</span
          >
          <span>総合A(英):</span>
          <span
            :class="{
              'yellow--text text--darken-2': is_not_enough(classification_total_unit('英語'), graduate_unit.english),
              'green--text': !is_not_enough(classification_total_unit('英語'), graduate_unit.english)
            }"
            class="font-weight-bold"
            >{{ diff_unit(classification_total_unit('英語'), graduate_unit.english) }}</span
          >
          <span>総合B:</span>
          <span
            :class="{
              'yellow--text text--darken-2': is_not_enough(classification_total_unit('総合B'), graduate_unit.B),
              'green--text': !is_not_enough(classification_total_unit('総合B'), graduate_unit.B)
            }"
            class="font-weight-bold"
            >{{ diff_unit(classification_total_unit('総合B'), graduate_unit.B) }}</span
          >
        </v-card-text>
      </v-card>

      <v-btn value="save" v-on:click="save_lectuers">
        <span>保存</span>
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>

      <v-btn value="delete" v-on:click="delete_lectuers">
        <span>全削除</span>
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn value="unit" v-on:click="sheet = !sheet">
        <span>単位確認</span>
        <v-icon>mdi-numeric</v-icon>
      </v-btn>

      <v-btn value="unit" v-on:click="template_lectuers">
        <span>テンプレート</span>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-bottom-sheet v-model="sheet">
      <v-sheet>
        <CreditCalculator></CreditCalculator>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use(Vuex);

import TimeTableShow from '../components/ClassSchedule/TimeTableShow';
import CreditCalculator from '../components/ClassSchedule/CreditCalculator';

export default {
  data() {
    return {
      graduate_unit: {
        all: 124,
        kyotu: 10,
        senmon: 94,
        A: 8,
        B: 12,
        english: 6
      },
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
      sheet: false
    };
  },
  components: {
    TimeTableShow,
    CreditCalculator
  },
  created() {
    const promis = this.$store.dispatch('get_registered_lectures', this.$store.state.user.id);
    promis.then(this.$store.dispatch('get_can_register_lectures', this.$store.state.user.id));
  },
  beforeUpdate() {
    this.$store.commit('unit_calculate');
  },
  methods: {
    template_lectuers() {
      this.$store.dispatch('get_template');
    },
    diff_unit(total_unit, enough_unit) {
      let diff_unit = enough_unit - total_unit;
      if (diff_unit < 0) {
        diff_unit *= -1;
      }
      return diff_unit;
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
    is_not_enough(unit, enough_unit) {
      return unit < enough_unit;
    },
    mold_registered_lectures() {
      let data = [];
      let students_id = this.$store.state.user.id;
      let before_post_registered_lectures = this.$store.state.registered_lectures.filter(function(e, i, self) {
        return self.findIndex(object => object.subject_code === e.subject_code) === i;
      });
      before_post_registered_lectures.forEach(lectures =>
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
    table() {
      return this.$store.state.registered_lectures;
    },
    get_grade_half_lectures(lectures, grade, semester) {
      let c = [];
      lectures.forEach(function(obj) {
        if (obj.grade === grade && (obj.semester === semester || obj.semester === '通年')) {
          c.push(obj);
        }
      });
      return c;
    },
    get_grade_half_sougouB_lectures(
      lectures,
      grade,
      semester,
      common,
      specialty,
      general_A,
      general_A_en,
      general_B,
      compulsory,
      required_compulsory,
      choice
    ) {
      let c = [];
      lectures.forEach(function(obj) {
        if (obj.semester === semester || obj.semester === '通年') {
          if (obj.grade === grade) {
            if (compulsory == true && obj.compulsory === '必修') {
              if (common == true && obj.classification === '共通') {
                c.push(obj);
              }
              if (specialty == true && obj.classification === '専門') {
                c.push(obj);
              }
              if (general_A == true && obj.classification === '総合A') {
                c.push(obj);
              }
              if (
                general_A_en == true &&
                obj.classification === '総合A' &&
                obj.isenglish == true &&
                general_A == false
              ) {
                c.push(obj);
              }
              if (general_B == true && obj.classification === '総合B') {
                c.push(obj);
              }
            }
            if (required_compulsory == true && obj.compulsory === '選択必修') {
              if (common == true && obj.classification === '共通') {
                c.push(obj);
              }
              if (specialty == true && obj.classification === '専門') {
                c.push(obj);
              }
              if (general_A == true && obj.classification === '総合A') {
                c.push(obj);
              }
              if (
                general_A_en == true &&
                obj.classification === '総合A' &&
                obj.isenglish == true &&
                general_A == false
              ) {
                c.push(obj);
              }
              if (general_B == true && obj.classification === '総合B') {
                c.push(obj);
              }
            }
            if (choice == true && obj.compulsory === '選択') {
              if (common == true && obj.classification === '共通') {
                c.push(obj);
              }
              if (specialty == true && obj.classification === '専門') {
                c.push(obj);
              }
              if (general_A == true && obj.classification === '総合A') {
                c.push(obj);
              }
              if (
                general_A_en == true &&
                obj.classification === '総合A' &&
                obj.isenglish == true &&
                general_A == false
              ) {
                c.push(obj);
              }
              if (general_B == true && obj.classification === '総合B') {
                c.push(obj);
              }
            }
          } else if (general_B == true && obj.classification === '総合B' && obj.grade <= grade && choice == true) {
            c.push(obj);
          }
        }
      });
      return c;
    },
    put_registered_lectures(data) {
      let d = { data: data };
      axios.put(process.env.VUE_APP_URL_EDITOR, d, {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        },
        data: {}
      });
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
    register_on_dialog() {
      this.put_registered_lectures(this.mold_registered_lectures());
      this.show_dialog = false;
    }
  }
};
</script>
<style scoped>
.v-bottom-navigation * {
  font-size: 2.6vw;
}
.v-bottom-navigation .v-btn * {
  font-size: 1.3vw;
}
</style>
