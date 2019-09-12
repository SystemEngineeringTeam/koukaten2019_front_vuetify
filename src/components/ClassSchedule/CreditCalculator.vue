<template>
  <div>
    <!-- {{get_credit(now[grade])}}
        <table class="table table-bordered">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">合計</th>
                <th scope="col">総合</th>
                <th scope="col">専門</th>
                <th scope="col">専門</th>
            </tr>
            </thead>
            <tbody>

            <tr>
                <th>累計</th>
                <td v-for="i in 4">
                    <CreditCalculatorCell :credit_now="i"></CreditCalculatorCell>
                </td>
            </tr>

            <tr v-for="(a_year_now,f_grade) in now">
                <th>{{f_grade}}</th>
                <td v-for="i in 4">
                    <CreditCalculatorCell :credit_now="i"></CreditCalculatorCell>
                </td>
            </tr>

            </tbody>
    </table>-->
    <v-container>
      <v-row>
        <v-col cols="12">
    <v-simple-table>
      <br>
      <tr>
        <td class="font_size">単位表</td>
        <td class="font_size">総単位数</td>
        <td class="font_size">共通教育科目</td>
        <td class="font_size">専門共通科目</td>
        <td class="font_size">総合A</td>
        <td class="font_size">総合B</td>
        <td class="font_size">外国語</td>
      </tr>
      <tr>
        <td>１年次の履修単位</td>
        <td>/48</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>2年次の履修単位</td>
        <td>/48</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>3年次の履修単位</td>
        <td>/48</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>4年次の履修単位</td>
        <td>/48</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>必修</td>
        <td>/48</td>
        <td>/4</td>
        <td>/31</td>
        <td>/4</td>
        <td>必修はありません</td>
        <td>/4</td>
      </tr>
      <tr>
        <td>合計</td>
        <td>/124</td>
        <td>4/10</td>
        <td>31/94</td>
        <td>4/8</td>
        <td>/12</td>
        <td>/8</td>
      </tr>
    </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CreditCalculatorCell from "./CreditCalculatorCell";

export default {
  data() {
    return {
      grades: ["year1", "year2", "year3", "year4"],
      semesters: ["first", "second"],
      days: ["mon", "tue", "wed", "thu", "fri"],
      times: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"]
    };
  },

  created() {
    // this.get_kyoutu_credit('year1')
  },
  components: {
    CreditCalculatorCell
  },
  props: ["now", "grade"],
  methods: {
    get_credit(obj) {
      let c = 0;
      if (typeof obj === "object") {
        for (var key in obj) {
          if (key == "credit") {
            c += obj["credit"];
          } else {
            c += this.get_credit(obj[key]);
          }
        }
        return c;
      } else {
        return 0;
      }
    },
    getColor(total_unit) {
      return "red";
    }

    // get_kyoutu_credit: function (grade) {
    //     let num = 0;
    //     for (let semester in this.semesters) {
    //         for(let day in this.days){
    //             for(let time in this.times){
    //                 if(this.now[grade][semester][day] !== null) {
    //                     // num += this.now[grade][semester][day][time]["credit"];
    //                 }
    //             }
    //         }
    //     }
    //     this.c = num
    // }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
.font_size {
  text-align: center;
  font-size: 20px;
}
td {
  text-align: right;
  border: solid 1px;
  border-color: rgb(239, 239, 239);
  padding: 0.5em;
}
</style>
