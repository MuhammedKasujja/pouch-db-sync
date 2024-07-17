<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import composable from './composable';
import { DeleteRequest, Patient } from "./types";
import { useFetch } from "./api/useFetch"

// const { db } = composable();
const records = ref<Patient[]>()

const displayRecords = async () => {
  const response = await useFetch<Patient[]>({ url: 'patients/store', method: 'get' })
  if (response.success) {
    records.value = response.payload
    console.table(response.payload)
  }
}

// db.changes({ live: true, since: 'now', include_docs: true }).on('change', function (change) {
//   console.log('Change: ', change);
//   displayRecords();
// })

async function addPatient() {
  const patient: Patient = {
    firstName: generateRandomString(4),
    lastName: generateRandomString(7),
    age: Math.floor(Math.random() * 100),
    gender: Math.random() < 0.5 ? 'male' : 'female',
    address: generateRandomString(10),
    city: generateRandomString(10),
    state: generateRandomString(2),
    country: 'Netherlands',
    postalCode: generateRandomString(5),
    phone: generateRandomString(10),
    email: generateRandomString(10) + '@example.com',
    ssn: generateRandomString(9),
    dob: generateRandomDate(),
    race: generateRandomString(6),
    language: 'dutch',
    active: Math.random() < 0.5,
    completed: false
  };

  const { message } = await useFetch({ url: 'patients/data', method: "post", data: patient })
  console.log('Add Patients', { message })

  // db.post(patient, _, function callback(err, result) {
  //   if (!err) {
  //     console.log('Successfully posted a patient!');
  //   } else {
  //     console.error('Error posting patient:', err);
  //   }
  // });
}

// Helper functions
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${month}/${day}/${year}`;
}

async function deletePatient({ docId, revId }: DeleteRequest) {
  const { message } = await useFetch({ url: 'patients/data', method: "delete", data: { docId, revId } })
  alert(message)
  records.value = records.value?.filter((p) => p.id != docId)
}

onMounted(() => {
  displayRecords();
});
</script>

<template>
  <div>
    <button @click="addPatient">Add</button>

    <table>
      <tr>
        <th>Patient ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Action</th>
      </tr>
      <tr v-for="patient, index in records">
        <td>{{ index + 1 }}</td>
        <td>{{ patient.firstName }}</td>
        <td>{{ patient.lastName }}</td>
        <td>{{ patient.age }}</td>
        <td>{{ patient.gender }}</td>
        <td><button type="button"
            @click="() => deletePatient({ docId: patient.id, revId: patient.revId })">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>