/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GOATCOUNTER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
