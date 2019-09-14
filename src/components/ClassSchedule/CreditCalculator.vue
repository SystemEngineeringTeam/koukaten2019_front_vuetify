<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-simple-table>
                        <tr>
                            <td class="font_size">単位表</td>
                            <td class="font_size">総単位</td>
                            <td class="font_size">共通</td>
                            <td class="font_size">専門</td>
                            <td class="font_size">総合A</td>
                            <td class="font_size">総合B</td>
                            <td class="font_size">外国語</td>
                        </tr>
                        <template v-for="i in 4">
                            <tr v-if="grade === i">
                                <td>{{i}}年</td>
                                <td>{{year_total_unit(i)}}/48</td>
                                <td>{{$store.state.unit_list[i]["共通"]}}</td>
                                <td>{{$store.state.unit_list[i]["専門"]}}</td>
                                <td>{{$store.state.unit_list[i]["総合A"]}}</td>
                                <td>{{$store.state.unit_list[i]["総合B"]}}</td>
                                <td>{{$store.state.unit_list[i]["外国語"]}}</td>
                            </tr>
                        </template>
                        <!--<tr>-->
                            <!--<td>必修</td>-->
                            <!--<td>/48</td>-->
                            <!--<td>/4</td>-->
                            <!--<td>/31</td>-->
                            <!--<td>/4</td>-->
                            <!--<td>必修はありません</td>-->
                            <!--<td>/4</td>-->
                        <!--</tr>-->
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
            };
        },

        created() {
        },
        components: {
            CreditCalculatorCell
        },
        props: ["grade"],
        methods: {
            year_total_unit(grade){
                return this.$store.state.unit_list[grade]["共通"]+this.$store.state.unit_list[grade]["専門"]+this.$store.state.unit_list[grade]["総合A"]+this.$store.state.unit_list[grade]["総合B"];
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
