import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        timetables: [
            { grade: 1, semester: '前期' }, { grade: 1, semester: '後期' },
            { grade: 2, semester: '前期' }, { grade: 2, semester: '後期' },
            { grade: 3, semester: '前期' }, { grade: 3, semester: '後期' },
            { grade: 4, semester: '前期' }, { grade: 4, semester: '後期' },
        ],
        select_units: {},
        looking_timetable: { grade: 1, semester: '前期' },
        registered_lectures: [],
        can_register_lectures: [
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
        unit_list: {
            1: {
                '共通': 0,
                '専門': 0,
                '総合A': 0,
                '総合B': 0,
                '外国語': 0,

            },
            2: {
                '共通': 0,
                '専門': 0,
                '総合A': 0,
                '総合B': 0,
                '外国語': 0,

            },
            3: {
                '共通': 0,
                '専門': 0,
                '総合A': 0,
                '総合B': 0,
                '外国語': 0,

            },
            4: {
                '共通': 0,
                '専門': 0,
                '総合A': 0,
                '総合B': 0,
                '外国語': 0,

            }
        },
        user: {
            id: '',
            grade: 0,
            major: '',
            token: ''
        }
    },
    mutations: {
        // get_editor(student) {
        //     return axios.get(process.env.VUE_APP_URL_EDITOR, {
        //         params: {
        //             // ここにクエリパラメータを指定する
        //             student: student,
        //         },
        //     })
        //         .then((res) => {
        //             Vue.set(this, 'timetable_editor', res.data);
        //         });
        // },

        //ユーザー関係
        set_user(state, data) {
            Vue.set(state.user, 'id', data.students_id)
        },
        set_token(state, data) {
            Vue.set(state.user, 'token', data.token);
        },

        //時間割関係
        set_registerd_lecture(state, lectures) {
            Vue.set(state, "registered_lectures", lectures);
        },
        set_can_register_lectures(state, data) {
            Vue.set(state, 'can_register_lectures', data);
        },
        push_registered_lecture(state, lecture) {
            state.registered_lectures.push(lecture);
        },
        set_looking_timetable(state, timetable) {
            Vue.set(state, 'looking_timetable', timetable);
        },
        delete_registered_lecture(state, day_time) {
            let index = state.registered_lectures.findIndex((lecture) => lecture['grade'] === state.looking_timetable.grade && lecture['semester'] === state.looking_timetable.semester && lecture['weekday'] === day_time.weekday && lecture['lec_time'] === day_time.lec_time);
            if (index >= 0) {
                state.registered_lectures.splice(index, 1);
            }
        },
        unit_calculate(state) {
            state.unit_list = {
                1: {
                    '共通': 0,
                    '専門': 0,
                    '総合A': 0,
                    '総合B': 0,
                    '外国語': 0,

                },
                2: {
                    '共通': 0,
                    '専門': 0,
                    '総合A': 0,
                    '総合B': 0,
                    '外国語': 0,

                },
                3: {
                    '共通': 0,
                    '専門': 0,
                    '総合A': 0,
                    '総合B': 0,
                    '外国語': 0,

                },
                4: {
                    '共通': 0,
                    '専門': 0,
                    '総合A': 0,
                    '総合B': 0,
                    '外国語': 0,

                }
            };
            state.registered_lectures.forEach(function (lecture) {
                if (lecture.classification === '共通') {
                    state.unit_list[lecture.grade]['共通'] += lecture.unit
                } else if (lecture.classification === '専門') {
                    state.unit_list[lecture.grade]['専門'] += lecture.unit
                } else if (lecture.classification === '総合A') {
                    state.unit_list[lecture.grade]['総合A'] += lecture.unit
                    if (lecture.isenglish) {
                        state.unit_list[lecture.grade]['外国語'] += lecture.unit
                    }
                } else if (lecture.classification === '総合B') {
                    state.unit_list[lecture.grade]['総合B'] += lecture.unit
                }
            });
        },
        new_user(state, user) {
            state.user_info.id = user.students_id
            state.user_info.grade = user.grade
            state.user_info.token = user.token
        }

    },
    actions: {
        get_can_register_lectures(context, student) {
            axios.get(process.env.VUE_APP_URL_EDITOR, {
                params: {
                    // ここにクエリパラメータを指定する
                    student: student,
                },
            }).then((res) => {
                context.commit('set_can_register_lectures', res.data)
            });
        },
        post_new_user(context, user) {
            axios.post(process.env.VUE_APP_URL_USERS, {
                students_id: user.id,
                grade: user.grade,
                password: user.password,
            })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data) {
                        context.commit('new_user', res.data)
                        // trueかfalseを判断する
                        return '/ClassSchedule';
                    } else {

                    }
                })
        },
        login(context, user_entry) {
            axios.post(process.env.VUE_APP_URL_SIGN_IN_USERS, {
                students_id: user_entry.ID,
                password: user_entry.password,
            }
            ).then((res) => {
                context.commit('set_token', res.data)
                context.commit('set_user', res.data)
            });
        },
        get_register_lectures(context, user_id) {
            axios.get(process.env.VUE_APP_URL_TIMETABLE, {
                params: {
                    student: user_id
                },
                headers: {},
            }).then(res => {
                context.commit('set_registerd_lecture', res.data)
            })
                .catch(error => {
                    console.log(error);
                });
        },
        get_can_register_lectures(context, user_id) {
            axios.get(process.env.VUE_APP_URL_EDITOR, {
                params: {
                    // ここにクエリパラメータを指定する
                    student: user_id,
                },
                headers: {
                    Authorization: Bearer
                },
            }).then((res) => {
                context.commit('set_can_register_lectures', res.data)
            });
        },
        put_registered_lectures(context, lectures) {
            axios.put()
        }
    }
})