<template>
  <div id="app">
    <h1>Форма подачи заявки в отдел сервиса и качества</h1>
    <ApplicationForm />
  </div>
</template>

<script>
import ApplicationForm from "@/components/ApplicationForm";

export default {
  name: "App",
  components: {
    ApplicationForm
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

h1 {
  margin: 0;
  margin-bottom: 10px;
  font-size: 22px;
  text-align: left;
}
</style>
