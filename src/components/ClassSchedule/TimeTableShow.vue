<template>
    <div class="wrapper">
        <table class="table table-bordered">
            <thead class="thead-dark">
            <tr>
                <th scope="col">
                    <template v-if="grade == 'year1'">1</template>
                    <template v-else-if="grade == 'year2'">2</template>
                    <template v-else-if="grade == 'year3'">3</template>
                    <template v-else>4</template>
                    <template v-if="semester == 'first'">前期</template>
                    <template v-else>後期</template>
                </th>
                <th scope="col">月</th>
                <th scope="col">火</th>
                <th scope="col">水</th>
                <th scope="col">木</th>
                <th scope="col">金</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(classes,day) in timetable_now['mon']">
                <th>{{day}}</th>
                <td v-for="piriods in timetable_now">
                    <TimeTableCell v-if="piriods[day] != null" :now="piriods[day]"></TimeTableCell>
                </td>
            </tr>

            </tbody>
        </table>
    </div>


</template>

<script>
    import TimeTableCell from "./TimeTableCell";

    export default {
        name: "TimeTableShow",
        components: {
            TimeTableCell,
        },
        props: ['grade', 'semester', 'timetable_now'],
    }
</script>

<style scoped>
    .wrapper {
        padding-left: 20px;
        padding-right: 20px;
    }

    table {
        height: 100%;
    }

    td {
        padding: 0px;
        height: 100%;
        background-color: white;
    }
</style>
