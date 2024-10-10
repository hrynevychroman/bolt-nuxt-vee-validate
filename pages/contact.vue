<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import * as zod from 'zod'

const schema = toTypedSchema(
  zod.object({
    name: zod.string().min(2, 'Name must be at least 2 characters'),
    email: zod.string().email('Invalid email address'),
    message: zod.string().min(10, 'Message must be at least 10 characters'),
  }),
)

const { handleSubmit, resetForm, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    message: '',
  },
})

const onSubmit = handleSubmit((values) => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', values)
  alert('Message sent successfully!')

  // Clear form after submitting
  resetForm()
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">
      Contact Us
    </h2>
    <form class="space-y-4" @submit="onSubmit">
      <VeeField v-slot="{ field }" name="name">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-bind="field"
          type="text"
          class="form-input" :class="[{ '!border-red-500': errors.name }]"
        >
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </VeeField>
      <VeeField v-slot="{ field }" name="email">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-bind="field"
          type="email"
          class="form-input" :class="[{ '!border-red-500': errors.email }]"
        >
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </VeeField>
      <VeeField v-slot="{ field }" name="message">
        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          v-bind="field"
          class="form-input" :class="[{ '!border-red-500': errors.message }]"
          rows="4"
        />
        <span v-if="errors.message" class="error">{{ errors.message }}</span>
      </VeeField>
      <br>
      <button type="submit" class="btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>
