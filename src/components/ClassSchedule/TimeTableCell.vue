<template>
  <div>
    <div v-if="lecture == null">
      <v-card-actions v-if="is_edit && can_register.length >= 1">
        <div v-if="hanteikun(can_register)">
          <v-btn color="error" @click.stop="dialog = true">授業を登録する</v-btn>
        </div>
        <div v-else>
          <v-btn @click.stop="dialog = true">授業を登録する</v-btn>
        </div>
      </v-card-actions>
      {{
      can_register.forEach(function(lecther) {
      lecther.compulsory;
      })
      }}
    </div>

    <div v-else>
      <v-card-text>
        <b>{{ lecture["name"] }}</b>
        {{ lecture["unit"] }}単位
      </v-card-text>
      <!--<v-card-actions>
        <v-btn :href="lecture['syllabus']" target="_blank">シラバス</v-btn>
      </v-card-actions>-->
      <v-card-actions v-if="is_edit && can_register.length >= 1">
        <v-btn @click.stop="dialog = true">授業を登録する</v-btn>
        <v-btn v-on:click="$store.commit('delete_registered_lecture', lecture)">授業を取り消す</v-btn>
      </v-card-actions>
    </div>

    <!--ダイアログ-->
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">授業登録</v-card-title>
        <v-container>
          <v-row>
            <v-col v-for="c in can_register" cols="3">
              <v-card
                :class="{
                  orange: '必修' === c.compulsory || '選択必修' === c.compulsory
                }"
              >
                {{ c.name }}
                <br>
                {{ c.classification }}
                <br>
                {{ c.compulsory }}
                <br>
                {{ c.teacher_name1 }}
                <template v-if="c.teacher_name2 !== 'null'">,他</template>
                <v-card-actions>
                  <v-btn
                    v-on:click="
                      duplicate_check = duplicate_check2(c.subject_code,c)       
                    "
                  >登録</v-btn>
                  <!--<v-btn :href="c.syllabus" target="_blank">シラバス</v-btn>-->
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
    <!--ダイアログ-->
    <!-- <div v-if="duplicate_check "> -->
    <v-dialog v-model="duplicate_check">
      <v-card>
        <v-card>
          <div>登録しようとしている授業はすでに４年間のどこかで登録されています</div>
          <v-btn v-on:click=" duplicate_check= false;">OK</v-btn>
          <!-- {{duplicate_check}}
          {{f}}
          {{g}}-->
        </v-card>
      </v-card>
    </v-dialog>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "TimeTableCell",
  data() {
    return {
      f: "",
      g: "",
      duplicate_check: false,
      dialog: false
    };
  },
  methods: {
    register_lecture(want_ragister_lectuer) {
      if (this.lecture != null) {
        this.$store.commit("delete_registered_lecture", this.lecture);
      }
      // this.Vue.set(want_ragister_lectuer, 'grade', this.grade);
      if (want_ragister_lectuer.classification == "総合B") {
        let sougouB_lectuer = Object.assign({}, want_ragister_lectuer);
        sougouB_lectuer.grade = this.grade;
        this.$store.commit("push_registered_lecture", sougouB_lectuer);
      } else {
        this.$store.commit("push_registered_lecture", want_ragister_lectuer);
      }
    },
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
    },
    duplicate_check2(now_lec, c) {
      for (var i = 0; i < this.$store.state.registered_lectures.length; i++) {
        if (now_lec == this.$store.state.registered_lectures[i].subject_code) {
          this.f = now_lec;
          this.g = this.$store.state.registered_lectures[i].subject_code;
          return true;
        }
      }
      this.register_lecture(c);
      this.dialog = false;
      return false;
    }
  },
  props: ["lecture", "is_edit", "can_register", "grade", "day", "time"]
};
</script>

<style scoped></style>
