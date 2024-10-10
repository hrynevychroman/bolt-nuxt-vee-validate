<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { configure, ErrorMessage, Field, Form } from 'vee-validate'

// Tree Shaking Explained -> https://medium.com/@omkarbhavare2406/optimizing-web-performance-tree-shaking-explained-007208163c88
import { object as zObject, string as zString } from 'zod'

// VeeValidate Global configure -> https://vee-validate.logaretm.com/v4/api/configuration/
configure({
  validateOnInput: true,
})

const schema = toTypedSchema(
  zObject({
    email: zString().trim().min(1).email('Invalid email address'),
    password: zString().min(6, 'Password must be at least 6 characters'),
  }),
)

function onSubmit(values) {
  console.log(values)
  // Here you would typically send the login request to your backend
  alert('Login successful!')
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">
      Login Form
    </h2>
    <Form :validation-schema="schema" @submit="onSubmit">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <Field name="email" type="email" class="form-input" />
        <ErrorMessage name="email" class="error" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <Field name="password" type="password" class="form-input" />
        <ErrorMessage name="password" class="error" />
      </div>
      <button type="submit" class="btn">
        Login
      </button>
    </Form>
  </div>
</template>
