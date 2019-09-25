<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>未来予想図</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar-nav-icon color="red accent-4" dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-btn>
        <router-link to="/">未来予想図</router-link>
      </v-btn>
    </v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-btn>
      <router-link to="/ClassSchedule">時間割エディタ</router-link>
    </v-btn>

    <!-- <v-menu
                    left
                    bottom
            >
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                        
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                            v-for="n in 5"
                            :key="n"
                            @click="() => {}"
                    >
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                </v-list>
    </v-menu>-->
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      drawer: null,
      items: [{ title: 'Home', icon: 'dashboard' }, { title: 'About', icon: 'question_answer' }],
      login: true //true:ログイン済み false:未ログイン
    };
  }
};
</script>

<style scoped></style>
