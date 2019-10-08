<template>
  <div class="text-center">
    <v-card height="800">
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
            <!-- <p
              class="font-italic font-weight-bold"
              style="padding-top:20px; padding-bottom:20px; font-size:100px; "
            >未来予想図</p>-->
            <!-- <v-sheet class="pa-12" color="#D5EEFF" style="font-size:20px">
              最初にユーザー登録、右上の表示が変わったらエディタページに移動して授業を登録、
              <br />再読み込みなんかをしてログイン状態じゃなくなったらログインページからログインし直してね
              <p></p>
            </v-sheet>-->
            <p class="font-weight-bold" style="font-size:30px; font-color:orange; ">未来予想図の使い方</p>
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">機能説明（授業登録）</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">機能説明（保存、削除、単位表）</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="3">機能説明（絞込み機能）</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="4">機能説明（単位数について）</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="mb-12" color="grey lighten-1" height="250px"></v-card>

                  <v-btn color="primary" @click="e1 = 2">次へ</v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="mb-12" color="grey lighten-1" height="250px"></v-card>

                  <v-btn text @click="e1 = 1">戻る</v-btn>

                  <v-btn color="primary" @click="e1 = 3">次へ</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-col cols="6" class="d-flex">
                    <v-card color="#78BBE6" height="260px">
                      <v-img src="../../public/checkbox_setumei_smart.png" max-width="530" max-height="300"></v-img>
                      <v-col>
                        <v-card>下の画像のようになります</v-card>
                      </v-col>
                      <v-img
                        src="../../public/checkbox_setumei_sin_lec.png"
                        max-width="530"
                        max-height="300"
                      ></v-img> </v-card
                    >aaaa
                    <v-card color="#78BBE6" height="260px">
                      <v-img src="../../public/checkbox_setumei2.png" max-width="530" max-height="300"></v-img>
                      <v-col>
                        <v-card>下の画像のようになります</v-card>
                      </v-col>
                      <v-img src="../../public/setumei.png" max-width="530" max-height="300"></v-img>
                    </v-card>
                  </v-col>

                  <v-btn text　@click="e1 = 2">戻る</v-btn>

                  <v-btn color="primary" @click="e1 = 4">次へ</v-btn>
                </v-stepper-content>

                <v-stepper-content step="4">
                  <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                  <v-btn text　@click="e1 = 3">戻る</v-btn>

                  <v-btn color="primary" @click="e1 = 1">終了</v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
            <router-link to="/Initial_Registration" class="none_text">
              <div class="my-12">
                <v-btn rounded block x-large color="#78BBE6" v-if="this.$store.state.user.logined == false"
                  >ユーザー登録</v-btn
                >
              </div>
            </router-link>
            <router-link to="/Login" class="none_text">
              <div class="my-12">
                <v-btn rounded block x-large color="#F99F48" v-if="this.$store.state.user.logined == false"
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
      e1: 0,
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
