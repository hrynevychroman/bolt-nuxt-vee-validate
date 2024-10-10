<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Registration Form</h2>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" :validateOnMount="true">
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
      <button type="submit" class="btn">Register</button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const schema = toTypedSchema(zod.object({
  username: zod.string().min(3, 'Username must be at least 3 characters'),
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: zod.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}));

const onSubmit = (values) => {
  console.log(values);
  // Here you would typically send the registration request to your backend
  alert('Registration successful!');
};
</script>