<template>
    <div>
        <v-row justify="center">
            <v-btn
                    color="primary"
                    dark
                    @click.stop="dialog = true"
                    @click=""
            >
                必修授業を登録
            </v-btn>

            <v-dialog
                    v-model="dialog"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">必修授業を登録します</v-card-title>

                    <v-card-text>
                        自分の区分の授業を選んでください
                    </v-card-text>

                    <v-card v-for="lectures in  pleas_choice_lectures">
                        
                    </v-card>

                    <v-card-actions>
                        <div class="flex-grow-1"></div>

                        <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                        >
                            Disagree
                        </v-btn>

                        <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                        >
                            Agree
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                dialog: false,
                pleas_choice_lectures:[
                    [{}, {}, {}],
                    [{}, {}]
                ],
            };
        },

        created() {
        },
        props: ["grade"],
        methods: {
            get_compulsory_lectures(){
                let compulsory_lectures = this.$store.state.registered_lectures.filter(lecture => lecture.compulsory == '必修');
                return compulsory_lectures
            },
            get_subject_codes(lectures){
                let subject_codes = [];
                lectures.forEach(function (lecture) {
                    subject_codes.push(lecture.subject_code);
                });
                return subject_codes
            },
            get_duplicate_lectures(lectures, subject_codes){
                let duplicate_lectures = lectures.filter(function (lecture) {
                    return subject_codes.indexOf(lecture.subject_code) !== subject_codes.lastIndexOf(lecture.subject_code);
                });
                return duplicate_lectures
            },
            set_compulsory_lectures() {

            }
        },
    }
</script>

<style scoped>
</style>
