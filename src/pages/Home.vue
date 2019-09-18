<template>
  <div class="text-center">
    <v-card height="700">
      <v-card-title class="headline"></v-card-title>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card height="500">
              <p style="padding-top:100px; padding-bottom:100px;">時間割エディタ</p>
              <router-link to="/Initial_Registration">
                <v-btn class="mt-12">新規作成・編集</v-btn>
              </router-link>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card height="500">
              <p style="padding-top:100px; padding-bottom:100px;">授業アンケート</p>
              <v-btn class="mt-12">検索</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ title: "新規作成", link: "/Initial_Registration" }]
    };
  }
};
</script>

<style scoped>
</style>