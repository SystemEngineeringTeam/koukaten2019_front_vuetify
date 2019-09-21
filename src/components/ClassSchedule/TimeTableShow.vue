<template>
  <div>
    <template v-for="(day, i) in weekdays">
      <v-card>
        <v-card-title class="blue lighten-1">{{days_name[i]}}曜日</v-card-title>

        <v-list>
          <template v-for="time in 7">
            <v-divider></v-divider>
            <v-subheader>{{time}}限目</v-subheader>
            <v-list-item>
              <TimeTableCell
                :is_edit="is_edit"
                :lecture="get_one_lecture(now_register, day, time)"
                :can_register="get_one_time_lectures(can_register, day, time)"
                :day="day"
                :time="time"
              ></TimeTableCell>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </template>
  </div>
</template>

<script>
import TimeTableCell from "./TimeTableCell";

export default {
  name: "TimeTableShow",
  data() {
    return {
      weekdays: ["mon", "tue", "wed", "thu", "fri"],
      days_name: ["月", "火", "水", "木", "金"]
    };
  },
  components: {
    TimeTableCell
  },
  props: ["now_register", "can_register", "is_edit"],
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
