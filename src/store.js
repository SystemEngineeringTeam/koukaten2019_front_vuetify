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
            logined: false,
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
            Vue.set(state.user, 'id', data.students_id);
            Vue.set(state.user, 'token', data.token);
            Vue.set(state.user, 'grade', data.grade);
            Vue.set(state.user, 'major', data.students_id.slice(0, 1));
            Vue.set(state.user, 'logined', true);
        },

        //時間割関係
        set_registered_lecture(state, lectures) {
            Vue.set(state, "registered_lectures", lectures);
        },
        set_can_register_lectures(state, data) {
            Vue.set(state, 'can_register_lectures', data);
        },
        push_registered_lecture(state, lecture) {
            let index = state.registered_lectures.findIndex((registered_lecture) => registered_lecture.grade == lecture.grade && registered_lecture.semester == lecture.semester && registered_lecture.weekday == lecture.weekday && registered_lecture.lec_time == lecture.lec_time);
            if (index >= 0) {
              state.registered_lectures.splice(index, 1);
            }
            state.registered_lectures.push(lecture);
            if (lecture.continuous == 2) {
              let sublecture;
              sublecture = Vue.util.extend({}, lecture);
              sublecture.lec_time += 1;
              sublecture.unit = 0;
              let index = state.registered_lectures.findIndex((registered_lecture) => registered_lecture.grade == sublecture.grade && registered_lecture.semester == sublecture.semester && registered_lecture.weekday == sublecture.weekday && registered_lecture.lec_time == sublecture.lec_time);
              if (index >= 0) {
                state.registered_lectures.splice(index, 1);
              }
              state.registered_lectures.push(sublecture);
            }
        },
        set_looking_timetable(state, timetable) {
            Vue.set(state, 'looking_timetable', timetable);
        },
        delete_registered_lecture(state, codes) {
            let index = state.registered_lectures.findIndex((lecture) => lecture.subject_code == codes.subject_code && lecture.class_code == codes.class_code);
            if (index >= 0) {
                state.registered_lectures.splice(index, 1);
            }
        },
        logout(state) {
            Vue.set(state.user, 'logined', false);
            Vue.set(state.user, 'id', '');
            Vue.set(state.user, 'grade', 0);
            Vue.set(state.user, 'major', '');
            Vue.set(state.user, 'taken', '');
        },
        //単位関係
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

    },
    actions: {
        post_new_user(context, user) {
            axios.post(process.env.VUE_APP_URL_USERS, {
                students_id: user.id,
                grade: user.grade,
                password: user.password,
            })
                .then((res) => {
                    // console.log(res.data);
                    if (res.data) {
                        context.commit('set_user', res.data)
                        // trueかfalseを判断する
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
                context.commit('set_user', res.data)
            });
        },
        get_registered_lectures(context, user_id) {
            axios.get(process.env.VUE_APP_URL_TIMETABLE, {
                params: {
                    student: user_id
                },
                headers: {
                    Authorization: `Bearer ${this.state.user.token}`
                },
            }).then(res => {
                context.commit('set_registered_lecture', res.data)
            })
                .catch(error => {
                });
        },
        get_can_register_lectures(context, user_id) {
            axios.get(process.env.VUE_APP_URL_EDITOR, {
                params: {
                    // ここにクエリパラメータを指定する
                    student: user_id,
                },
                headers: {
                    Authorization: `Bearer ${this.state.user.token}`
                },
            }).then((res) => {
                context.commit('set_can_register_lectures', res.data)
            });
        },
        put_registered_lectures(context, data) {
            let d = { data: data };
            axios.put(process.env.VUE_APP_URL_EDITOR, d, {
                headers: {
                    Authorization: `Bearer ${this.state.user.token}`,
                },
                data: {}
            }).then(res => {
            }).catch(error => {
            });
        }
    }
})