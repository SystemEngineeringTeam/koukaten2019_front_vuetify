<template>
  <div class="wrapper mx-5">
    <!--{{ $store.state.can_register_lectures }}-->
    <!--{{ $store.state.registered_lectures }}-->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-tabs v-model="tabs"  show-arrows grow>
            <v-tab
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
                    timetable.semester
                  )
                "
                :grade="timetable.grade"
              ></TimeTableShow>
            </v-tab-item>
          </v-tabs-items>
          <v-tabs v-model="tabs"  show-arrows grow>
            <v-tab
                    v-for="timetable in $store.state.timetables"
                    :key="timetable.id"
                    v-on:click="$store.commit('set_looking_timetable', timetable)"
            >
              <b>{{ timetable.grade }}{{ timetable.semester }}</b>
            </v-tab>
          </v-tabs>
        </v-col>
        <div>
          <v-row align="center">
            <v-col cols="12">
              <v-btn
                fixed
                dark
                large
                right
                rounded
                elevation="10"
                color="orange"
                v-if="!is_edit"
                v-on:click="
                  is_edit = true;
                  $store.dispatch('get_can_register_lectures', $store.state.user.id);
                "
              >
                授業を登録
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn fixed large dark right rounded elevation="10" color="red" v-else v-on:click="save_lectuers">
                登録を保存
                <v-icon dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-col cols="12">
          <v-footer app>
            <v-col>
              <CreditCalculator :grade="$store.state.looking_timetable.grade"></CreditCalculator>
            </v-col>
          </v-footer>
        </v-col>
      </v-row>
    </v-container>

    <!--ダイアログ-->
    <v-dialog v-model="show_dialog" max-width="290">
      <v-card>
        <v-card-title>
          確認
        </v-card-title>

        <v-card-text>
          <template v-if="!this.$store.state.is_enough_unit_graduate"
            >卒業要件を満たしていません</template
          >
          <br />
          <template v-if="!this.$store.state.is_over_unit"
            >1年間に取得できる単位数をオーバーしています</template
          >
          <br />
          <br />
          このまま登録しますか？
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="green darken-1" text @click="show_dialog = false">
            キャンセル
          </v-btn>

          <v-btn color="green darken-1" text @click="register_on_dialog()">
            登録する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

import TimeTableShow from '../components/ClassSchedule/TimeTableShow';
import CreditCalculator from '../components/ClassSchedule/CreditCalculator';
import TimeTableEditor from '../components/ClassSchedule/TimeTableEditor';

export default {
  data() {
    return {
      show_dialog: false,
      tabs: null,
      user: 1,
      is_show: true,
      is_edit: false,
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
      timetable: []
    };
  },
  components: {
    TimeTableShow,
    TimeTableEditor,
    CreditCalculator
  },
  created() {
    this.$store.dispatch('get_registered_lectures', this.$store.state.user.id);
  },
  beforeUpdate() {
    this.$store.commit('unit_calculate');
  },
  methods: {
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
    table() {
      return this.$store.state.registered_lectures;
    },
    get_grade_half_lectures(lectures, grade, semester) {
      let c = [];
      lectures.forEach(function(obj) {
        if (obj.grade === grade && obj.semester === semester) {
          c.push(obj);
        }
      });
      return c;
    },
    get_grade_half_sougouB_lectures(lectures, grade, semester) {
      let c = [];
      lectures.forEach(function(obj) {
        if (obj.semester === semester) {
          if (obj.grade === grade) {
            c.push(obj);
          } else if (obj.classification === '総合B' && obj.grade <= grade) {
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
        this.is_edit = false;
      }
    },
    register_on_dialog() {
      this.put_registered_lectures(this.mold_registered_lectures());
      this.is_edit = false;
      this.show_dialog = false;
    }
  }
};
</script>
<style scoped></style>
