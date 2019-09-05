<template>
    <div>

        <b>{{now['name']}}</b>
        <br>
        {{now["type"]}}  {{now["credit"]}}単位
        <br>
        {{now["teacher1"]}}
        <!--<template v-if="now['teacher2']"> 他</template>-->
        <br>
        <!--<v-icon>mdi-help</v-icon>-->
        <a :href="now['syllabus']" target="_blank">シラバス</a>

    </div>
</template>

<script>

    export default {
        name: "TimeTableCell",
        props: [
            'now',
        ],
    }
</script>

<style scoped>
    .height100{
        height: 100%;
    }
    .register_button{
        width: 100%;
        height: 100%;
        padding: 5%;
    }
    .pickup_button{
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