<template>
  <div>
    <div v-if="lecture==null">
      <v-card-actions v-if="is_edit && can_register.length >= 1">
        <div v-if="hanteikun(can_register)">
          <v-btn color="error" @click.stop="dialog = true">授業を登録する</v-btn>
        </div>
        <div v-else>
          <v-btn @click.stop="dialog = true">授業を登録する</v-btn>
        </div>
      </v-card-actions>
      {{can_register.forEach(function(lecther){lecther.compulsory})}}
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
          v-on:click="$store.commit('delete_registered_lecture', lecture)"
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
              <div v-if="'必修'=== c.compulsory ||'選択必修' === c.compulsory ">
                <v-card color="orange">
                  {{c.name}}
                  <br>
                  {{c.classification}}
                  <br>
                  {{c.compulsory}}
                  <br>
                  {{c.teacher_name1}}
                  <template v-if="c.teacher_name2!=='null'">,他</template>
                  <v-card-actions>
                    <v-btn
                      v-on:click="$store.commit('push_registered_lecture', c); dialog = false"
                    >登録</v-btn>
                    <v-btn :href="c.syllabus" target="_blank">シラバス</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
              <div v-else>
                <v-card>
                  {{c.name}}
                  <br>
                  {{c.classification}}
                  <br>
                  {{c.compulsory}}
                  <br>
                  {{c.teacher_name1}}
                  <template v-if="c.teacher_name2!=='null'">,他</template>
                  <v-card-actions>
                    <v-btn
                      v-on:click="$store.commit('push_registered_lecture', c); dialog = false"
                    >登録</v-btn>
                    <v-btn :href="c.syllabus" target="_blank">シラバス</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
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
  methods: {
    hanteikun(h) {
      if (h.length <= 0) {
        return false;
      }
      let test = false;
      h.forEach(function(lec) {
        if (lec.compulsory === "必修") {
          test = true;
        }
      });
      return test;
    }
  },
  props: ["lecture", "is_edit", "can_register", "day", "time"]
};
</script>

<style scoped>
</style>
