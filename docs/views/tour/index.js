import { effects } from '../../hemlo/hemlo-utils.js';
export const view = "views/tour/tour.view.html";
export const controller = {
    closest: { className: null, probability: null },

    currentData: null,

    data: [
        {
            name: 'Spoliarium',
            description: 'The Spoliarium (often misspelled Spolarium) is a painting by Filipino painter Juan Luna. The painting was submitted by Luna to the Exposición Nacional de Bellas Artes in 1884 in Madrid, where it garnered the first gold medal (out of three).',
            url: 'https://www.nationalmuseum.gov.ph/nationalmuseumbeta/Collections/Spoliarium.html'
        },
        {
            name: 'Retablo',
            description: 'It is an upright panel, intricately carved and highly decorated. Its wooden frame contains ledges and panels behind and above the altar. The main feature of old Roman Catholic churches in the country is the retablo, the altarpiece.',
            url: 'https://www.nationalmuseum.gov.ph/nationalmuseumbeta/Collections/Retablo.html'
        },
        {
            name: 'Bust of Ricardo Carnicero',
            description: 'Captain Ricardo Carnicero is the Spanish commandant of Dapitan when Rizal was banished in the city. The sculpture is made out of clay.',
            url: 'https://rizal.raphaelmarco.com/works/view/bust-of-dr-ricardo-carnicero'
        }
    ],

    onInit() {
        init();
    },
    
    onCreate() {
    },

    async close() {
        await webcam.stop();
        window.location.replace('#!/');
    },

    serviceStarted() {
        effects.fadeOut(document.querySelector('.webcam-loading'));
        effects.fadeIn(document.querySelector('.info-container'));

    },

    predictionHandler(closest) {
        if(closest !== undefined) {
            if(closest.className !== this.closest.className) {
                this.closest = closest;
                // console.log(`new match: ${closest.className} ${closest.probability}`);
                const entry = this.data.find(e => {
                    if(e.name == closest.className) return e;
                });
                if(entry) {
                    this.currentData = entry;
                    document.querySelector('#result_name').innerText = entry.name;
                    document.querySelector('#result_description').innerText = entry.description;
                    effects.fadeOut(document.querySelector('.empty-result'));
                    effects.fadeIn(document.querySelector('.result'));
                }
            }
        }
    },

    shareResult() {
        // Add Web Share API here
        if (this.currentData) {
            if('share' in navigator) {
                const shareData = {
                    title: `I've seen ${this.currentData.name || 'a work of art'} at the National Art Gallery!`,
                    text: `${this.currentData.name} is such a wonderful piece of art. Hope you can take a look at it in personal as well!`,
                    url: 'https://github.com/pwa-pilipinas/codelabs-teachablemachine',
                };
                navigator.share(shareData);
            } else {
                alert('Share is not yet available in your device.');
            }
        }
    },

    moreInfo() {
        if (this.currentData.url) {
            window.location.replace(this.currentData.url);
        } else {
            alert('No additional information available');
        }
    },

    hideResult() {
        effects.fadeOut(document.querySelector('.result'));
        effects.fadeIn(document.querySelector('.empty-result'));
    }
};