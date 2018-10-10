<template>
  <Modal
    v-model="modalShow"
    title="Common Modal dialog box title"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <i-input
      v-model="value"
      class="modal-custom-textarea"
      type="textarea"
    />
  </Modal>
</template>

<script>
import Modal from 'iview/src/components/modal';
import Input from 'iview/src/components/input';

export default {
  components: {
    Modal,
    'i-input': Input,
  },
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
