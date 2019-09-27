<template>
  <div class="wrapper mx-5">
    <!--{{ $store.state.can_register_lectures }}-->
    <!--{{ $store.state.registered_lectures }}-->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-tabs v-model="tabs" show-arrows grow>
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
          <v-tabs v-model="tabs" show-arrows grow>
            <v-tab
              v-for="timetable in $store.state.timetables"
              :key="timetable.id"
              v-on:click="$store.commit('set_looking_timetable', timetable)"
            >
              <b>{{ timetable.grade }}{{ timetable.semester }}</b>
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12">
          <v-footer app>
            <v-col>
              <CreditCalculator :grade="$store.state.looking_timetable.grade"></CreditCalculator>
            </v-col>
          </v-footer>
        </v-col>
      </v-row>
    </v-container>
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
    }
  }
};
</script>
<style scoped></style>
