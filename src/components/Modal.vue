<template>
  <div class="modal">
    <p>Заявка отправлена.</p>
    <img src="../assets/success_img.png" alt="Заявка успешно отправлена" />
    <button @click="onClickButton">&#10006;</button>
  </div>
</template>

<script>
export default {
  methods: {
    onClickButton() {
      this.$emit("clicked", "someValue");
    }
  }
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 10;
  background-color: white;
  width: 350px;
  height: 250px;
  padding: 20px;
  border: 10px solid darkgray;
  border-radius: 10px;
}
button {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 25px;
}
p {
  margin: 0;
  margin: 20px;
  font-weight: bold;
}
</style>
