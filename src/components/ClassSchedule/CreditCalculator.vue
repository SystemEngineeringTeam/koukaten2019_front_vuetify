<template>
    <div class="wrapper">
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
        </table>
    </div>
</template>

<script>
    import CreditCalculatorCell from './CreditCalculatorCell'

    export default {
        data() {
            return {
                grades: ['year1', 'year2', 'year3', 'year4'],
                semesters: ['first', 'second'],
                days: ['mon', 'tue', 'wed', 'thu', 'fri'],
                times: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'],
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
        created() {
            // this.get_kyoutu_credit('year1')
        },
        components: {
            CreditCalculatorCell,
        },
        props: [
            'now',
            'grade',
        ],
        methods: {
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
    }
</script>

<style scoped>
    .wrapper {
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
