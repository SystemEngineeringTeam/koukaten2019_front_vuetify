<template>
  <div>
    <v-simple-table dense>
      <thead>
        <tr>
          <th>単位表</th>
          <th>共通</th>
          <th>専門</th>
          <th>総合A</th>
          <th>総合A(英)</th>
          <th>総合B</th>
          <th>総単位</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 4" :key="i">
          <td>{{ i }}年</td>
          <td>{{ $store.state.unit_list[i]['必修']['共通'] + $store.state.unit_list[i]['選択']['共通'] }}</td>
          <td>{{ $store.state.unit_list[i]['必修']['専門'] + $store.state.unit_list[i]['選択']['専門'] }}</td>
          <td>{{ $store.state.unit_list[i]['必修']['総合A'] + $store.state.unit_list[i]['選択']['総合A'] }}</td>
          <td>{{ $store.state.english_unit_list[i]['必修'] + $store.state.english_unit_list[i]['選択'] }}</td>
          <td>{{ $store.state.unit_list[i]['必修']['総合B'] + $store.state.unit_list[i]['選択']['総合B'] }}</td>
          <td
            :class="{
              'red--text': !is_not_enough(grade_total_unit(i), max_unit_one_year)
            }"
          >
            {{ grade_total_unit(i) }}/{{ max_unit_one_year }}
          </td>
        </tr>
        <tr>
          <td>合計</td>
          <td
            :class="{
              'red--text': is_not_enough(classification_total_unit('共通'), graduate_unit.kyotu)
            }"
          >
            {{ classification_total_unit('共通') }}/{{ graduate_unit.kyotu }}
          </td>
          <td
            :class="{
              'red--text': is_not_enough(classification_total_unit('専門'), graduate_unit.senmon)
            }"
          >
            {{ classification_total_unit('専門') }}/{{ graduate_unit.senmon }}
          </td>
          <td
            :class="{
              'red--text': is_not_enough(classification_total_unit('総合A'), graduate_unit.A)
            }"
          >
            {{ classification_total_unit('総合A') }}/{{ graduate_unit.A }}
          </td>
          <td
            :class="{
              'red--text': is_not_enough(classification_total_unit('英語'), graduate_unit.english)
            }"
          >
            {{ classification_total_unit('英語') }}/{{ graduate_unit.english }}
          </td>
          <td
            :class="{
              'red--text': is_not_enough(classification_total_unit('総合B'), graduate_unit.B)
            }"
          >
            {{ classification_total_unit('総合B') }}/{{ graduate_unit.B }}
          </td>
          <td
            :class="{
              'red--text': is_not_enough(total_unit(), graduate_unit.all)
            }"
          >
            {{ total_unit() }}/{{ graduate_unit.all }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
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
      max_unit_one_year: 48
    };
  },

  created() {},
  beforeUpdate() {
    this.$store.commit('set_is_enough_unit_graduate', this.is_enough_unit_graduate());
    this.$store.commit('set_is_over_unit', this.is_over_unit());
  },
  props: ['grade'],
  methods: {
    is_enough_unit_graduate() {
      return (
        this.total_unit() >= this.graduate_unit.all &&
        this.classification_total_unit('共通') >= this.graduate_unit.kyotu &&
        this.classification_total_unit('専門') >= this.graduate_unit.senmon &&
        this.classification_total_unit('総合A') >= this.graduate_unit.A &&
        this.classification_total_unit('総合B') >= this.graduate_unit.B &&
        this.classification_total_unit('英語') >= this.graduate_unit.english
      );
    },
    is_over_unit() {
      let bool = true;
      for (let grade = 1; grade <= 4; grade++) {
        if (this.grade_total_unit(grade) > this.max_unit_one_grade) {
          bool = false;
        }
      }
      return bool;
    },
    total_unit() {
      let total_unit = 0;
      for (let grade = 1; grade <= 4; grade++) {
        total_unit += this.grade_total_unit(grade);
      }
      return total_unit;
    },
    grade_total_unit(grade) {
      let total_unit = 0;
      const unit_list = this.$store.state.unit_list;
      for (let key of Object.keys(unit_list[grade]['必修'])) {
        total_unit += unit_list[grade]['必修'][key];
      }
      for (let key of Object.keys(unit_list[grade]['選択'])) {
        total_unit += unit_list[grade]['選択'][key];
      }
      return total_unit;
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
