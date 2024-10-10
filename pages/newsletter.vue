<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
    <form @submit="onSubmit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          :class="['form-input', { 'border-red-500': nameError }]"
        />
        <span v-if="nameError" class="error">{{ nameError }}</span>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          :class="['form-input', { 'border-red-500': emailError }]"
        />
        <span v-if="emailError" class="error">{{ emailError }}</span>
      </div>
      <div>
        <label class="flex items-center">
          <input
            v-model="agreeToTerms"
            type="checkbox"
            class="form-checkbox h-4 w-4 text-blue-600"
          />
          <span class="ml-2 text-sm text-gray-700">I agree to the terms and conditions</span>
        </label>
        <span v-if="agreeToTermsError" class="error">{{ agreeToTermsError }}</span>
      </div>
      <button type="submit" class="btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const schema = toTypedSchema(zod.object({
  name: zod.string().min(2, 'Name must be at least 2 characters'),
  email: zod.string().email('Invalid email address'),
  agreeToTerms: zod.boolean().refine((val) => val === true, 'You must agree to the terms and conditions'),
}));

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');
const { value: agreeToTerms, errorMessage: agreeToTermsError } = useField('agreeToTerms');

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values);
  alert('Successfully subscribed to the newsletter!');
  // Reset form fields
  resetForm()
});
</script>