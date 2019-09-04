<template>
    <div>
        <!-- 切り替えボタンの設定 -->
        <button v-if="now !== null" type="button" class="btn btn-primary" data-toggle="modal"
                :data-target="'#'+modal_id">
            {{now['name']}}
            <br>
            {{ now["type"]}} {{ now["credit"]}}単位
            <br>
            {{ now["teacher1"]}}
        </button>

        <button v-else type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#'+modal_id">
            授業を登録
        </button>

        <!-- モーダルの設定 -->
        <div class="modal fade" v-bind:id="modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">授業登録</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="閉じる">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <button class="col-sm-6 col-md-3" v-on:click="set_ko(null, day, time)" data-dismiss="modal">
                            登録を取り消す
                        </button>
                        <template v-for="data in data_list">
                            <button class="col-sm-6 col-md-3" v-on:click="set_ko(data, day, time)" data-dismiss="modal">
                                {{data['name']}}
                                <br>
                                {{ data["type"]}} {{ data["credit"]}}単位
                                <br>
                                {{ data["teacher1"]}}
                            </button>
                        </template>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                        <button type="button" class="btn btn-primary">変更を保存</button>
                    </div><!-- /.modal-footer -->
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>

    export default {
        name: "TimeTableButton",
        props: [
            'modal_id',
            'now',
            'data_list',
            'grade',
            'semester',
            'day',
            'time'
        ],
        methods: {
            set_ko: function (now, day, time) {
                this.$emit(
                    'set_data',
                    {
                        now: now,
                        day: day,
                        time: time
                    }
                )
            }
        }
    }
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