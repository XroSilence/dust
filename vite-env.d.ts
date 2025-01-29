interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly API_URL: string;
  // Add other environment variables here if needed
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}