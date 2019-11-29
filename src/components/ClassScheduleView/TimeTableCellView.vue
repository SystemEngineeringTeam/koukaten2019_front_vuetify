<template>
  <div class="height_320">
    <div v-if="lecture == null">
      <v-card-actions v-if="is_edit && can_register.length >= 1">
        <div v-if="compulsory_decision(can_register)">
          <v-btn class="orange white--text" @click.stop="dialog = true" rounded>
            <v-icon>mdi-border-color</v-icon>授業を表示
          </v-btn>
        </div>
        <div v-else-if="choice_compulsory_decision(can_register)">
          <v-btn class="green white--text" @click.stop="dialog = true" rounded>
            <v-icon>mdi-border-color</v-icon>授業を表示
          </v-btn>
        </div>
        <div v-else>
          <v-btn class="blue white--text" @click.stop="dialog = true" rounded>
            <v-icon>mdi-border-color</v-icon>授業を表示
          </v-btn>
        </div>
      </v-card-actions>
      {{
        can_register.forEach(function(lecther) {
          lecther.compulsory;
        })
      }}
    </div>
    <div v-else>
      <!-- <v-card v-if="test" @click="show_click_down()">aa</v-card> -->
      <v-card
        :class="{
          orange: lecture['compulsory'] === '必修',
          blue:
            lecture['classification'] === '専門' ||
            lecture['classification'] === '共通' ||
            lecture['classification'] === '総合A',
          green: lecture['compulsory'] === '選択必修',
          'blue-grey': lecture['classification'] === '総合B'
        }"
      >
        <v-col>
          <v-card-text class="headline white--text">
            <b>{{ lecture['name'] }}</b>
            <br />
            <template v-if="lecture.unit == 0"
              >{{ find_unit(lecture) }}単位</template
            >
            <template v-else
              >{{ lecture['unit'] }}単位</template
            >

            <!-- <template v-if="lecture.unit == 0">{{ find_unit(lecture) }}単位</template>
            <template v-else>{{ lecture['unit'] }}単位</template>-->
            <br />
            {{ lecture.teacher_name1 }}
            <!-- <template v-if="lecture.teacher_name2 !== ' '">他</template> -->
            <template v-if="$route.path == '/ClassScheduleView'">
              <br />
              {{ lecture.place }}
            </template>
          </v-card-text>
          <!--<v-card-actions>
              <v-btn :href="lecture['syllabus']" target="_blank">シラバス</v-btn>
          </v-card-actions>-->
          <v-card-actions v-if="is_edit && can_register.length >= 1">
            <v-btn @click.stop="dialog = true" small rounded>
              <v-icon>mdi-border-color</v-icon>
            </v-btn>
            <v-btn v-on:click="$store.commit('delete_registered_lecture', lecture)" small rounded>
              <v-icon>mdi-eraser</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-card>
    </div>

    <!--ダイアログ-->
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">授業選択</v-card-title>
        <v-container>
          <v-row>
            <v-col v-for="(c, i) in can_register" cols="12" md="3" :key="i">
              <v-card
                dark
                :class="{
                  orange: '必修' === c.compulsory,
                  green: '選択必修' === c.compulsory,
                  blue: '専門' === c.classification || '共通' === c.classification || '総合A' === c.classification,
                  'blue-grey': '総合B' === c.classification
                }"
              >
                <p class="text-center" style="font-size:28px;">{{ c.name }}</p>
                <p class="text-center" style="font-size:22px;">
                  {{ c.classification }}
                  {{ c.compulsory }}
                  <br />
                  {{ c.teacher_name1 }}
                  <template v-if="c.teacher_name2 !== ' '"
                    >他</template
                  >
                </p>
                <div class="text-center">
                  <v-btn
                    v-on:click="duplicate_check_decision = duplicate_check(c)"
                    rounded
                    color="white"
                    class="black--text"
                  >
                    <v-icon>mdi-border-color</v-icon>選択
                  </v-btn>
                </div>
                <br />
                <!--<v-btn :href="c.syllabus" target="_blank">シラバス</v-btn>-->
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
          <!--選択-->
          <!--</v-btn>-->
          <!--</v-card-actions>-->
          <!--</v-crad>-->
          <!--</template>-->
        </v-container>
      </v-card>
    </v-dialog>
    <!--ダイアログ-->
    <v-dialog v-model="duplicate_check_decision" max-width="290">
      <v-card>
        <v-card-title class="headline">警告</v-card-title>
        <v-card-text class="headline">登録しようとしている授業はすでに４年間のどこかで登録されています</v-card-text>
        <v-card-actions>
          <v-btn v-on:click="duplicate_check_decision = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'TimeTableCellView',
  data() {
    return {
      test: true,
      duplicate_check_decision: false,
      dialog: false
    };
  },
  methods: {
    show_click_up() {
      this.test = true;
    },
    show_click_down() {
      this.test = false;
    },
    find_unit(lectuer) {
      let continuous_lectuer = this.$store.state.registered_lectures.find(function(l) {
        return l.subject_code == lectuer.subject_code;
      });
      return continuous_lectuer.unit;
    },
    register_lecture(want_ragister_lectuer) {
      if (this.lecture != null) {
        this.$store.commit('delete_registered_lecture', this.lecture);
      }
      // this.Vue.set(want_ragister_lectuer, 'grade', this.grade);
      if (want_ragister_lectuer.classification == '総合B') {
        let sougouB_lectuer = Object.assign({}, want_ragister_lectuer);
        sougouB_lectuer.grade = this.grade;
        this.$store.commit('push_registered_lecture', sougouB_lectuer);
      } else {
        this.$store.commit('push_registered_lecture', want_ragister_lectuer);
      }
    },
    compulsory_decision(h) {
      if (h.length <= 0) {
        return false;
      }
      let test = false;
      h.forEach(function(lec) {
        if (lec.compulsory === '必修') {
          test = true;
        }
      });
      return test;
    },
    choice_compulsory_decision(h) {
      if (h.length <= 0) {
        return false;
      }
      let test = false;
      h.forEach(function(lec) {
        if (lec.compulsory === '選択必修') {
          test = true;
        }
      });
      return test;
    },
    duplicate_check(c) {
      for (let i = 0; i < this.$store.state.registered_lectures.length; i++) {
        if (c.subject_code == this.$store.state.registered_lectures[i].subject_code) {
          return true;
        }
      }
      this.register_lecture(c);
      this.dialog = false;
      return false;
    }
  },
  props: ['lecture', 'is_edit', 'can_register', 'grade', 'day', 'time']
};
</script>

<style scoped>
.text {
  color: #fff;
  text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
}

.height_320 {
  height: 320px;
}
</style>
