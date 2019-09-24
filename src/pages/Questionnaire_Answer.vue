<template>
  <div>
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
