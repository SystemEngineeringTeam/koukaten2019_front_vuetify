<template>
    <div class="wrapper">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-tabs v-model="tabs">
                        <v-tab
                                v-for="timetable in $store.state.timetables"
                                :key="timetable.id"
                                v-on:click="$store.commit('set_looking_timetable', timetable)"
                        >
                            <b>{{timetable.grade}}{{timetable.semester}}</b>
                        </v-tab>
                    </v-tabs>
                </v-col>
                <v-col cols="12">
                    <v-tabs-items v-model="tabs">
                        <v-tab-item v-for="timetable in timetables" :key="timetable.id">
                            <TimeTableShow
                                    :is_edit="is_edit"
                                    :now_register="get_grade_half_lectures($store.state.registered_lectures, timetable.grade, timetable.semester)"
                                    :can_register="get_grade_half_lectures($store.state.can_register_lectures, timetable.grade, timetable.semester)"
                            ></TimeTableShow>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
                <v-btn
                        absolute
                        fixed
                        dark
                        large
                        right
                        rounded
                        color="orange"
                        v-if="!is_edit"
                        v-on:click="is_edit = true; $store.dispatch('get_can_register_lectures', $store.state.user.id)"
                >
                    授業を登録
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                        fixed
                        large
                        dark
                        right
                        rounded
                        elevation="10"
                        color="red"
                        v-else
                        v-on:click="is_edit = false; $store.dispatch('put_registered_lectures', mold_registered_lectures())"
                >
                    登録を保存
                    <v-icon dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <v-col cols="12">
                    <v-tabs v-model="tabs">
                        <v-tab
                                v-for="timetable in $store.state.timetables"
                                :key="timetable.id"
                                v-on:click="$store.commit('set_looking_timetable', timetable)"
                        >
                            <b>{{timetable.grade}}{{timetable.semester}}</b>
                        </v-tab>
                    </v-tabs>
                </v-col>
                <v-col cols="12">
                    <v-footer app>
                        <v-col>
                            <CreditCalculator :grade="$store.state.looking_timetable.grade"
                            ></CreditCalculator>
                        </v-col>
                    </v-footer>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Vue from "vue";

    import TimeTableShow from "../components/ClassSchedule/TimeTableShow";
    import CreditCalculator from "../components/ClassSchedule/CreditCalculator";
    import TimeTableEditor from "../components/ClassSchedule/TimeTableEditor";

    export default {
        data() {
            return {
                tabs: null,
                user: 1,
                is_show: true,
                is_edit: false,
                looking_grade: 1,
                looking_semester: "前期",
                major: "kk",
                grades: [1, 2, 3, 4],
                semesters: ["前期", "後期"],
                timetables: [
                    {grade: 1, semester: "前期"},
                    {grade: 1, semester: "後期"},
                    {grade: 2, semester: "前期"},
                    {grade: 2, semester: "後期"},
                    {grade: 3, semester: "前期"},
                    {grade: 3, semester: "後期"},
                    {grade: 4, semester: "前期"},
                    {grade: 4, semester: "後期"}
                ],
                timetable: []
            };
        },
        components: {
            TimeTableShow,
            TimeTableEditor,
            CreditCalculator
        },
        created() {
            this.$store.dispatch('get_registered_lectures', this.$store.state.user.id)
        },
        beforeUpdate() {
            this.$store.commit("unit_calculate");
        },
        methods: {
            mold_registered_lectures() {
                let data = [];
                let students_id = this.$store.state.user.id;
                this.$store.state.registered_lectures.forEach(lectures => data.push({
                    students_id: students_id,
                    subject_code: lectures.subject_code,
                    class_code: lectures.class_code,
                    course_grade: lectures.grade,
                    grade_point: 'Future'
                }));
                return data;
            },
            table() {
                return this.$store.state.registered_lectures;
            },
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
                        c.push(obj);
                    }
                });
                return c;
            },
            get_grade_half_lectures(lectures, grade, semester) {
                let c = [];
                lectures.forEach(function (obj) {
                    if (obj.grade === grade && obj.semester === semester) {
                        c.push(obj);
                    }
                });
                return c;
            },
            get_now() {
                return axios
                    .get(process.env.VUE_APP_URL_TIMETABLE)
                    .then(res => {
                        Vue.set(this, "timetable", res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // プロパティ名を指定してデータを取得
            get_data() {
                return this.$data["registered_lectures"];
            },
            set_now(data) {
                this.$set(
                    this.registered_lectures[data["grade"]][data["semester"]][data["day"]],
                    data["time"],
                    data["now"]
                );
                // this.$emit('GET_NOW');
            },
            put_editor() {
                return axios
                    .put(URL_BASE + "/editor", "registered_lectures")
                    .then(() => {
                        this.is_show = true;
                        console.log("保存しました");
                    })
                    .catch(error => {
                        this.is_show = true;
                        console.log(error);
                    });
            }
        }
    };
</script>


<style scoped>
</style>
