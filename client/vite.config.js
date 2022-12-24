import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['favicon-96x96.png', 'android-icon-192x192.png'],
            manifest: {
                name: 'Chat GPT',
                short_name: 'cgpt',
                description: 'mobile chat gpt app',
                theme_color: '#ffffff',
                icons: [{
                        src: 'android-icon-192x192',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'android-chrome-512x512',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
});