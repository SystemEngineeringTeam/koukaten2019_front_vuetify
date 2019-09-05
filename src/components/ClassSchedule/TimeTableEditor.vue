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
            <tr v-for="(classes,piriod) in timetable_now['mon']">
                <th>{{piriod}}</th>
                <td v-for="(piriods, day) in timetable_now">
                    <!--<div>-->
                    <!--{{timetable_editor[day][piriod] !== null}}-->
                    <!--</div>-->
                    <TimeTableButton
                            v-if="timetable_editor[day][piriod] !== null"
                            :modal_id=grade+semester+day+piriod
                            :now="piriods[piriod]"
                            :data_list="timetable_editor[day][piriod]"
                            :day="day"
                            :time="piriod"
                            v-on:set_data="set_index_data"
                    ></TimeTableButton>
                </td>
            </tr>

            </tbody>
        </table>
    </div>


</template>

<script>
    import TimeTableButton from "./TimeTableButton";

    export default {
        name: "TimeTableEditor",
        components: {
            TimeTableButton,
        },
        props: ['grade', 'semester', 'timetable_now', 'timetable_editor', 'store'],
        methods: {
            set_index_data: function (data) {
                this.$emit(
                    'set',
                    {
                        now: data['now'],
                        grade: this.grade,
                        semester: this.semester,
                        day: data['day'],
                        time: data['time']
                    }
                )
            }
        },
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
