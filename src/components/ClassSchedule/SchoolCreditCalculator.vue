<template>
    <div class="wrapper">
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">総単位数</th>
                <th scope="col">共通教育科目</th>
                <th scope="col">専門教育科目</th>
                <th scope="col">総合A</th>
                <th scope="col">総合B</th>
                <th scope="col">外国語</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">{{ grade }}年時</th>
                <td>{{ oneyear_full_credit }} / {{ oneyear_lowest_full_credit }}</td>
                <td>{{ oneyear_kyotu_credit }}</td>
                <td>{{ oneyear_senmon_credit }}</td>
                <td>{{ oneyear_A_credit }}</td>
                <td>{{ oneyear_B_credit }}</td>
                <td>{{ oneyear_gaikoku_credit}}</td>
            </tr>
            <tr>
                <th scope="row">合計</th>
                <td>{{ full_credit }} / {{ lowest_full_credit }}</td>
                <td>{{ kyotu_credit }}</td>
                <td>{{ senmon_credit }}</td>
                <td>{{ A_credit }}</td>
                <td>{{ B_credit }}</td>
                <td>{{ gaikoku_credit}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                grade: 1,
                oneyear_full_credit: 0,
                oneyear_lowest_full_credit: 48,
                oneyear_kyotu_credit: 0,
                oneyear_senmon_credit: 0,
                oneyear_A_credit: 0,
                oneyear_B_credit: 0,
                oneyear_gaikoku_credit: 0,
                full_credit: 0,
                lowest_full_credit: 124,
                kyotu_credit: 0,
                senmon_credit: 0,
                A_credit: 0,
                B_credit: 0,
                gaikoku_credit: 0,
            };
        }
    }
</script>

<style scoped>
    .wrapper {
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
