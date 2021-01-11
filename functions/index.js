// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// Pristup bazi pomoću varijable admin.
const admin = require('firebase-admin');
admin.initializeApp();


exports





// OVA FUNKCIJA JE VEĆ DEPLOY-ANA I IZVODI SE SVAKO PO URE
// ZASAD PARSIRA SAMO 4 PORTALA AL CILJ JE DA POSLI PARSIRA SVE MOGUĆE PORTALE
// ZAKOMENTIRANA JE DA JE NEBI OPET DEPLOY-A
/* exports.parseAndSave = functions.pubsub.schedule('every 30 minutes').onRun((context) => {
    let Parser = require('rss-parser');
    let parser = new Parser({
        customFields: {
            item: ['content']
        }
    });

    let portali = {
        Index: 'https://www.index.hr/rss',
        Telegram: ['https://www.telegram.hr/feed', 'https://telesport.telegram.hr/feed/'],
        sata24: ['https://www.24sata.hr/feeds/aktualno.xml', 'https://www.24sata.hr/feeds/najnovije.xml', 'https://www.24sata.hr/feeds/news.xml', 'https://www.24sata.hr/feeds/show.xml', 'https://www.24sata.hr/feeds/sport.xml', 'https://www.24sata.hr/feeds/lifestyle.xml', 'https://www.24sata.hr/feeds/tech.xml', 'https://www.24sata.hr/feeds/fun.xml'],
        DnevnikHr: 'https://dnevnik.hr/assets/feed/articles',
        Dnevno: 'https://www.dnevno.hr/feed/',
    }

    let counter = 0;

    async function check() {
        let feed = await parser.parseURL(portali.Index);
        let feed2 = await parser.parseURL(portali.Dnevno);
        let feed3 = await parser.parseURL(portali.Telegram[0]);
        let feed4 = await parser.parseURL(portali.Telegram[1]);

        feed.items.forEach(item => {
            admin.database().ref('vijesti/' + counter).set({
                naslov: item.title,
                link: item.link,
                kategorija: item.categories,
                content: item.content,
            });
            counter++;
        });

        feed2.items.forEach(item => {
            admin.database().ref('vijesti/' + counter).set({
                naslov: item.title,
                link: item.link,
                kategorija: item.categories,
                content: item.content,
            });
            counter++;
        });

        feed3.items.forEach(item => {
            admin.database().ref('vijesti/' + counter).set({
                naslov: item.title,
                link: item.link,
                kategorija: item.categories,
                content: item.content,
            });
            counter++;
        });

        feed4.items.forEach(item => {
            admin.database().ref('vijesti/' + counter).set({
                naslov: item.title,
                link: item.link,
                kategorija: "Sport",
                content: item.enclosure,
            });
            counter++;
        });

    }
    check();
}); */