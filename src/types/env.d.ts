declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      TARGET_SITE: string
      WAQI_TOKEN: string
    }
  }
}

export { }
