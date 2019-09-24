<template>
  <div>
    <v-simple-table dence>
      <thead>
        <tr>
          <th>単位表</th>
          <th>総単位</th>
          <th>共通</th>
          <th>専門</th>
          <th>総合A</th>
          <th>総合B</th>
          <th>外国語</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="i in 4">
          <tr v-if="grade === i">
            <td>{{ i }}年</td>
            <td>{{ grade_total_unit(i) }}/48</td>
            <td>{{ $store.state.unit_list[i]["共通"] }}</td>
            <td>{{ $store.state.unit_list[i]["専門"] }}</td>
            <td>{{ $store.state.unit_list[i]["総合A"] }}</td>
            <td>{{ $store.state.unit_list[i]["総合B"] }}</td>
            <td>{{ $store.state.unit_list[i]["外国語"] }}</td>
          </tr>
        </template>
        <tr>
          <td>合計</td>
          <td>{{ total_unit() }}/124</td>
          <td>{{ compulsory_total_unit("共通") }}/10</td>
          <td>{{ compulsory_total_unit("専門") }}/94</td>
          <td>{{ compulsory_total_unit("総合A") }}/8</td>
          <td>{{ compulsory_total_unit("総合B") }}/12</td>
          <td>{{ compulsory_total_unit("外国語") }}/8</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import CreditCalculatorCell from "./CreditCalculatorCell";

export default {
  data() {
    return {};
  },

  created() {},
  components: {
    CreditCalculatorCell
  },
  props: ["grade"],
  methods: {
    total_unit() {
      let total_unit = 0;
      for (let grade = 1; grade <= 4; grade++) {
        total_unit +=
          this.$store.state.unit_list[grade]["共通"] +
          this.$store.state.unit_list[grade]["専門"] +
          this.$store.state.unit_list[grade]["総合A"] +
          this.$store.state.unit_list[grade]["総合B"];
      }
      return total_unit;
    },
    grade_total_unit(grade) {
      return (
        this.$store.state.unit_list[grade]["共通"] +
        this.$store.state.unit_list[grade]["専門"] +
        this.$store.state.unit_list[grade]["総合A"] +
        this.$store.state.unit_list[grade]["総合B"]
      );
    },
    compulsory_total_unit(compulsory) {
      let total_unit = 0;
      for (let grade = 1; grade <= 4; grade++) {
        total_unit += this.$store.state.unit_list[grade][compulsory];
      }
      return total_unit;
    }
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
