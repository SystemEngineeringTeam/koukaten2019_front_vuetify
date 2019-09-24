<template>
  <div>
    オブジェクト指向プログラミング及び演習１ 教員：内種 岳詞･永谷 栄宏
    <br />前期 木曜 Ⅲ,Ⅳ限 単位区分：専門(選択) 3単位
    <v-btn
      dark
      large
      rounded
      elevation="10"
      color="orange"
      v-if="!is_edit"
      v-on:click="
        is_edit = true;
        $store.dispatch('get_can_register_lectures', 'kk');
      "
    >
      授業を登録
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {};
</script>

<style scoped></style>
