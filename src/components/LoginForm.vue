<template>
    <div>
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-text-field
                    v-model="ID"
                    :counter="8"
                    :rules="IDRules"
                    label="学籍番号"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    :rules="PassRules"
                    label="パスワード"
                    counter
                    @click:append="show1 = !show1"
            ></v-text-field>


            <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="login"
            >
                ログインする
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "LoginForm",
        data: () => ({
            valid: true,
            ID: '',
            password: '',
            IDRules: [
                v => !!v || '学籍番号は必ず入力してください',
                v => (v && v.length == 8) || '',
            ],
            PassRules:[
                v => !!v || 'パスワードは必ず入力してください',
            ],
            checkbox: false,
            show1: false,
        }),

        methods: {
            login(){

            },
        },
    }
</script>

<style scoped>

</style>