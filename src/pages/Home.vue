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
    </v-card>
    <p v-if="!welcomeValue">
      Please enter your name :
      <input type="text" @keyup.enter="username">
    </p>
    <p v-else>
      Welcome again : {{ welcomeValue }}
      <button @click="deleteUser">{{deleteUserText}}</button>
      {{deleteUserState}}
    </p>
    <!-- <v-btn @click="cookie_test()">aaa</v-btn> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      welcomeValue: this.$cookies.get("username"),
      deleteUserText: "移除当前用户Cookie",
      deleteUserState: "",
      items: [{ title: "新規作成", link: "/Initial_Registration" }]
    };
  },
  methods: {
    // cookie_test() {
    //   this.$cookies.config("30d");
    //   // this.$cookies.config(new Date(2019, 03, 13).toUTCString());
    //   this.$cookies.config(60 * 60 * 24 * 30, "");
    //   window.$cookies.config("30d");
    // },
    username: function(event) {
      this.welcomeValue = event.target.value;
      this.$cookies.set("username", this.welcomeValue);
    },
    deleteUser: function() {
      this.$cookies.remove("username");
      this.deleteUserState = "√";
      setTimeout(function() {
        location.reload();
      }, 0.5 * 1000);
    }
  }
};
</script>

<style scoped>
</style>