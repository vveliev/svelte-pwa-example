import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'SveltePWA',
  webDir: 'build', // Ensure this matches the output directory of your Svelte build
  bundledWebRuntime: false,
  android: {
    signing: {
      keystorePath: 'path/to/your/keystore.jks',
      keystorePassword: 'your-keystore-password',
      keyAlias: 'your-key-alias',
      keyPassword: 'your-key-password'
    }
  }
};

export default config;
