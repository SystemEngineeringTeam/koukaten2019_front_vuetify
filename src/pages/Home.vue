<template>
  <div class="text-center">
    <v-card height="700">
      <v-card-title class="headline"></v-card-title>
      <v-container>
        <v-row>
          <v-col class="text-center" cols="12">
            <!--<v-card height="500">-->
            <!--<p style="padding-top:100px; padding-bottom:100px;">時間割エディタ</p>-->
            <!--<router-link to="/Initial_Registration">-->
            <!--<v-btn class="mt-12">ユーザー登録</v-btn>-->
            <!--</router-link>-->
            <!--</v-card>-->
            <p style="padding-top:100px; padding-bottom:100px;">
              最初にユーザー登録、右上の表示が変わったらエディタページに移動して授業を登録、
              <br />再読み込みなんかをしてログイン状態じゃなくなったらログインページからログインし直してね
            </p>
            <router-link to="/Initial_Registration">
              <div class="my-12">
                <v-btn rounded block x-large>ユーザー登録</v-btn>
              </div>
            </router-link>
            <router-link to="/Initial_Registration">
              <div class="my-12">
                <v-btn rounded block x-large color="#F99F48">ログイン</v-btn>
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

<style scoped></style>
