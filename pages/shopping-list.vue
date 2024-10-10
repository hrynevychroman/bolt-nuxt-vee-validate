<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Shopping List</h2>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <FieldArray v-slot="{ fields, push, remove }" name="items">
        <div v-for="(field, index) in fields" :key="field.key" class="mb-4">
          <div class="flex items-center space-x-2">
            <Field :name="`items[${index}].name`" v-slot="{ field, errorMessage }">
              <input
                v-bind="field"
                type="text"
                :placeholder="`Item ${index + 1}`"
                class="form-input flex-grow"
                :class="{ 'border-red-500': errorMessage }"
              />
            </Field>
            <Field :name="`items[${index}].quantity`" v-slot="{ field, errorMessage }">
              <input
                v-bind="field"
                type="number"
                placeholder="Qty"
                class="form-input w-20"
                :class="{ 'border-red-500': errorMessage }"
              />
            </Field>
            <button type="button" @click="remove(index)" class="btn bg-red-500 hover:bg-red-600">
              Remove
            </button>
          </div>
          <ErrorMessage :name="`items[${index}].name`" class="error" />
          <ErrorMessage :name="`items[${index}].quantity`" class="error" />
        </div>
        <button type="button" @click="push({ name: '', quantity: 1 })" class="btn mt-2">
          Add Item
        </button>
      </FieldArray>
      <br />
      <div v-if="errors.items" class="error mt-2">{{ errors.items }}</div>
      <button type="submit" class="btn mt-4">Save Shopping List</button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const schema = toTypedSchema(zod.object({
  items: zod.array(zod.object({
    name: zod.string().min(1, 'Item name is required'),
    quantity: zod.number().min(1, 'Quantity must be at least 1'),
  })).min(1, 'Add at least one item to the shopping list'),
}));

const onSubmit = (values) => {
  console.log('Shopping list:', values);
  alert('Shopping list saved successfully!');
};
</script>