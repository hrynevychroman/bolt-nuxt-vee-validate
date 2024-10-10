<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, FieldArray, Form } from 'vee-validate'
import { z } from 'zod'

// FieldArray docs -> https://vee-validate.logaretm.com/v4/api/field-array/
// useFieldArray docs -> https://vee-validate.logaretm.com/v4/api/use-field-array/
const schema = toTypedSchema(z.object({
  items: z.array(z.object({
    name: z.string().min(1, 'Item name is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  })).min(1, 'Add at least one item to the shopping list'),
}))

function onSubmit(values) {
  console.log('Shopping list:', values)
  alert('Shopping list saved successfully!')
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">
      Shopping List
    </h2>
    <Form v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit">
      <FieldArray v-slot="{ fields, push, remove }" name="items">
        <div v-for="(field, index) in fields" :key="field.key" class="mb-4">
          <div class="flex items-center space-x-2">
            <Field v-slot="{ field, errorMessage }" :name="`items[${index}].name`">
              <input
                v-bind="field"
                type="text"
                :placeholder="`Item ${index + 1}`"
                class="form-input flex-grow"
                :class="{ 'border-red-500': errorMessage }"
              >
            </Field>
            <Field v-slot="{ field, errorMessage }" :name="`items[${index}].quantity`">
              <input
                v-bind="field"
                type="number"
                placeholder="Qty"
                class="form-input w-20"
                :class="{ 'border-red-500': errorMessage }"
              >
            </Field>
            <button type="button" class="btn bg-red-500 hover:bg-red-600" @click="remove(index)">
              Remove
            </button>
          </div>
          <ErrorMessage :name="`items[${index}].name`" class="error" />
          <ErrorMessage :name="`items[${index}].quantity`" class="error" />
        </div>
        <button type="button" class="btn mt-2" @click="push({ name: '', quantity: 1 })">
          Add Item
        </button>
      </FieldArray>
      <br>
      <div v-if="errors.items" class="error mt-2">
        {{ errors.items }}
      </div>
      <button type="submit" class="btn mt-4">
        Save Shopping List
      </button>
    </Form>
  </div>
</template>
