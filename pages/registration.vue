<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { z } from 'zod'

// Form docs -> https://vee-validate.logaretm.com/v4/api/form/
const formRef = ref()

const schema = toTypedSchema(z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
}))

async function onSubmit(values) {
  try {
    // Check if email is already in use
    await new Promise(resolve => setTimeout(resolve, 1000))
    const isEmailInUse = true
    if (isEmailInUse) {
      throw new Error('Email is already in use')
    }

    console.log(values)

    // Here you would typically send the registration request to your backend
    alert('Registration successful!')
  }
  catch (error) {
    console.error(error)
    formRef.value.setFieldError('email', error.message)
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">
      Registration Form
    </h2>
    <Form ref="formRef" v-slot="{ isSubmitting }" :validation-schema="schema" :validate-on-mount="true" @submit="onSubmit">
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
      <button type="submit" class="btn" :disabled="isSubmitting">
        Register
      </button>
    </Form>
  </div>
</template>
