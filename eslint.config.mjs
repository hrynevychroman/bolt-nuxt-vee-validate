// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
      'vue/no-unused-vars': 'off',
      'vue/no-template-shadow': 'off',
    },
  }),
)
