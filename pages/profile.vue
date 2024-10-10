<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { z } from 'zod'

const schema = toTypedSchema(z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  age: z.number().min(18, 'You must be at least 18 years old').max(120, 'Invalid age'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
}))

// Initial Values docs -> https://vee-validate.logaretm.com/v4/guide/components/handling-forms#initial-values
const initialValues = {
  fullName: 'John Doe',
  age: 30,
  website: 'https://example.com',
  bio: 'I am a software developer.',
}

function onSubmit(values) {
  console.log(values)
  // Here you would typically send the profile update request to your backend
  alert('Profile updated successfully!')
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">
      Profile Update Form
    </h2>
    <Form :validation-schema="schema" :initial-values="initialValues" :validate-on-mount="true" @submit="onSubmit">
      <div class="mb-4">
        <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
        <Field name="fullName" type="text" class="form-input" />
        <ErrorMessage name="fullName" class="error" />
      </div>
      <div class="mb-4">
        <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
        <Field name="age" type="number" class="form-input" />
        <ErrorMessage name="age" class="error" />
      </div>
      <div class="mb-4">
        <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
        <Field name="website" type="url" class="form-input" />
        <ErrorMessage name="website" class="error" />
      </div>
      <div class="mb-4">
        <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
        <Field name="bio" as="textarea" class="form-input" />
        <ErrorMessage name="bio" class="error" />
      </div>
      <button type="submit" class="btn">
        Update Profile
      </button>
    </Form>
  </div>
</template>
