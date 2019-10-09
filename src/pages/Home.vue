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
            <p class="font-italic font-weight-bold" style="padding-top:20px; padding-bottom:20px; font-size:100px; ">
              未来予想図
            </p>
            <v-sheet class="pa-12" color="#D5EEFF" style="font-size:20px">
              最初にユーザー登録、右上の表示が変わったらエディタページに移動して授業を登録、
              <br />再読み込みなんかをしてログイン状態じゃなくなったらログインページからログインし直してね
              <p></p>
            </v-sheet>
            <router-link to="/Initial_Registration" class="none_text">
              <div class="my-12">
                <v-btn rounded block x-large color="#78BBE6" v-if="!this.$store.state.user.logined"
                  >ユーザー登録</v-btn
                >
              </div>
            </router-link>
            <router-link to="/Login" class="none_text">
              <div class="my-12">
                <v-btn rounded block x-large color="#F99F48" v-if="!this.$store.state.user.logined"
                  >ログイン</v-btn
                >
              </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ title: '新規作成', link: '/Initial_Registration' }]
    };
  }
};
</script>

<style lang="scss">
.none_text {
  text-decoration: none;
}
</style>
