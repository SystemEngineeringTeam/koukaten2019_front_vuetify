<template>
    <div class="wrapper">
        <v-toolbar>
            <v-toolbar-items>
                <template v-for="grade in grades">
                    <v-btn text v-for="semester in semesters" v-on:click="set_grade(grade); set_semester(semester)"><b>{{grade}}{{semester}}</b></v-btn>
                </template>
            </v-toolbar-items>
        </v-toolbar>

        <v-btn v-on:click="get_now()"></v-btn>

        <template v-for="grade in grades">
            <template v-for="semester in semesters">
                <TimeTableShow v-if="grade == looking_grade && semester == looking_semester" :now="get_grade_half_lecture(timetable_now, grade, semester)"></TimeTableShow>

                <!--<TimeTableEditor-->
                <!--v-show="!is_show && f_grade === grade && f_semester === semester"-->
                <!--v-on:set="set_now"-->
                <!--:grade="f_grade" :semester="f_semester"-->
                <!--:timetable_now="a_semester_now"-->
                <!--:timetable_editor="timetable_editor[f_grade][f_semester]"></TimeTableEditor>-->
            </template>
        </template>

        <!--{{timetable}}-->
        <!--{{timetable_now}}-->

        <!--<button v-show="is_show" v-on:click="is_show = false">-->
        <!--編集する-->
        <!--</button>-->

        <!--<button v-show="!is_show" v-on:click="put_editor">-->
        <!--保存する-->
        <!--</button>-->

        <!--<CreditCalculator :grade="grade" :now="timetable_now"></CreditCalculator>-->

    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    import TimeTableShow from "../components/ClassSchedule/TimeTableShow";
    // import CreditCalculator from "../components/ClassSchedule/CreditCalculator";
    // import TimeTableEditor from "../components/ClassSchedule/TimeTableEditor";

    export default {
        data() {
            return {
                user: 1,
                is_show: true,
                looking_grade: 1,
                looking_semester: "前期",
                major: "kk",
                grades: [1, 2, 3, 4],
                semesters: ['前期', '後期'],
                timetable_now: [
                    {
                        "subject_code": "k1025",
                        "class_code": "20",
                        "name": "普通の授業",
                        "teacher_name1": "秦 健心",
                        "teacher_name2": "先 生名",
                        "classification": "総合B",
                        "compulsory": "選択",
                        "isenglish": false,
                        "grade": 1,
                        "semester": "前期",
                        "weekday": "mon",
                        "lec_time": 1,
                        "continuous": 1,
                        "unit": 2,
                        "syllabus": "https://hackmd.io/@8UP5vEhpRieQqC06SyUfsg/S1WpVJSBH",
                    },
                    {
                        "subject_code": "k1025",
                        "class_code": "20",
                        "name": "英語の授業",
                        "teacher_name1": "秦 健心",
                        "teacher_name2": "先 生名",
                        "classification": "総合A",
                        "compulsory": "必修",
                        "isenglish": true,
                        "grade": 1,
                        "semester": "前期",
                        "weekday": "tue",
                        "lec_time": 1,
                        "continuous": 1,
                        "unit": 2,
                        "syllabus": "https://hackmd.io/@8UP5vEhpRieQqC06SyUfsg/S1WpVJSBH",
                    },
                    {
                        "subject_code": "k1025",
                        "class_code": "20",
                        "name": "2コマの必修授業",
                        "teacher_name1": "秦 健心",
                        "teacher_name2": "先 生名",
                        "classification": "共通",
                        "compulsory": "選択",
                        "isenglish": false,
                        "grade": 1,
                        "semester": "前期",
                        "weekday": "wed",
                        "lec_time": 1,
                        "continuous": 2,
                        "unit": 3,
                        "syllabus": "https://hackmd.io/@8UP5vEhpRieQqC06SyUfsg/S1WpVJSBH",
                    },
                    {
                        "subject_code": "k1025",
                        "class_code": "20",
                        "name": "2コマの選択授業",
                        "teacher_name1": "秦 健心",
                        "teacher_name2": "先 生名",
                        "classification": "専門",
                        "compulsory": "選択",
                        "isenglish": false,
                        "grade": 1,
                        "semester": "前期",
                        "weekday": "thu",
                        "lec_time": 1,
                        "continuous": 1,
                        "unit": 2,
                        "syllabus": "https://connpass.com/dashboard/",
                    },
                ],
                timetable_editor: [
                    {
                        "subject_code": "k1025",
                        "class_code": "20",
                        "name": "普通の授業",
                        "teacher_name1": "秦 健心",
                        "teacher_name2": "先 生名",
                        "classification": "総合B",
                        "compulsory": "選択",
                        "isenglish": false,
                        "grade": 1,
                        "semester": "前期",
                        "weekday": "mon",
                        "lec_time": 2,
                        "continuous": 1,
                        "unit": 2,
                        "syllabus": "https://hackmd.io/@8UP5vEhpRieQqC06SyUfsg/S1WpVJSBH",
                    },
                    {
                        "subject_code": "k1025",
                        "class_code": "20",
                        "name": "英語の授業",
                        "teacher_name1": "秦 健心",
                        "teacher_name2": "先 生名",
                        "classification": "総合A",
                        "compulsory": "必修",
                        "isenglish": true,
                        "grade": 1,
                        "semester": "前期",
                        "weekday": "tue",
                        "lec_time": 2,
                        "continuous": 1,
                        "unit": 2,
                        "syllabus": "https://hackmd.io/@8UP5vEhpRieQqC06SyUfsg/S1WpVJSBH",
                    },
                    {
                        "subject_code": "k1025",
                        "class_code": "20",
                        "name": "2コマの必修授業",
                        "teacher_name1": "秦 健心",
                        "teacher_name2": "先 生名",
                        "classification": "共通",
                        "compulsory": "選択",
                        "isenglish": false,
                        "grade": 1,
                        "semester": "前期",
                        "weekday": "wed",
                        "lec_time": 2,
                        "continuous": 2,
                        "unit": 3,
                        "syllabus": "https://hackmd.io/@8UP5vEhpRieQqC06SyUfsg/S1WpVJSBH",
                    },
                    {
                        "subject_code": "k1025",
                        "class_code": "20",
                        "name": "2コマの選択授業",
                        "teacher_name1": "秦 健心",
                        "teacher_name2": "先 生名",
                        "classification": "専門",
                        "compulsory": "選択",
                        "isenglish": false,
                        "grade": "1",
                        "semester": "前期",
                        "weekday": "thu",
                        "lec_time": 2,
                        "continuous": 1,
                        "unit": 2,
                        "syllabus": "https://connpass.com/dashboard/",
                    },
                ],
                timetable: []
            };

        },
        components: {
            TimeTableShow,
        },
        created() {
            // // Json取得
            // this.get_now();
            // // Json取得後に呼び出される
            // this.$on('GET_NOW', () => {
            //     this.timetable = this.get_data();
            // });
            // this.get_editor(this.user);
        },
        computed: {},
        methods: {
            set_grade(g) {
                this.looking_grade = g;
            },
            set_semester(s) {
                this.looking_semester = s;
            },
            get_grade_lecture(lectures, grade) {
                let c = [];
                lectures.forEach(function (obj) {
                    if (obj.grade === grade) {
                        c.push(obj)
                    }
                });
                return c;
            },
            get_grade_half_lecture(lectures, grade, semester) {
                let c = [];
                lectures.forEach(function (obj) {
                    if (obj.grade === grade && obj.semester === semester) {
                        c.push(obj)
                    }
                });
                return c;
            },
            get_now() {
                return axios.get(process.env.VUE_APP_URL_TIMETABLE
                ).then((res) => {
                    Vue.set(this, 'timetable', res.data);
                }).catch(error => {
                    console.log(error);
                });
            },
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
        },
    }
</script>


<style scoped>
    .wrapper {
        padding-left: 1%;
        padding-right: 1%;
    }
</style>
