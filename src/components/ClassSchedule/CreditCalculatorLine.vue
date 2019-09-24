<template>
  <div>
    <template v-for="unit in unit_kind">
      <td is="CreditCalculatorCell" :credit_now="unit"></td>
    </template>
  </div>
</template>

<script>
import CreditCalculatorCell from "./CreditCalculatorCell";

let a_semester, a_day, a_time;

export default {
  name: "CreditCalculatorLine",
  components: {
    CreditCalculatorCell
  },
  data() {
    return {
      grades: ["year1", "year2", "year3", "year4"],
      semesters: ["first", "second"],
      days: ["mon", "tue", "wed", "thu", "fri"],
      times: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"],
      unit_kind: ["共通", "専門", "総合A", "総合B"],
      s: 0
      // oneyear_full_credit: 0,
      // oneyear_lowest_full_credit: 48,
      // oneyear_kyotu_credit: 0,
      // oneyear_senmon_credit: 0,
      // oneyear_A_credit: 0,
      // oneyear_B_credit: 0,
      // oneyear_gaikoku_credit: 0,
      // full_credit: 0,
      // lowest_full_credit: 124,
      // kyotu_credit: 0,
      // senmon_credit: 0,
      // A_credit: 0,
      // B_credit: 0,
      // gaikoku_credit: 0,
    };
  },
  props: ["now", "grade"],
  created() {
    this.s = this.unit_sum(this.s);
  },
  methods: {
    unit_sum(s) {
      for (a_semester in this.now) {
        // if (this.now.hasOwnProperty(a_semester)) {
        for (a_day in a_semester) {
          // if (a_semester.hasOwnProperty(a_day)) {
          for (a_time in a_day) {
            // if (a_day.hasOwnProperty(a_time)) {
            s += a_time["credit"];
            // }
          }
          // }
        }
        // }
        return s;
      }
    }
  }
};
</script>

<style scoped></style>
