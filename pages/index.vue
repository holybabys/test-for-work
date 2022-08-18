<template>
  <div class="container">
    <div class="position-relative header">
      <h1>
        Оформление заказа
      </h1>
      <nuxt-link to="/">
        <img alt="" class="position-absolute" src="~assets/img/arrow.svg">
      </nuxt-link>

    </div>
    <form class="mb-5" novalidate @submit.prevent="onAccept">
      <div class="desctop">
        <h2 class="form_title">
          Кто будет сдавать анализы?
        </h2>
        <div class="section">
          <b-card no-body>
            <b-tabs card pills>
              <b-tab title="Пациент из моей семьи">
                <b-card-text>Tab contents 1</b-card-text>
              </b-tab>
              <b-tab active title="Новый пациент">
                <div class="d-flex row justify-content-between inputs-holder">
                  <div class="col-md-6 col-sm-12 my-col">
                    <b-form-input
                      class="form-input"
                      placeholder="Фамилия пациента"
                      required
                      v-model="form.surname"
                      type="text"
                    ></b-form-input>
                  </div>
                  <div class="col-md-6 col-sm-12 my-col">
                    <b-input-group>
                      <b-form-input
                        id="example-input"
                        v-model="form.birthday"
                        autocomplete="off"
                        class="form-input"
                        placeholder="Дата рождения пациента"
                        type="text"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-form-datepicker
                          v-model="value"
                          aria-controls="example-input"
                          button-only
                          locale="en-US"
                          right
                          @context="onContext"
                        ></b-form-datepicker>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
                <div class="d-flex row justify-content-between inputs-holder">
                  <div class="col-md-6  col-sm-12 my-col">
                    <b-form-input
                      class="form-input"
                      placeholder="Имя пациента"
                      required
                      v-model.trim="name"
                      :class="{invalid: $v.name.$dirty && !$v.name.required}"
                      type="text"
                    ></b-form-input>
                    <small class="invalid" v-if="$v.name.$dirty && !$v.name.required">
                      Поле обязательно.
                    </small>
                  </div>
                  <div class="col-md-3 my-col">
                    <div v-if="selectedPassportMode !== 'male'" class="radio-btn">
                      <b-form-radio v-model="selectedPassportMode" name="some-radios" value="male">
                        Мужчина
                      </b-form-radio>
                    </div>
                    <div v-if="selectedPassportMode === 'male'" class="radio-btn-active">
                      <b-form-radio v-model="selectedPassportMode" name="some-radios" value="male">
                        Мужчина
                      </b-form-radio>
                    </div>
                  </div>
                  <div class="col-md-3 my-col">
                    <div v-if="selectedPassportMode !== 'female'" class="radio-btn">
                      <b-form-radio v-model="selectedPassportMode" name="some-radios" value="female">
                        Женщина
                      </b-form-radio>
                    </div>
                    <div v-if="selectedPassportMode === 'female'" class="radio-btn-active">
                      <b-form-radio v-model="selectedPassportMode" name="some-radios" value="female">
                        Женщина
                      </b-form-radio>
                    </div>
                  </div>

                </div>
                <div class="d-flex row justify-content-between inputs-holder">
                  <div class="col-md-6 my-col">
                    <b-form-input
                      class="form-input"
                      placeholder="Отчество пациента"
                      required
                      type="text"
                    ></b-form-input>
                  </div>
                </div>
                <div class="d-flex row align-items-center check-box-holder">
                  <b-form-checkbox-group
                    v-model="form.checked"
                  >
                    <b-form-checkbox value="representative">Пациент придёт с представителем</b-form-checkbox>
                  </b-form-checkbox-group>
                  <span v-b-tooltip.hover title="Lorem ipsum dolor sit amet.">
                <img alt="" src="~assets/img/tool-icon.svg">
              </span>
                </div>

              </b-tab>
            </b-tabs>
          </b-card>

        </div>
        <h2 class="form_title">
          Данные для отправки анализов
        </h2>
        <span class="desc">
        Поступят вам на почту, указанную в договоре. Вам придет смс-уведомление о готовности
      </span>
        <div class="section row d-flex">
          <div class="col-md-6 col-sm-12 my-col d-flex">

            <div class="position-relative">
              <label class="position-absolute placeholder-custom">Код</label>
              <b-form-input
                class="code-input"
                required
                type="text"
              ></b-form-input>
            </div>
            <div class="position-relative">
              <label class="position-absolute placeholder-custom">Телефон</label>
              <b-form-input
                v-model="form.phone"
                v-mask="'### ##-##'"
                class="number-input"
                inputmode="decimal"
                required
                type="text"
              ></b-form-input>
            </div>

          </div>
          <div class="col-md-6 col-sm-12 my-col d-flex">

            <div class="position-relative w-100">
              <label class="position-absolute placeholder-custom">Email</label>
              <b-form-input
                class="email-input"
                required
                v-model="form.email"
                type="email"
              ></b-form-input>
            </div>

          </div>

        </div>
        <h2 class="form_title">
          Для оформления договора понадобится паспорт
        </h2>
        <span class="desc">
        Выберите как вам удобнее предоставить данные
      </span>
        <div class="section d-flex row">
          <div class="col-md-3 col-sm-12 my-col">
            <div v-if="selectedPassportMode !== 'A'" class="radio-btn">
              <b-form-radio v-model="selectedPassportMode" name="some-radios" value="A">
                Заполню сейчас
              </b-form-radio>
            </div>
            <div v-if="selectedPassportMode === 'A'" class="radio-btn-active">
              <b-form-radio v-model="selectedPassportMode" name="some-radios" value="A">
                Заполню сейчас
              </b-form-radio>
            </div>
          </div>

          <div class="col-md-4 col-sm-12 my-col">
            <div v-if="selectedPassportMode !== 'B'" class="radio-btn">
              <b-form-radio v-model="selectedPassportMode" name="some-radios" value="B">
                Предоставлю на месте
              </b-form-radio>

            </div>
            <div v-if="selectedPassportMode === 'B'" class="radio-btn-active">
              <b-form-radio v-model="selectedPassportMode" name="some-radios" value="B">
                Предоставлю на месте
              </b-form-radio>

            </div>
          </div>

          <div class="col-md-5 col-sm-12 my-col">
            <div v-if="selectedPassportMode !== 'C'" class="radio-btn">
              <b-form-radio v-model="selectedPassportMode" name="some-radios" value="C">
                Свяжитесь со мной сами
              </b-form-radio>

            </div>
            <div v-if="selectedPassportMode === 'C'" class="radio-btn-active">
              <b-form-radio v-model="selectedPassportMode" name="some-radios" value="C">
                Свяжитесь со мной сами
              </b-form-radio>

            </div>
          </div>


        </div>
        <div v-if="selectedPassportMode === 'A'">
          <h2 class="form_title">
            Паспорт пациента
          </h2>
          <div class="d-flex row justify-content-between inputs-holder">
            <div class="col-md-6 my-col">
              <label class="position-absolute placeholder-custom">Гражданство</label>
              <b-form-select v-model="selected" :options="country" class="email-input"></b-form-select>
            </div>
            <div class="col-md-6 my-col">
              <b-input-group>
                <b-form-input
                  id="example-input"
                  v-model="value"
                  autocomplete="off"
                  class="form-input"
                  placeholder="Кем выдан паспорт" s
                  type="text"
                ></b-form-input>

              </b-input-group>
            </div>
          </div>
          <div class="d-flex row justify-content-between inputs-holder">
            <div class="col-md-6 my-col">
              <b-form-input
                v-model="passportNumber"
                class="form-input"
                inputmode="decimal"
                placeholder="Номер и серия паспорт"
                required
                type="text"
              ></b-form-input>
            </div>
            <div class="col-md-6 my-col">
              <b-input-group>
                <b-form-input
                  id="example-input"
                  v-model="value"
                  autocomplete="off"
                  class="form-input"
                  placeholder="Дата рождения пациента"
                  type="text"
                ></b-form-input>
                <b-input-group-append>
                  <b-form-datepicker
                    v-model="value"
                    aria-controls="example-input"
                    button-only
                    locale="en-US"
                    right
                    @context="onContext"
                  ></b-form-datepicker>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <div class="d-flex row justify-content-between inputs-holder">

            <div class="col-md-12 my-col">
              <b-input-group>
                <b-form-input
                  id="example-input"
                  v-model="address"
                  autocomplete="off"
                  class="form-input"
                  placeholder="Адресс регистрации"
                  type="text"
                ></b-form-input>

              </b-input-group>
            </div>
          </div>
        </div>
        <h2 class="form_title">
          Добавьте СНИЛС, для синхронизации с Госуслугами
        </h2>
        <div class="d-flex justify-content-between inputs-holder">

          <div class="col-md-12 my-col">
            <b-input-group>
              <b-form-input
                id="example-input"
                v-model="snils"
                autocomplete="off"
                class="form-input"
                placeholder="СНИЛС"
                type="text"
              ></b-form-input>

            </b-input-group>
          </div>
        </div>

        <h2 class="form_title">
          Способ оплаты
        </h2>
        <div class="payment section">
          <div class="d-flex justify-content-between inputs-holder">
            <div class="col-md-12 my-col">
              <b-form-select v-model="selectedPayment" :options="payment" class="form-input"></b-form-select>
            </div>
          </div>
          <ul id="payment">
            <li v-for="item in payment" :key="item.text"
                class="d-flex justify-content-between payment-item align-items-center">
            <span>
              {{ item.text }}
            </span>
              <button class="sub-btn" type="button">
                Выбрать
              </button>
            </li>
          </ul>
        </div>
        <h2 class="form_title">
          Выберите удобные дату и время
        </h2>
        <div class="section">
          <div class="col-md-12">
            <div class="calendar">
              <div class="calendar-header">
                {{ months[month] }}
              </div>
              <ul class="d-flex justify-content-between calendar-body">
                <li v-for="day in days" v-bind:class="{ 'active-day': visitDay.id === day.id }" @click="chooseDay(day)">
                <span>
                    {{ day.day }}
                </span>
                  <p>
                    {{ day.weekday }}
                  </p>

                </li>
              </ul>
            </div>
            <ul class="d-flex justify-content-between time-list">
              <li v-for="time in getTimeList" v-bind:class="{ 'active-day': visitTime.id === time.id }"
                  @click="chooseTime(time)">
                {{ time.time }}

              </li>
            </ul>
          </div>
        </div>
        <h2 class="form_title">
          Комментарий к заказу
        </h2>
        <div class="section">
          <b-form-textarea
            id="textarea-no-resize"
            placeholder="Напишите коментарий лаборатории..."
            rows="8"
            no-resize
            v-model="form.text"
          ></b-form-textarea>
        </div>
      </div>


      <div class="accordion" >
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1 mb-2" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info">  Кто будет сдавать анализы?</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" >
            <b-card-body>
              <div class="section">
                <b-card no-body>
                  <b-tabs card pills>
                    <b-tab title="Пациент из моей семьи">
                      <b-card-text>Tab contents 1</b-card-text>
                    </b-tab>
                    <b-tab active title="Новый пациент">
                      <div class="d-flex row justify-content-between inputs-holder">
                        <div class="col-md-6 col-sm-12 my-col">
                          <b-form-input
                            class="form-input"
                            placeholder="Фамилия пациента"
                            required
                            v-model="form.surname"
                            type="text"
                          ></b-form-input>
                        </div>
                        <div class="col-md-6 col-sm-12 my-col">
                          <b-input-group>
                            <b-form-input
                              id="example-input"
                              v-model="form.birthday"
                              autocomplete="off"
                              class="form-input"
                              placeholder="Дата рождения пациента"
                              type="text"
                            ></b-form-input>
                            <b-input-group-append>
                              <b-form-datepicker
                                v-model="value"
                                aria-controls="example-input"
                                button-only
                                locale="en-US"
                                right
                                @context="onContext"
                              ></b-form-datepicker>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                      </div>
                      <div class="d-flex row justify-content-between inputs-holder">
                        <div class="col-md-6  col-sm-12 my-col">
                          <b-form-input
                            class="form-input"
                            placeholder="Имя пациента"
                            required
                            v-model="form.name"
                            type="text"
                          ></b-form-input>
                        </div>
                        <div class="col-md-3 my-col">
                          <div v-if="selectedPassportMode !== 'male'" class="radio-btn">
                            <b-form-radio v-model="selectedPassportMode" name="some-radios" value="male">
                              Мужчина
                            </b-form-radio>
                          </div>
                          <div v-if="selectedPassportMode === 'male'" class="radio-btn-active">
                            <b-form-radio v-model="selectedPassportMode" name="some-radios" value="male">
                              Мужчина
                            </b-form-radio>
                          </div>
                        </div>
                        <div class="col-md-3 my-col">
                          <div v-if="selectedPassportMode !== 'female'" class="radio-btn">
                            <b-form-radio v-model="selectedPassportMode" name="some-radios" value="female">
                              Женщина
                            </b-form-radio>
                          </div>
                          <div v-if="selectedPassportMode === 'female'" class="radio-btn-active">
                            <b-form-radio v-model="selectedPassportMode" name="some-radios" value="female">
                              Женщина
                            </b-form-radio>
                          </div>
                        </div>

                      </div>
                      <div class="d-flex row justify-content-between inputs-holder">
                        <div class="col-md-6 my-col">
                          <b-form-input
                            class="form-input"
                            placeholder="Отчество пациента"
                            required
                            type="text"
                          ></b-form-input>
                        </div>
                      </div>
                      <div class="d-flex row align-items-center check-box-holder">
                        <b-form-checkbox-group
                          v-model="form.checked"
                        >
                          <b-form-checkbox value="representative">Пациент придёт с представителем</b-form-checkbox>
                        </b-form-checkbox-group>
                        <span v-b-tooltip.hover title="Lorem ipsum dolor sit amet.">
                <img alt="" src="~assets/img/tool-icon.svg">
              </span>
                      </div>

                    </b-tab>
                  </b-tabs>
                </b-card>

              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1 mb-2" role="tab">
            <b-button block v-b-toggle.accordion-2 variant="info">Данные для отправки анализов</b-button>
          </b-card-header>
          <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="section row d-flex">
                <div class="col-md-6 col-sm-12 my-col d-flex">

                  <div class="position-relative">
                    <label class="position-absolute placeholder-custom">Код</label>
                    <b-form-input
                      class="code-input"
                      required
                      type="text"
                    ></b-form-input>
                  </div>
                  <div class="position-relative">
                    <label class="position-absolute placeholder-custom">Телефон</label>
                    <b-form-input
                      v-model="form.phone"
                      v-mask="'### ##-##'"
                      class="number-input"
                      inputmode="decimal"
                      required
                      type="text"
                    ></b-form-input>
                  </div>

                </div>
                <div class="col-md-6 col-sm-12 my-col d-flex">

                  <div class="position-relative w-100">
                    <label class="position-absolute placeholder-custom">Email</label>
                    <b-form-input
                      class="email-input"
                      required
                      v-model="form.email"
                      type="email"
                    ></b-form-input>
                  </div>

                </div>

              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1 mb-2" role="tab">
            <b-button block v-b-toggle.accordion-3 variant="info">Для оформления договора понадобится паспорт </b-button>
          </b-card-header>
          <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="section d-flex row">
                <div class="col-md-3 col-sm-12 my-col">
                  <div v-if="selectedPassportMode !== 'A'" class="radio-btn">
                    <b-form-radio v-model="selectedPassportMode" name="some-radios" value="A">
                      Заполню сейчас
                    </b-form-radio>
                  </div>
                  <div v-if="selectedPassportMode === 'A'" class="radio-btn-active">
                    <b-form-radio v-model="selectedPassportMode" name="some-radios" value="A">
                      Заполню сейчас
                    </b-form-radio>
                  </div>
                </div>

                <div class="col-md-4 col-sm-12 my-col">
                  <div v-if="selectedPassportMode !== 'B'" class="radio-btn">
                    <b-form-radio v-model="selectedPassportMode" name="some-radios" value="B">
                      Предоставлю на месте
                    </b-form-radio>

                  </div>
                  <div v-if="selectedPassportMode === 'B'" class="radio-btn-active">
                    <b-form-radio v-model="selectedPassportMode" name="some-radios" value="B">
                      Предоставлю на месте
                    </b-form-radio>

                  </div>
                </div>

                <div class="col-md-5 col-sm-12 my-col">
                  <div v-if="selectedPassportMode !== 'C'" class="radio-btn">
                    <b-form-radio v-model="selectedPassportMode" name="some-radios" value="C">
                      Свяжитесь со мной сами
                    </b-form-radio>

                  </div>
                  <div v-if="selectedPassportMode === 'C'" class="radio-btn-active">
                    <b-form-radio v-model="selectedPassportMode" name="some-radios" value="C">
                      Свяжитесь со мной сами
                    </b-form-radio>

                  </div>
                </div>


              </div>
              <div v-if="selectedPassportMode === 'A'">
                <h2 class="form_title">
                  Паспорт пациента
                </h2>
                <div class="d-flex row justify-content-between inputs-holder">
                  <div class="col-md-6 my-col">
                    <label class="position-absolute placeholder-custom">Гражданство</label>
                    <b-form-select v-model="selected" :options="country" class="email-input"></b-form-select>
                  </div>
                  <div class="col-md-6 my-col">
                    <b-input-group>
                      <b-form-input
                        id="example-input"
                        v-model="value"
                        autocomplete="off"
                        class="form-input"
                        placeholder="Кем выдан паспорт" s
                        type="text"
                      ></b-form-input>

                    </b-input-group>
                  </div>
                </div>
                <div class="d-flex row justify-content-between inputs-holder">
                  <div class="col-md-6 my-col">
                    <b-form-input
                      v-model="passportNumber"
                      class="form-input"
                      inputmode="decimal"
                      placeholder="Номер и серия паспорт"
                      required
                      type="text"
                    ></b-form-input>
                  </div>
                  <div class="col-md-6 my-col">
                    <b-input-group>
                      <b-form-input
                        id="example-input"
                        v-model="value"
                        autocomplete="off"
                        class="form-input"
                        placeholder="Дата рождения пациента"
                        type="text"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-form-datepicker
                          v-model="value"
                          aria-controls="example-input"
                          button-only
                          locale="en-US"
                          right
                          @context="onContext"
                        ></b-form-datepicker>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
                <div class="d-flex row justify-content-between inputs-holder">

                  <div class="col-md-12 my-col">
                    <b-input-group>
                      <b-form-input
                        id="example-input"
                        v-model="address"
                        autocomplete="off"
                        class="form-input"
                        placeholder="Адресс регистрации"
                        type="text"
                      ></b-form-input>

                    </b-input-group>
                  </div>
                </div>
              </div>

            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1 mb-2" role="tab">
            <b-button block v-b-toggle.accordion-4 variant="info">Добавьте СНИЛС, для синхронизации с Госуслугами </b-button>
          </b-card-header>
          <b-collapse id="accordion-4" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="d-flex justify-content-between inputs-holder">

                <div class="col-md-12 my-col">
                  <b-input-group>
                    <b-form-input
                      id="example-input"
                      v-model="snils"
                      autocomplete="off"
                      class="form-input"
                      placeholder="СНИЛС"
                      type="text"
                    ></b-form-input>

                  </b-input-group>
                </div>
              </div>

            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1 mb-2" role="tab">
            <b-button block v-b-toggle.accordion-5 variant="info">Способ оплаты </b-button>
          </b-card-header>
          <b-collapse id="accordion-5" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="payment section">
                <div class="d-flex justify-content-between inputs-holder">
                  <div class="col-md-12 my-col">
                    <b-form-select v-model="selectedPayment" :options="payment" class="form-input"></b-form-select>
                  </div>
                </div>
                <ul id="payment">
                  <li v-for="item in payment" :key="item.text"
                      class="d-flex justify-content-between payment-item align-items-center">
            <span>
              {{ item.text }}
            </span>
                    <button class="sub-btn" type="button">
                      Выбрать
                    </button>
                  </li>
                </ul>
              </div>


            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1 mb-2" role="tab">
            <b-button block v-b-toggle.accordion-6 variant="info">Выберите удобные дату и время </b-button>
          </b-card-header>
          <b-collapse id="accordion-6" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="section">
                <div class="col-md-12">
                  <div class="calendar">
                    <div class="calendar-header">
                      {{ months[month] }}
                    </div>
                    <ul class="d-flex justify-content-between calendar-body">
                      <li v-for="day in days" v-bind:class="{ 'active-day': visitDay.id === day.id }" @click="chooseDay(day)">
                <span>
                    {{ day.day }}
                </span>
                        <p>
                          {{ day.weekday }}
                        </p>

                      </li>
                    </ul>
                  </div>
                  <ul class="d-flex justify-content-between time-list">
                    <li v-for="time in getTimeList" v-bind:class="{ 'active-day': visitTime.id === time.id }"
                        @click="chooseTime(time)">
                      {{ time.time }}

                    </li>
                  </ul>
                </div>
              </div>

            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1 mb-2" role="tab">
            <b-button block v-b-toggle.accordion-6 variant="info">Комментарий к заказу </b-button>
          </b-card-header>
          <b-collapse id="accordion-6" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>

              <div class="section">
                <b-form-textarea
                  id="textarea-no-resize"
                  placeholder="Напишите коментарий лаборатории..."
                  rows="8"
                  no-resize
                  v-model="form.text"
                ></b-form-textarea>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>


      </div>
      <button class="sub-btn" type="submit">
       Потвердить
      </button>
    </form>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import {mapActions, mapGetters,} from 'vuex'

export default {
  data() {
    return {
      name: '',
      value: '',
      formatted: '',
      selectedSex: '',
      selectedPayment: '',
      passportNumber: '',
      selectedPassportMode: '',
      selected: '',
      address: '',
      snils: '',
      phone: '',
      country: [
        {value: 'ru', text: 'Россия'},
        {value: 'ru', text: 'Россия'},
        {value: 'ru', text: 'Россия'},
        {value: 'ru', text: 'Россия'},
      ],
      payment: [
        {value: 'card', text: 'Картой медработнику после оказания услуг'},
        {value: 'online', text: 'Онлайн банковской картой'},
      ],
      form: {
        email: '',
        name: '',
        surname: '',
        phone: '',


      },

      /* DaysOfWeek: [
         'Пн',
         'Вт',
         'Ср',
         'Чт',
         'Пт',
         'Сб',
         'Вс'
       ],

       date: new Date(),*/
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      date: new Date(),
      month: '',
      days: [
        {id: 1, day: 18, weekday: 'Чт'},
        {id: 2, day: 19, weekday: 'Пт'},
        {id: 3, day: 20, weekday: 'Сб'},
        {id: 4, day: 21, weekday: 'Вс'},
        {id: 5, day: 22, weekday: 'Пн'},
        {id: 6, day: 23, weekday: 'Вт'},
        {id: 7, day: 23, weekday: 'Ср'},
      ],
      dateIsCheck: false,
      visitDay: '',
      visitTime: '',

    }
  },
  validations: {
    name: {
      required
    },
  },

  name: 'IndexPage',
  computed: {
    ...mapGetters('example', ['getTimeList'])
  },
  methods: {
    ...mapActions('example',['getTime']),
    chooseDay(item) {
      this.visitDay = item
    },

    chooseTime(item) {
      this.visitTime = item
    },

    onAccept() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log(this.form)
        alert(this.form)
      }

    },

    onContext(ctx) {
      this.formatted = ctx.selectedFormatted
      this.selected = ctx.selectedYMD
    },

  },
 async mounted() {
    this.month = this.date.getMonth()
    await this.getTime()
  }
}
</script>
<style>
.accordion {
  display: none;
}
h1 {
  font-weight: 500;
  font-size: 44px;
  line-height: 56px;
}

.header {
  margin-bottom: 84px;
}

.header img {
  top: 0;
  left: -42px;
}

.form_title {
  font-weight: 500;
  font-size: 32px;
  margin-bottom: 40px;
}

.section {
  margin-bottom: 64px;
}

.card {
  border: none;
}

.card-header {
  background-color: white;
  border: none;
  padding: 0;
  margin-bottom: 47px;
}

.nav-pills .nav-link {
  padding: 7px 16px;
  background: #FFFFFF;
  border: 1px solid #ECEEF8;
  border-radius: 4px;
  font-size: 15px;
  color: black;
  margin-right: 24px;
}

.card-header-pills {
  margin-left: 0px;
}

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  background: #6D97FF;
  border-radius: 4px;
  color: #FFFFFF;
}

.card-body {
  padding: 0;
}

.my-col {
  padding-left: 0px;
}

.form-input {
  padding: 18px 16px;
  border: 1px solid #E0E3F4;
  border-radius: 8px;
  height: 56px;
  font-size: 15px;
}

.input-group > .input-group-append > .btn-group > .btn, .input-group > .input-group-prepend:not(:first-child) > .btn-group > .btn, .input-group > .input-group-prepend:first-child > .btn-group:not(:first-child) > .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
  background-color: white;
  border-color: #E0E3F4;
  color: #8790AE;
}

.inputs-holder {
  margin-bottom: 24px;
}

.check-box-holder {
  border-top: solid #E0E3F4 1px;
  border-bottom: solid #E0E3F4 1px;
  padding-bottom: 24px;
  padding-top: 24px;
  margin-top: 40px;
}

.desc {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1A2A45;
  margin-bottom: 24px;
  display: block;
}

.placeholder-custom {
  font-size: 12px;
  line-height: 16px;
  color: #8790AE;
  top: 8px;
  left: 16px;
  padding-bottom: 8px;
}

.code-input {
  border: 1px solid #E0E3F4;
  border-radius: 8px 0px 0px 8px;
  padding-bottom: 12px;
  padding-top: 24px;
  padding-left: 16px;
  font-size: 15px;
  line-height: 20px;
  color: #1A2A45;
  height: 56px;
}

.number-input {
  border: 1px solid #E0E3F4;
  border-radius: 0px 8px 8px 0px;
  padding-bottom: 12px;
  padding-top: 24px;
  padding-left: 16px;
  font-size: 15px;
  line-height: 20px;
  color: #1A2A45;
  height: 56px;
}

.email-input {
  border: 1px solid #E0E3F4;
  border-radius: 8px;
  padding-bottom: 12px;
  padding-top: 24px;
  padding-left: 16px;
  font-size: 15px;
  line-height: 20px;
  color: #1A2A45;
  height: 56px;
}

.radio-btn-active {
  border: 1px solid #6D97FF;
  border-radius: 6px;
  background-color: #F7F9FE;
  padding: 18px 16px;
}
.invalid {
  color: red
}
.radio-btn {
  border: 1px solid grey;
  border-radius: 6px;
  padding: 18px 16px;
}

.payment {
  background: #FFFFFF;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 24px;
}

#payment li:last-child {
  border-bottom: none;
}

#payment li {
  list-style-type: none;
  font-size: 15px;
  line-height: 22px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: solid 1px #E0E3F4;

}

#payment {
  margin-left: 0;
  padding-left: 0;
}

#payment li span {
  display: block;
}

.sub-btn {
  padding: 9px 24px;
  color: white;
  background: #FF1B7A;
  border-radius: 8px;
  border-color: #FF1B7A;
}

.calendar-header {
  margin-bottom: 56px;
  text-align: center;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
}

.calendar {
  border: 1px solid #E0E3F4;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 40px;
}

.calendar-body li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
}

.calendar-body span {
  font-size: 24px;
  line-height: 30px;
}

.calendar-body p {
  margin: 0;
  font-size: 12px;
  line-height: 20px;
  color: #1A2A45;
}

.active-day {
  cursor: pointer;
  background: #E0E3F4;
  border: 1px solid #6D97FF;
  border-radius: 16px;

}

.time-list {
  padding: 0;
}

.time-list li {
  list-style-type: none;
  padding: 16px 32px;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px
}
@media only screen and (max-width: 768px) {
 input {
   margin-bottom: 15px;
  }
  .my-col {
    padding-left: 15px;
  }
  .header {
    margin-bottom: 40px;
  }
  .check-box-holder {
    padding-left: 15px;
    padding-bottom: 15px;
  }
  .radio-btn {
    margin-bottom: 15px;
  }
  .radio-btn-active {
    margin-bottom: 15px;
  }
  .calendar-header{
    margin-bottom: 20px;
  }
  .form_title {
    margin-bottom: 20px;
    font-size: 25px;
  }
  .calendar-body {
    padding: 0px;
  }
  .calendar-body li {
    padding: 8px 6px;
  }
  select {
    margin-bottom: 15px;
  }
  .section {
    margin-bottom: 30px;
  }
  h1 {
    font-size: 35px;
    padding-left: 35px;
  }
  .header img {
    left: 0px;
  }
  .nav-pills .nav-link {
    margin-right: 4px;
  }
  .desctop {
    display: none;
  }
  .payment {
    padding: 3px;
  }
  .time-list li {
    padding: 9px 20px;
  }
  .calendar {
    padding: 15px;
  }
  .btn-info {
    background-color: #6D97FF;
  }
  .accordion {
    display: block;
  }
}
</style>
