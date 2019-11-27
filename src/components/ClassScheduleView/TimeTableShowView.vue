<template>
  <v-row>
    <v-col cols="md-2.5 sm-12" v-for="(day, i) in weekdays" :key="day">
      <v-card color="#78BBE6">
        <v-card-title class="indigo white--text display-1 text-center" position:absolute
          >{{ days_name[i] }}曜日</v-card-title
        >
        <v-list class="mx-1 my-1" v-for="time in 7" :key="time">
          <v-subheader class="headline">{{ time }}限目</v-subheader>
          <v-list-item>
            <TimeTableCellView
              :is_edit="is_edit"
              :lecture="get_one_lecture(now_register, day, time)"
              :can_register="get_one_time_lectures(can_register, day, time)"
              :grade="grade"
              :day="day"
              :time="time"
            ></TimeTableCellView>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TimeTableCellView from './TimeTableCellView';

export default {
  name: 'TimeTableShowView',
  data() {
    return {
      weekdays: ['mon', 'tue', 'wed', 'thu', 'fri'],
      days_name: ['月', '火', '水', '木', '金']
    };
  },
  components: {
    TimeTableCellView
  },
  props: ['now_register', 'can_register', 'is_edit', 'grade'],
  methods: {
    get_one_lecture(lectures, day, time) {
      let c;
      lectures.forEach(function(obj) {
        if (obj.weekday === day && obj.lec_time === time) {
          c = obj;
        }
      });
      return c;
    },
    get_one_time_lectures(lectures, day, time) {
      let c = [];
      lectures.forEach(function(obj) {
        if (obj.weekday === day && obj.lec_time === time) {
          c.push(obj);
        }
      });
      return c;
    }
  }
};
</script>

<style scoped>
table {
  height: 100%;
}

td {
  padding: 0px;
  height: 100%;
  background-color: white;
}
</style>
