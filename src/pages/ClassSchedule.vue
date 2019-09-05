<template>
    <div>
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

        <template v-for="(a_year_now,f_grade) in timetable_now" >
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
                timetable_now: {
                    "year1": {
                        "first": {
                            "mon": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "オブジェクト指向",
                                    "teacher1": "俺　やばい",
                                    "teacher2": "",
                                    "credit": 3,
                                    "division": "専門",
                                    "type": "必修",
                                    "syllabus": "https://jp.vuejs.org/index.html",
                                },
                                "2nd": {
                                    "code": "k1025",
                                    "name": "マウンティング",
                                    "teacher1": "桂箱　歌",
                                    "teacher2": "",
                                    "credit": 2,
                                    "division": "総合A",
                                    "type": "必修",
                                    "syllabus": "https://vuetifyjs.com/ja/",
                                },
                                "3rd": {
                                    "code": "k1000",
                                    "name": "楽しい授業",
                                    "teacher1": "楽氏　舞根",
                                    "teacher2": "ソーシャル　セルフ　プラトン",
                                    "credit": 10,
                                    "division": "総合B",
                                    "type": "選択",
                                    "syllabus": "https://syllabus.aitech.ac.jp/ext_syllabus/syllabusReferenceContentsInit.do;jsessionid=6mk2X9OFYrt1rzDqu4P6JPIK.kmap3?subjectId=001300028348&formatCode=1&rowIndex=2&jikanwariSchoolYear=2019",
                                },
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "tue": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "マウンティング",
                                    "teacher1": "桂箱　歌",
                                    "teacher2": "",
                                    "credit": 2,
                                    "division": "総合A",
                                    "type": "必修",
                                    "syllabus": "https://vuetifyjs.com/ja/",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "wed": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "マウンティング",
                                    "teacher1": "桂箱　歌",
                                    "teacher2": "",
                                    "credit": 2,
                                    "division": "総合A",
                                    "type": "必修",
                                    "syllabus": "https://vuetifyjs.com/ja/",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "the": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "オブジェクト指向プログラミング及び演習",
                                    "teacher1": "桂箱　歌",
                                    "teacher2": "",
                                    "credit": 2,
                                    "division": "総合A",
                                    "type": "必修",
                                    "syllabus": "https://vuetifyjs.com/ja/",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "fri": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "マウンティング",
                                    "teacher1": "桂箱　歌",
                                    "teacher2": "",
                                    "credit": 2,
                                    "division": "総合A",
                                    "type": "必修",
                                    "syllabus": "https://vuetifyjs.com/ja/",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            }
                        },
                        "second": {
                            "mon": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "線形代数",
                                    "teacher1": "俺　やばくない",
                                    "teacher2": "",
                                    "credit": 0,
                                    "division": "1",
                                    "type": "必修",
                                    "syllabus": "",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "tue": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "wed": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "the": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "fri": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            }
                        }
                    },
                    "year2": {
                        "first": {
                            "mon": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "2年次",
                                    "teacher1": "俺　やばい",
                                    "teacher2": "",
                                    "credit": 0,
                                    "division": "1",
                                    "type": "必修",
                                    "syllabus": "",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "tue": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "wed": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "the": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "fri": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            }
                        },
                        "second": {
                            "mon": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "線形代数",
                                    "teacher1": "俺　やばくない",
                                    "teacher2": "",
                                    "credit": 0,
                                    "division": "1",
                                    "type": "必修",
                                    "syllabus": "",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "tue": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "wed": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "the": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "fri": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            }
                        }
                    },
                    "year3": {
                        "first": {
                            "mon": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "オブジェクト指向",
                                    "teacher1": "俺　やばい",
                                    "teacher2": "",
                                    "credit": 0,
                                    "division": "1",
                                    "type": "必修",
                                    "syllabus": "",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "tue": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "wed": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "the": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "fri": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            }
                        },
                        "second": {
                            "mon": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "線形代数",
                                    "teacher1": "俺　やばくない",
                                    "teacher2": "",
                                    "credit": 0,
                                    "division": "1",
                                    "type": "必修",
                                    "syllabus": "",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "tue": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "wed": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "the": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "fri": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            }
                        }
                    },
                    "year4": {
                        "first": {
                            "mon": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "オブジェクト指向",
                                    "teacher1": "俺　やばい",
                                    "teacher2": "",
                                    "credit": 0,
                                    "division": "1",
                                    "type": "必修",
                                    "syllabus": "",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "tue": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "wed": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "the": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "fri": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            }
                        },
                        "second": {
                            "mon": {
                                "1st": {
                                    "code": "k1025",
                                    "name": "線形代数",
                                    "teacher1": "俺　やばくない",
                                    "teacher2": "",
                                    "credit": 0,
                                    "division": "1",
                                    "type": "必修",
                                    "syllabus": "",
                                },
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "tue": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "wed": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "the": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            },
                            "fri": {
                                "1st": null,
                                "2nd": null,
                                "3rd": null,
                                "4th": null,
                                "5th": null,
                                "6th": null,
                                "7th": null
                            }
                        }
                    }
                },
                timetable_editor: {
                        "year1": {
                            "first": {
                                "mon": {
                                    "1st": [
                                        {
                                            "code": "k1025",
                                            "name": "オブジェクト指向",
                                            "teacher1": "俺　やばい",
                                            "teacher2": "",
                                            "credit": 3,
                                            "division": "1",
                                            "type": "必修",
                                            "syllabus": ""
                                        },
                                        {
                                            "code": "k1025",
                                            "name": "三点倒立",
                                            "teacher1": "俺　やばい",
                                            "teacher2": "",
                                            "credit": 2,
                                            "division": "1",
                                            "type": "必修",
                                            "syllabus": ""
                                        }
                                    ],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "tue": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "wed": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "the": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "fri": {
                                    "1st": [
                                        {
                                            "code": "k1025",
                                            "name": "デスゲーム",
                                            "teacher1": "俺　やばい",
                                            "teacher2": "",
                                            "credit": 0,
                                            "division": "1",
                                            "type": "必修",
                                            "syllabus": ""
                                        },
                                        {
                                            "code": "k1025",
                                            "name": "それはどうかなと言える",
                                            "teacher1": "俺　やばい",
                                            "teacher2": "",
                                            "credit": 0,
                                            "division": "1",
                                            "type": "必修",
                                            "syllabus": ""
                                        }
                                    ],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                }
                            },
                            "second": {
                                "mon": {
                                    "1st": [{
                                        "code": "k1025",
                                        "name": "線形代数",
                                        "teacher1": "俺　やばくない",
                                        "teacher2": "",
                                        "credit": 0,
                                        "division": "1",
                                        "type": "必修",
                                        "syllabus": ""
                                    },],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "tue": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "wed": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "the": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "fri": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                }
                            }
                        },
                        "year2": {
                            "first": {
                                "mon": {
                                    "1st": [{
                                        "code": "k1025",
                                        "name": "アバタケタブラ",
                                        "teacher1": "俺　やばい",
                                        "teacher2": "",
                                        "credit": 0,
                                        "division": "1",
                                        "type": "必修",
                                        "syllabus": ""
                                    }],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "tue": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "wed": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "the": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "fri": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                }
                            },
                            "second": {
                                "mon": {
                                    "1st": [{
                                        "code": "k1025",
                                        "name": "線形代数",
                                        "teacher1": "俺　やばくない",
                                        "teacher2": "",
                                        "credit": 0,
                                        "division": "1",
                                        "type": "必修",
                                        "syllabus": ""
                                    }],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "tue": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "wed": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "the": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "fri": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                }
                            }
                        },
                        "year3": {
                            "first": {
                                "mon": {
                                    "1st": [{
                                        "code": "k1025",
                                        "name": "オブジェクト指向",
                                        "teacher1": "俺　やばい",
                                        "teacher2": "",
                                        "credit": 0,
                                        "division": "1",
                                        "type": "必修",
                                        "syllabus": ""
                                    }],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "tue": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "wed": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "the": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "fri": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                }
                            },
                            "second": {
                                "mon": {
                                    "1st": [{
                                        "code": "k1025",
                                        "name": "線形代数",
                                        "teacher1": "俺　やばくない",
                                        "teacher2": "",
                                        "credit": 0,
                                        "division": "1",
                                        "type": "必修",
                                        "syllabus": ""
                                    }],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "tue": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "wed": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "the": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "fri": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                }
                            }
                        },
                        "year4": {
                            "first": {
                                "mon": {
                                    "1st": [{
                                        "code": "k1025",
                                        "name": "オブジェクト指向",
                                        "teacher1": "俺　やばい",
                                        "teacher2": "",
                                        "credit": 0,
                                        "division": "1",
                                        "type": "必修",
                                        "syllabus": ""
                                    }],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "tue": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "wed": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "the": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "fri": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                }
                            },
                            "second": {
                                "mon": {
                                    "1st": [{
                                        "code": "k1025",
                                        "name": "線形代数",
                                        "teacher1": "俺　やばくない",
                                        "teacher2": "",
                                        "credit": 0,
                                        "division": "1",
                                        "type": "必修",
                                        "syllabus": ""
                                    }],
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "tue": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "wed": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "the": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                },
                                "fri": {
                                    "1st": null,
                                    "2nd": null,
                                    "3rd": null,
                                    "4th": null,
                                    "5th": null,
                                    "6th": null,
                                    "7th": null
                                }
                            }
                        }
                    }
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
    p {
        display: inline;
    }
</style>
