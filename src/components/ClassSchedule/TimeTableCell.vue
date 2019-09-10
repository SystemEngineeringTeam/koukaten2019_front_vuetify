<template>
  <div>
    <div v-if="lecture==null">
      <v-card-actions v-if="is_edit && can_register.length >= 1">
        <v-btn @click.stop="dialog = true">授業を登録する</v-btn>
      </v-card-actions>
    </div>

    <div v-else>
      <v-card-text>
        <b>{{lecture['name']}}</b>
        {{lecture["unit"]}}単位
      </v-card-text>
      <v-card-actions>
        <v-btn :href="lecture['syllabus']" target="_blank">シラバス</v-btn>
      </v-card-actions>
      <v-card-actions v-if="is_edit && can_register.length >= 1">
        <v-btn @click.stop="dialog = true">授業を登録する</v-btn>
        <v-btn
          v-on:click="$store.commit('delete_registered_lecture', {'weekday':day, 'lec_time':time})"
        >授業を取り消す</v-btn>
      </v-card-actions>
    </div>

    <!--ダイアログ-->
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">授業登録</v-card-title>
        <v-container>
          <v-row>
            <v-col v-for="c in can_register" cols="3">
              <v-card>
                {{c.name}}
                <br>
                {{c.classification}}
                <br>
                {{c.compulsory}}
                <v-card-actions>
                  <v-btn v-on:click="$store.commit('push_registered_lecture', c); dialog = false">登録</v-btn>
                  <v-btn :href="lecture['syllabus']" target="_blank">シラバス</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!--<template v-for="c in can_register">-->
          <!--<v-crad>-->
          <!--{{c.name}}-->
          <!--<br>-->
          <!--{{c.classification}}-->
          <!--<br>-->
          <!--{{c.compulsory}}-->
          <!--<v-card-actions>-->
          <!--<v-btn v-on:click="$store.commit('push_registered_lecture', c); dialog = false">-->
          <!--登録-->
          <!--</v-btn>-->
          <!--</v-card-actions>-->
          <!--</v-crad>-->
          <!--</template>-->
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TimeTableCell",
  data() {
    return {
      dialog: false
    };
  },
  props: ["lecture", "is_edit", "can_register", "day", "time"]
};
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