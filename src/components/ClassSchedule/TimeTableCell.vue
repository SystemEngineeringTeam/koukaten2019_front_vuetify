<template>
    <div>
        <div v-if="lecture==null">
            <div> </div>
        </div>

        <div v-else>
            <v-card-text><b>{{lecture['name']}}</b> {{lecture["unit"]}}単位</v-card-text>
            <v-card-actions>
                <v-btn :href="lecture['syllabus']" target="_blank">シラバス</v-btn>
            </v-card-actions>
        </div>

    </div>
</template>

<script>

    export default {
        name: "TimeTableCell",
        props: [
            'lecture',
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