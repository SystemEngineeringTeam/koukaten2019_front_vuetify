<template>
  <div>
    <!-- 切り替えボタンの設定 -->
    <b-button v-if="now == null" v-b-modal="modal_id">授業を登録</b-button>

    <b-button v-else v-b-modal="modal_id">
      {{ now['name'] }}
      <br />
      {{ now['type'] }} {{ now['credit'] }}単位
      <br />
      {{ now['teacher1'] }}
    </b-button>

    <!-- モーダルの設定 -->
    <b-modal :id="modal_id" title="授業登録" hide-footer>
      <b-button v-on:click="set_ko(null, day, time)" @click="$bvModal.hide(modal_id)" data-dismiss="modal"
        >登録を取り消す</b-button
      >
      <b-button
        v-for="data in data_list"
        v-bind:key="data.id"
        v-on:click="set_ko(data, day, time)"
        @click="$bvModal.hide(modal_id)"
        data-dismiss="modal"
      >
        {{ data['name'] }}
        <br />
        {{ data['type'] }} {{ data['credit'] }}単位
        <br />
        {{ data['teacher1'] }}
      </b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TimeTableButton',
  props: ['modal_id', 'now', 'data_list', 'day', 'time'],
  methods: {
    set_ko: function(now, day, time) {
      this.$emit('set_data', {
        now: now,
        day: day,
        time: time
      });
    }
  }
};
</script>

<style scoped>
.height100 {
  height: 100%;
}

.register_button {
  width: 50%;
  height: 100%;
  padding: 5%;
}

.pickup_button {
  border: none;
  outline: none;
  /*appearance: none;*/
  width: 100%;
  height: 100%;
  padding: 5%;
  background-color: white;
}

.pickup_button:hover {
  background-color: lightgreen;
}
</style>
