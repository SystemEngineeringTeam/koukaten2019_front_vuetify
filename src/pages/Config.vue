
<template>
  <div>
    <form>
      <v-card>
        <v-text-field
          backgroud-color="White"
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="現在のパスワード"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="新しいパスワード"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-select
          v-model="select"
          :items="items"
          :error-messages="selectErrors"
          label="新しいパスワード（確認）"
          required
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>
        <v-row align="center">
          <v-col cols="3">
            <v-select :items="grade" :menu-props="{ top: true, offsetY: true }" label="学年"></v-select>
          </v-col>
        </v-row>

        <v-btn class="mr-4" @click="clear">clear</v-btn>
        <v-btn @click="submit">submit</v-btn>
      </v-card>
    </form>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      password: null,
      password_new: null,
      password_new_re: null,
      grade: 1,
      major: "EE",
      password_false: false,
      password_new_disagree: false,
      grade: ["1", "2", "3", "4"],
      semester: [
        "EE",
        "EV",
        "CC",
        "CB",
        "MM",
        "MP",
        "DD",
        "DS",
        "FA",
        "FL",
        "HT",
        "HH",
        "KK",
        "KX"
      ]
    };
  }
};
</script>

<style scoped>
</style>