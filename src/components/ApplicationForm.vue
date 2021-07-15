<template>
  <div class="app-form">
    <form id="app-form">
      <section class="branch">
        <h3 class="branch__heading">Ваш филиал <span>*</span></h3>
        <v-select
          class="branch__select"
          placeholder="Выберите город:"
          v-model="form.city"
          :options="cities"
          label="title"
          key="id"
          :disabled="form.online === true"
        >
        </v-select>
        <div class="branch__online">
          <input type="checkbox" v-model="form.online" />
          <label>Онлайн</label>
        </div>
      </section>
      <section class="topic">
        <h3 class="topic__heading">Тема обращения <span>*</span></h3>
        <div class="topic__checkboxes">
          <div class="topic__checkbox-group">
            <input
              class="topic__checkbox"
              id="network"
              @change="topicCheckboxChange"
              type="checkbox"
              value="quality"
              v-model="form.topics"
            />
            <label for="network" class="topic__label"
              >Недоволен качеством услуг</label
            >
          </div>
          <div class="topic__checkbox-group">
            <input
              class="topic__checkbox"
              id="network"
              @change="topicCheckboxChange"
              type="checkbox"
              value="contract"
              v-model="form.topics"
            />
            <label for="network" class="topic__label"
              >Расторжение договора</label
            >
          </div>
          <div class="topic__checkbox-group">
            <input
              class="topic__checkbox"
              id="network"
              @change="topicCheckboxChange"
              type="checkbox"
              value="activation"
              v-model="form.topics"
            />
            <label for="network" class="topic__label"
              >Не приходит письмо активации на почту</label
            >
          </div>
          <div class="topic__checkbox-group">
            <input
              class="topic__checkbox"
              id="network"
              @change="topicCheckboxChange"
              type="checkbox"
              value="account"
              v-model="form.topics"
            />
            <label for="network" class="topic__label"
              >Не работает личный кабинет</label
            >
          </div>
          <input
            class="topic__input"
            placeholder="Другое"
            type="text"
            v-model="form.newTopic"
            @keypress="topicInputChange"
          />
        </div>
      </section>
      <section>
        <h3>Описание проблемы <span>*</span></h3>
        <textarea
          placeholder="Введите текст"
          rows="7"
          v-model="form.problem"
        ></textarea>
      </section>
      <section>
        <h3>Загрузка документов</h3>
        <p>Приложите, пожалуйста, полноэкранный скриншот.</p>
        <p>Это поможет быстрее решить проблему.</p>
        <input type="file" id="file" @change="fileChange" />
      </section>
      <button
        type="submit"
        :disabled="isDisabled(this.form)"
        @click="checkForm"
      >
        Отправить
      </button>
    </form>
    <Modal v-if="modalShow" @clicked="onClickButton"  />
  </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      cities: [],
      modalShow: false,
      form: {
        online: false,
        city: "",
        topics: [],
        newTopic: "",
        problem: "",
        file: null
      }
    };
  },
  mounted() {
    fetch("https://60254fac36244d001797bfe8.mockapi.io/api/v1/city")
      .then(response => response.json())
      .then(json => (this.cities = json));
  },
  methods: {
    isDisabled(data) {
      return !(
        (data.online || data.city !== "") &&
        (data.newTopic !== "" || data.topics.length > 0) &&
        data.problem !== ""
      );
    },
    topicInputChange() {
      this.form.topics = [];
    },
    topicCheckboxChange() {
      this.form.newTopic = "";
    },
    fileChange(event) {
      this.form.file = event.target.files[0];
    },
    onClickButton() {
      this.modalShow = !this.modalShow;
    },
    checkForm(e) {
      e.preventDefault();
      this.$axios
        .post(
          "https://60254fac36244d001797bfe8.mockapi.io/api/v1/send-form",
          this.form
        )
        .then(res => {
          console.log(res);
          if (res.data.success){
            this.modalShow = !this.modalShow;
          }
          else {
            alert('Ошибка отправки заявки')
          }
        })
        .catch(error => {
          console.log(error);
        });
      e.target.parentElement.reset();
      this.form.city = "";
      this.form.problem = "";
      this.form.newTopic = "";
    }
  }
};
</script>

<style scoped>
form {
  position: relative;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 4px;
  z-index: 1;
}

section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

p {
  margin: 0;
  text-align: left;
  font-size: 14px;
}

h2 {
  margin: 0;
  font-size: 18px;
}

h3 {
  margin: 0;
  margin-right: 20px;
  margin-bottom: 10px;
  display: inline-block;
  text-align: left;
  font-size: 16px;
}
span {
  color: red;
}
label {
  width: fit-content;
  font-size: 14px;
}

input {
  margin: 5px 0;
}

textarea {
  width: 100%;
  border: 1px solid darkgrey;
  border-radius: 4px;
}
textarea::placeholder {
  font-family: Arial, Helvetica, sans-serif;
}
input[type="checkbox"] {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}
button {
  width: 100px;
  height: 30px;
  padding: 0;
  padding: 5px 10px;
  color: #ffffff;
  font-weight: bold;
  border: none;
  background-color: rgb(231, 153, 101);
  text-transform: uppercase;
}
button:disabled {
  background-color: rgb(197, 192, 188);
}
.branch__select {
  width: 210px;
  font-size: 14px;
}
.branch__online {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.branch__city {
  display: flex;
  align-items: center;
}

.topic__checkboxes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.topic__checkbox-group {
  margin: 5px 0;
}
.topic__input {
  width: 200px;
  height: 25px;
  border: 1px solid darkgrey;
  border-radius: 4px;
}
.topic__checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.topic__label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.topic__label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #000000;
  border-radius: 50%;
  margin-right: 0.5em;
}
.topic__checkbox:checked + label::before {
  background: url("../assets/black-circle-svgrepo-com.svg") no-repeat center;
  background-size: 50%;
}
</style>
