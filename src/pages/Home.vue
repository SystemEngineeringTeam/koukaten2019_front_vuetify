<template>
  <div class="text-center">
    <v-card height="700">
      <v-card-title class="headline"></v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12">
            <!--<v-card height="500">-->
            <!--<p style="padding-top:100px; padding-bottom:100px;">時間割エディタ</p>-->
            <!--<router-link to="/Initial_Registration">-->
            <!--<v-btn class="mt-12">ユーザー登録</v-btn>-->
            <!--</router-link>-->
            <!--</v-card>-->
            <p style="padding-top:100px; padding-bottom:100px;">
              最初にユーザー登録、右上の表示が変わったらエディタページに移動して授業を登録、
              <br>再読み込みなんかをしてログイン状態じゃなくなったらログインページからログインし直してね
            </p>
            <router-link to="/Initial_Registration">
              <v-btn class="mt-12">ユーザー登録</v-btn>
            </router-link>
          </v-col>
          <!--<v-col cols="6">-->
          <!--<v-card height="500">-->
          <!--<p style="padding-top:100px; padding-bottom:100px;">授業アンケート</p>-->
          <!--<v-btn class="mt-12">検索</v-btn>-->
          <!--</v-card>-->
          <!--</v-col>-->
        </v-row>
      </v-container>

      <!-- <div id="app">
        My name is
        <input v-model="name">
      </div>-->
      <div id="app">
        <p>
          My name is
          <input v-model="name">
          and I am
          <input v-model="age"> years old.
        </p>
        <p>
          <button @click="persist">Save</button>
        </p>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      age: 0,
      items: [{ title: "新規作成", link: "/Initial_Registration" }]
    };
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.age) {
      this.age = localStorage.age;
    }
  },
  methods: {
    persist() {
      localStorage.name = this.name;
      localStorage.age = this.age;
      console.log("now pretend I did more stuff...");
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    }
  }
};
</script>

<style scoped>
</style>