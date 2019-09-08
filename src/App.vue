<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>未来予想図</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :value="item.link">
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.link">{{ item.title }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon color="red accent-4" dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link class="a" to="/">
          <font color="black">未来予想図</font>
        </router-link>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <!-- <v-btn>
        <router-link to="/ClassSchedule">時間割エディタ</router-link>
      </v-btn>-->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header";
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "時間割エディタ", link: "/ClassSchedule" },
        { title: "授業アンケート", link: "/ClassSchedule" },
        { title: "設定", link: "/ClassSchedule" },
        { title: "ログイン", link: "/ClassSchedule" }
      ],
      login: true //true:ログイン済み false:未ログイン
    };
  },
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
.a {
  font-size: 38px;
  text-decoration: none;
}
</style>

<!--<template>-->
  <!--<v-app>-->
    <!--<v-app-bar app>-->
      <!--<v-toolbar-title class="headline text-uppercase">-->
        <!--<span>Vuetify</span>-->
        <!--<span class="font-weight-light">MATERIAL DESIGN</span>-->
      <!--</v-toolbar-title>-->
      <!--<v-spacer></v-spacer>-->
      <!--<v-btn-->
        <!--text-->
        <!--href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
        <!--target="_blank"-->
      <!--&gt;-->
        <!--<span class="mr-2">Latest Release</span>-->
      <!--</v-btn>-->
    <!--</v-app-bar>-->

    <!--<v-content>-->
      <!--<HelloWorld/>-->
    <!--</v-content>-->
  <!--</v-app>-->
<!--</template>-->

<!--<script>-->
<!--import HelloWorld from './components/HelloWorld';-->

<!--export default {-->
  <!--name: 'App',-->
  <!--components: {-->
    <!--HelloWorld,-->
  <!--},-->
  <!--data: () => ({-->
    <!--//-->
  <!--}),-->
<!--};-->
<!--</script>-->
