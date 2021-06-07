declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_SECRET_KEY: string
      NODE_ENV: 'development' | 'production'
      STATIC_DIR: string
      STRIPE_PUBLISHABLE_KEY: string
      STRIPE_WEBHOOK_SECRET: string
      EASY_POST_API_KEY: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
