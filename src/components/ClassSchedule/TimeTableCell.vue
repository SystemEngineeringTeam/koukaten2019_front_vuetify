<template>
    <div>
        <div v-if="lecture==null">
            <v-card-actions v-if="is_edit && can_register.length >= 1">
                <v-btn @click.stop="dialog = true">授業を登録する</v-btn>
            </v-card-actions>
        </div>

        <div v-else>
            <v-card-text><b>{{lecture['name']}}</b> {{lecture["unit"]}}単位</v-card-text>
            <v-card-actions>
                <v-btn :href="lecture['syllabus']" target="_blank">シラバス</v-btn>
            </v-card-actions>
            <v-card-actions v-if="is_edit && can_register.length >= 1">
                <v-btn>授業を登録する</v-btn>
            </v-card-actions>
        </div>

        <!--ダイアログ-->
        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <>
            <v-card-title class="headline">授業登録</v-card-title>

            <v-card>
                <v-card-title class="headline">取り消す</v-card-title>
            </v-card>
            <template v-for="c in can_register">

                <v-card>
                    <v-card-title class="headline">{{c}}</v-card-title>
                </v-card>

            </template>
            <v-card-text>
                Let Google help apps determine location. This means sending anonymous location data to Google, even
                when no apps are running.
            </v-card-text>

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
    </div>
</template>

<script>

    export default {
        name: "TimeTableCell",
        data() {
            return {
                dialog: false,
            }
        },
        props: [
            'lecture',
            'is_edit',
            'can_register'
        ],
    }
</script>

<style scoped>
    .height100 {
        height: 100%;
    }

    .register_button {
        width: 100%;
        height: 100%;
        padding: 5%;
    }

    .pickup_button {
        border: none;
        outline: none;
        /*appearance: none;*/
        width: 100%;
        height: 100%;
        padding: 5%;
        background-color: white;
    }

    .pickup_button:hover {
        background-color: lightgreen;
    }

</style>