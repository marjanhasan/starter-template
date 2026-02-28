/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Add any other VITE_ variables you use (optional but recommended for IntelliSense)
  // readonly VITE_SOME_OTHER_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
