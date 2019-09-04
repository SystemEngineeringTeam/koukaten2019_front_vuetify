<template>
  <v-app>
    <Header></Header>
    <router-view/>
  </v-app>
</template>

<script>
    import Header from "./components/Header";
    export default {
        name: 'App',
        components: {
            Header,
        }
    }
</script>

<style lang="scss">

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
