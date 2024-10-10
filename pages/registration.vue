<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as zod from 'zod'

const schema = toTypedSchema(zod.object({
  username: zod.string().min(3, 'Username must be at least 3 characters'),
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: zod.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
}))

function onSubmit(values) {
  console.log(values)
  // Here you would typically send the registration request to your backend
  alert('Registration successful!')
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">
      Registration Form
    </h2>
    <Form v-slot="{ errors }" :validation-schema="schema" :validate-on-mount="true" @submit="onSubmit">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <Field name="username" type="text" class="form-input" />
        <ErrorMessage name="username" class="error" />
      </div>
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
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <Field name="confirmPassword" type="password" class="form-input" />
        <ErrorMessage name="confirmPassword" class="error" />
      </div>
      <button type="submit" class="btn">
        Register
      </button>
    </Form>
  </div>
</template>
