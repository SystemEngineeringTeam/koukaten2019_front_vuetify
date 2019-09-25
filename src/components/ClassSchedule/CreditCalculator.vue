<template>
    <div>
        <v-simple-table dense>
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
                    <td>{{ grade_total_unit(i) }}/{{max_unit_one_grade}}</td>
                    <td>{{ $store.state.unit_list[i]["共通"] }}</td>
                    <td>{{ $store.state.unit_list[i]["専門"] }}</td>
                    <td>{{ $store.state.unit_list[i]["総合A"] }}</td>
                    <td>{{ $store.state.unit_list[i]["総合B"] }}</td>
                    <td>{{ $store.state.unit_list[i]["外国語"] }}</td>
                </tr>
            </template>
            <tr>
                <td>合計</td>
                <td>{{ total_unit() }}/{{ graduate_unit.all }}</td>
                <td>{{ compulsory_total_unit("共通") }}/{{ graduate_unit.kyotu }}</td>
                <td>{{ compulsory_total_unit("専門") }}/{{ graduate_unit.senmon }}</td>
                <td>{{ compulsory_total_unit("総合A") }}/{{ graduate_unit.A }}</td>
                <td>{{ compulsory_total_unit("総合B") }}/{{ graduate_unit.B }}</td>
                <td>{{ compulsory_total_unit("外国語") }}/{{ graduate_unit.english }}</td>
            </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>

<script>
    import CreditCalculatorCell from "./CreditCalculatorCell";

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
                max_unit_one_grade: 48,
            };
        },

        created() {
        },
        beforeUpdate() {
            this.$store.commit("set_is_enough_unit_graduate", this.is_enough_unit_graduate());
            this.$store.commit("set_is_over_unit", this.is_over_unit());
        },
        components: {
            CreditCalculatorCell
        },
        props: ["grade"],
        methods: {
            is_enough_unit_graduate() {
                return (
                    this.total_unit() >= this.graduate_unit.all &&
                    this.compulsory_total_unit("共通") >= this.graduate_unit.kyotu &&
                    this.compulsory_total_unit("専門") >= this.graduate_unit.senmon &&
                    this.compulsory_total_unit("総合A") >= this.graduate_unit.A &&
                    this.compulsory_total_unit("総合B") >= this.graduate_unit.B &&
                    this.compulsory_total_unit("外国語") >= this.graduate_unit.english
                );
            },
            is_over_unit() {
                let bool = true;
                for (let grade = 1; grade <= 4; grade++){
                    if(this.grade_total_unit(grade) > this.max_unit_one_grade){
                        bool = false;
                    }
                }
                return bool;
            },
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
