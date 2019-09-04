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

        <TimeTableShow
                v-if="is_show"
                :grade="grade" :semester="semester"
                :timetable_now="timetable_now[0][grade][semester]"></TimeTableShow>

        <TimeTableEditor
                v-else
                v-on:set="set_now"
                :grade="grade" :semester="semester" :timetable_now="timetable_now[0][grade][semester]"
                :timetable_editor="timetable_editor[0][grade][semester]"></TimeTableEditor>

        <button v-if="is_show" v-on:click="is_show = false">
            編集する
        </button>

        <button v-else v-on:click="put_editor">
            保存する
        </button>

        <SchoolCreditCalculator></SchoolCreditCalculator>

    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';


    import TimeTableShow from "../components/ClassSchedule/TimeTableShow";
    import SchoolCreditCalculator from "../components/ClassSchedule/SchoolCreditCalculator";
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
                timetable_now: [{
                    "year1": {
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
                }],
                timetable_editor: [
                    {
                        "year1": {
                            "first": {
                                "mon": {
                                    "1st": [
                                        {
                                            "code": "k1025",
                                            "name": "オブジェクト指向",
                                            "teacher1": "俺　やばい",
                                            "teacher2": "",
                                            "credit": 0,
                                            "division": "1",
                                            "type": "必修",
                                            "syllabus": ""
                                        },
                                        {
                                            "code": "k1025",
                                            "name": "三点倒立",
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
                ]
            };

        },
        components: {
            TimeTableEditor,
            TimeTableShow,
            SchoolCreditCalculator,
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
            get_editor(user) {
                return axios.get(URL_BASE + '/editor', {
                    params: {
                        // ここにクエリパラメータを指定する
                        user: user,
                    },
                })
                    .then((res) => {
                        Vue.set(this, 'timetable_editor', res.data[0]['editor']);
                    });
            },
            set_now(data) {
                this.$set(this.timetable_now[0][data['grade']][data['semester']][data['day']], data['time'], data['now']);
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
