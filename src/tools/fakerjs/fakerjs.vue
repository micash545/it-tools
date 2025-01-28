<script setup lang="ts">
import { faker } from '@faker-js/faker';
import { ref, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const dataTypes = {
  Airline: {
    AircraftType: 'faker.airline.aircraftType',
    Airline: 'faker.airline.airline',
    Airplane: 'faker.airline.airplane',
  },
  Phone: {
    IMEI: 'faker.phone.imei',
    Number: 'faker.phone.number',
  },
  Internet: {
    Email: 'faker.internet.email',
    UserName: 'faker.internet.userName',
  },
  Address: {
    StreetAddress: 'faker.address.streetAddress',
    City: 'faker.address.city',
    Country: 'faker.address.country',
  },
  // Add more modules and methods as needed
};

const selectedType = useStorage('fake-info-generator:selectedType', 'Phone');
const selectedSubtype = useStorage('fake-info-generator:selectedSubtype', '');
const recordCount = useStorage('fake-info-generator:recordCount', 1);

const output = ref<string[]>([]);
const errored = ref(false);
const processing = ref(false);

const generateFakeData = async () => {
  try {
    processing.value = true;
    output.value = [];
    const methodPath = dataTypes[selectedType.value]?.[selectedSubtype.value];

    if (!methodPath) throw new Error('Invalid data type or subtype selected');

    const fakerMethod = methodPath.split('.').reduce((obj, key) => obj?.[key], faker);
    if (typeof fakerMethod !== 'function') throw new Error('Faker method not found');

    for (let i = 0; i < recordCount.value; i++) {
      output.value.push(fakerMethod());
    }

    errored.value = false;
  } catch (error) {
    errored.value = true;
    console.error(error);
  } finally {
    processing.value = false;
  }
};

watchEffect(generateFakeData);
</script>

<template>
  <c-card style="max-width: 600px;">
    <c-select 
      v-model:value="selectedType" 
      label-position="top" 
      label="Data Type:" 
      :options="Object.keys(dataTypes)" 
      searchable="true" 
      placeholder="Select data type" 
    />
    <div v-if="selectedType">
      <c-select 
        v-model:value="selectedSubtype" 
        label-position="top" 
        label="Subtype:" 
        :options="Object.keys(dataTypes[selectedType])" 
        placeholder="Select subtype" 
      />
    </div>
    <n-divider />
    <div mb-2 flex items-center>
      <span w-100px>Quantity</span>
      <n-input-number 
        v-model:value="recordCount" 
        flex-1 
        :min="1" 
        :max="16384" 
        placeholder="Record count" 
      />
    </div>
    <div v-if="processing" flex items-center justify-center>
      <n-spin size="medium" />
      <span class="ml-2">Generating data...</span>
    </div>
    <c-alert v-if="errored" mt-1 text-center type="error">
      An error occurred while generating data.
    </c-alert>
    <n-form-item v-if="!processing && !errored" label="Generated Data:">
      <TextareaCopyable :value="output.join('\n')" mb-1 mt-1 copy-placement="outside" />
    </n-form-item>
  </c-card>
</template>
