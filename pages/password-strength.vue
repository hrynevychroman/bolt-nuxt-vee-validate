<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed } from 'vue'
import * as zod from 'zod'

const schema = toTypedSchema(zod.object({
  password: zod.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[^A-Z0-9]/i, 'Password must contain at least one special character'),
}))

const strengthPercentage = computed(() => {
  const password = schema._def.shape().password._def.innerType._def.innerType
  const checks = password._def.checks
  const passedChecks = checks.filter(check => check.check(password)).length
  return (passedChecks / checks.length) * 100
})

const strengthClass = computed(() => {
  if (strengthPercentage.value < 25)
    return 'bg-red-500'
  if (strengthPercentage.value < 50)
    return 'bg-orange-500'
  if (strengthPercentage.value < 75)
    return 'bg-yellow-500'
  return 'bg-green-500'
})

const strengthText = computed(() => {
  if (strengthPercentage.value < 25)
    return 'Weak'
  if (strengthPercentage.value < 50)
    return 'Fair'
  if (strengthPercentage.value < 75)
    return 'Good'
  return 'Strong'
})

const strengthTextClass = computed(() => {
  if (strengthPercentage.value < 25)
    return 'text-red-500'
  if (strengthPercentage.value < 50)
    return 'text-orange-500'
  if (strengthPercentage.value < 75)
    return 'text-yellow-500'
  return 'text-green-500'
})

function onSubmit(values) {
  console.log('Form submitted:', values)
  alert('Password submitted successfully!')
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">
      Password Strength Meter
    </h2>
    <Form v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit">
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <Field v-slot="{ field, meta }" name="password">
          <input
            v-bind="field"
            type="password"
            class="form-input w-full"
            :class="{ 'border-red-500': errors.password }"
          >
          <div class="mt-2">
            <div class="h-2 w-full bg-gray-200 rounded-full">
              <div
                class="h-full rounded-full transition-all duration-300"
                :class="strengthClass"
                :style="{ width: `${strengthPercentage}%` }"
              />
            </div>
            <p class="text-sm mt-1" :class="strengthTextClass">
              {{ strengthText }}
            </p>
          </div>
        </Field>
        <ErrorMessage name="password" class="error" />
      </div>
      <button type="submit" class="btn">
        Submit
      </button>
    </Form>
  </div>
</template>
