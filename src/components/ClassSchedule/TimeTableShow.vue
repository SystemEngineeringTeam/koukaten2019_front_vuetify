<template>
    <div>
        <!--<table class="table table-bordered">-->
        <!--<thead class="thead-dark">-->
        <!--<tr>-->
        <!--<th scope="col">-->
        <!--<template v-if="grade == 'year1'">1</template>-->
        <!--<template v-else-if="grade == 'year2'">2</template>-->
        <!--<template v-else-if="grade == 'year3'">3</template>-->
        <!--<template v-else>4</template>-->
        <!--<br>-->
        <!--<template v-if="semester == 'first'">前期</template>-->
        <!--<template v-else>後期</template>-->
        <!--</th>-->
        <!--<th scope="col">月</th>-->
        <!--<th scope="col">火</th>-->
        <!--<th scope="col">水</th>-->
        <!--<th scope="col">木</th>-->
        <!--<th scope="col">金</th>-->
        <!--</tr>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr v-for="(classes,day) in timetable_now['mon']">-->
        <!--<th>{{day.slice(0,1)}}</th>-->
        <!--<td v-for="piriods in timetable_now">-->
        <!--<TimeTableCell v-if="piriods[day] != null" :now="piriods[day]"></TimeTableCell>-->
        <!--</td>-->
        <!--</tr>-->

        <!--</tbody>-->
        <!--</table>-->


        <!--<v-expansion-panels>-->
        <!--<v-expansion-panel v-for="(day,i) in weekdays" :key="i">-->
        <!--<v-expansion-panel-header>{{day}}</v-expansion-panel-header>-->
        <!--<v-expansion-panel-content>-->
        <!--&lt;!&ndash;<template v-for="(time, i) in 7">&ndash;&gt;-->
        <!--<v-card max-width="344" class="mx-auto">-->
        <!--<v-card-title>I'm a title</v-card-title>-->
        <!--<v-card-text>I'm card text</v-card-text>-->
        <!--<v-card-actions>-->
        <!--<v-btn text>Click</v-btn>-->
        <!--</v-card-actions>-->
        <!--</v-card>-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--</v-expansion-panel-content>-->
        <!--</v-expansion-panel>-->
        <!--</v-expansion-panels>-->


        <template v-for="(day, i) in weekdays">
            <v-card>
                <v-card-title class="blue lighten-1">{{days_name[i]}}曜日</v-card-title>

                <v-list>
                    <template v-for="time in 7">
                        <v-divider></v-divider>
                        <v-subheader>{{time}}限目</v-subheader>
                        <v-list-item>
                            <TimeTableCell :is_edit="is_edit" :lecture="get_one_lecture(now_register, day, time)" :can_register="get_one_time_lectures(can_register, day, time)"></TimeTableCell>
                        </v-list-item>

                    </template>
                </v-list>


            </v-card>
        </template>
    </div>


</template>

<script>
    import TimeTableCell from "./TimeTableCell";

    export default {
        name: "TimeTableShow",
        data() {
            return {
                weekdays: ['mon', 'tue', 'wed', 'thu', 'fry'],
                days_name: ['月', '火', '水', '木', '金']
            }
        },
        components: {
            TimeTableCell,
        },
        props: ['now_register', 'can_register', 'is_edit'],
        methods: {
            get_one_lecture(lectures, day, time) {
                let c;
                lectures.forEach(function (obj) {
                    if (obj.weekday === day && obj.lec_time === time) {
                        c = obj;
                    }
                });
                return c;
            },
            get_one_time_lectures(lectures, day, time) {
                let c = [];
                lectures.forEach(function (obj) {
                    if (obj.weekday === day && obj.lec_time === time) {
                        c.push(obj)
                    }
                });
                return c;
            },
        }
    }
</script>

<style scoped>


    table {
        height: 100%;
    }

    td {
        padding: 0px;
        height: 100%;
        background-color: white;
    }
</style>
