module.exports = {
  root: true,
  extends: ['@lchxiang/eslint-config'],
  rules: {
    'vue/v-on-event-hyphenation': [
      1,
      'always',
      {
        autofix: true
      }
    ]
  }
}
