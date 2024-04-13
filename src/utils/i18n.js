// src/i18n.js
import { createI18n } from 'vue-i18n'

// 定义你的消息
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  cn: {
    message: {
      hello: '你好，世界'
    }
  }
}

// 创建i18n实例并导出
const i18n = createI18n({
  locale: 'en', // 设置默认语言
  fallbackLocale: 'en', // 设置备用语言
  messages, // 设置语言环境的信息
})

export default i18n;
