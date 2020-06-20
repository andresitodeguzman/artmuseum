import { router } from '../../hemlo/hemlo-utils.js';

export const view = "views/home/home.view.html";
export const controller = {
    onInit() {
    },
    
    onCreate() {
    },

    startTour() {
        router.navigate('tour');
    },

    shareApp() {
        // Place Web Share API
        if('share' in navigator) {
            const shareData = {
                title: 'National Art Gallery Virtual Tour',
                text: 'Join me as I explore the National Art Gallery.',
                url: 'https://github.com/pwa-pilipinas/codelabs-teachablemachine',
            };
            navigator.share(shareData);
        } else {
        alert('Share is not yet available in your device.');
        }
    }
};
