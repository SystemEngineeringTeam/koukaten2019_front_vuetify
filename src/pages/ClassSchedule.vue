<template>
    <div class="wrapper">
        <div>
            <select v-model="grade">
                <option value="year1">1</option>
                <option value="year2">2</option>
                <option value="year3">3</option>
                <option value="year4">4</option>
            </select>

            <p> {{ major }}</p>

            <select v-model="semester">
                <option value="first">前期</option>
                <option value="second">後期</option>
            </select>
        </div>

        <v-toolbar>
            <v-toolbar-items>
                <template v-for="g in grades">
                    <v-btn text v-on:click="set_grade(g); set_semester('first')"><b>{{g.slice(-1)}} 前期</b></v-btn>
                    <v-btn text v-on:click="set_grade(g); set_semester('second')"><b>{{g.slice(-1)}} 後期</b></v-btn>
                </template>
            </v-toolbar-items>
        </v-toolbar>

        <template v-for="(a_year_now,f_grade) in timetable_now">
            <template v-for="(a_semester_now,f_semester) in a_year_now">
                <TimeTableShow
                        v-show="is_show && f_grade === grade && f_semester === semester"
                        :grade="f_grade" :semester="f_semester"
                        :timetable_now="a_semester_now"></TimeTableShow>

                <TimeTableEditor
                        v-show="!is_show && f_grade === grade && f_semester === semester"
                        v-on:set="set_now"
                        :grade="f_grade" :semester="f_semester"
                        :timetable_now="a_semester_now"
                        :timetable_editor="timetable_editor[f_grade][f_semester]"></TimeTableEditor>
            </template>
        </template>

        <button v-show="is_show" v-on:click="is_show = false">
            編集する
        </button>

        <button v-show="!is_show" v-on:click="put_editor">
            保存する
        </button>

        <CreditCalculator :grade="grade" :now="timetable_now"></CreditCalculator>

    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';


    import TimeTableShow from "../components/ClassSchedule/TimeTableShow";
    import CreditCalculator from "../components/ClassSchedule/CreditCalculator";
    import TimeTableEditor from "../components/ClassSchedule/TimeTableEditor";

    const URL_BASE = 'http://localhost:3000/travels/timetable';

    export default {
        data() {
            return {
                user: 1,
                is_show: true,
                grade: "year1",
                semester: "first",
                major: "kk",
                grades: ['year1', 'year2', 'year3', 'year4'],
                semesters: ['first', 'second'],
                timetable_now: [{

                },{

                }],
                timetable_editor: [{

                },{

                }
                ]
            };

        },
        components: {
            TimeTableEditor,
            TimeTableShow,
            CreditCalculator,
        },
        created() {
            // Json取得
            // this.get_now(this.user);
            // Json取得後に呼び出される
            // this.$on('GET_NOW', () => {
            //     this.timetable_now = this.get_data();
            // });
            // this.get_editor(this.user);
        },
        computed: {},
        methods: {
            set_grade(g) {
                this.grade = g;
            },
            set_semester(s) {
                this.semester = s;
            },
            // get_now(user) {
            //     return axios.get(URL_BASE, {
            //         params: {
            //             // ここにクエリパラメータを指定する
            //             user: user,
            //         },
            //     }).then((res) => {
            //         Vue.set(this, 'timetable_now', res.data);
            //         this.$emit('GET_NOW');
            //     });
            // },
            // プロパティ名を指定してデータを取得
            get_data() {
                return this.$data["timetable_now"];
            },
            // get_editor(user) {
            //     return axios.get(URL_BASE + '/editor', {
            //         params: {
            //             // ここにクエリパラメータを指定する
            //             user: user,
            //         },
            //     })
            //         .then((res) => {
            //             Vue.set(this, 'timetable_editor', res.data['editor']);
            //         });
            // },
            set_now(data) {
                this.$set(this.timetable_now[data['grade']][data['semester']][data['day']], data['time'], data['now']);
                // this.$emit('GET_NOW');
            },
            put_editor() {
                return axios.put(URL_BASE + '/editor', 'timetable_now')
                    .then(() => {
                        this.is_show = true;
                        console.log('保存しました');
                    })
                    .catch(error => {
                        this.is_show = true;
                        console.log(error);
                    });
            },
        }
    }
</script>


<style scoped>
    .wrapper {
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
