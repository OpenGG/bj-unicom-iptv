<template>
  <Modal
    v-model="modalShow"
    title="Common Modal dialog box title"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <Input
      class="modal-custom-textarea"
      type="textarea"
      v-model="value"
    />
  </Modal>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      modalShow: false,
    };
  },
  methods: {
    ok() {
      this.$emit('submit', this.value);
    },
    cancel() {},
    show(value) {
      this.value = value;
      this.modalShow = true;
    },
  },
};
</script>

<style>
.modal-custom-textarea textarea {
  height: 50vh;
  resize: none;
}
</style>
