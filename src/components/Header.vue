<template>
    <div>
        <v-app-bar
                color="deep-purple accent-4"
                dark
        >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Page title</v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-btn>
                <router-link to="/">未来予想図</router-link>
            </v-btn>

            <v-btn>
                <router-link to="/ClassSchedule">時間割エディタ</router-link>
            </v-btn>

            <v-menu
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
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                login: true //true:ログイン済み false:未ログイン
            };
        }
    }
</script>

<style scoped>

</style>
