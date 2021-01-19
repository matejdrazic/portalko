// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// Pristup bazi pomoću varijable admin.
const admin = require('firebase-admin');
admin.initializeApp();

// OVA FUNKCIJA JE VEĆ DEPLOY-ANA I IZVODI SE SVAKO PO URE
// ZASAD PARSIRA SAMO 4 PORTALA AL CILJ JE DA POSLI PARSIRA SVE MOGUĆE PORTALE
// ZAKOMENTIRANA JE DA JE NEBI OPET DEPLOY-A
exports.parseAndSave = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
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
        Slobodna: ['https://slobodnadalmacija.hr/feed/category/119', 'https://slobodnadalmacija.hr/feed/category/244'],
        bug: 'https://www.bug.hr/rss',
        Dnevno: 'https://www.dnevno.hr/feed/',
    }

    let counter = 0;

    async function check() {
        let feed = await parser.parseURL(portali.Index);
        let feed2 = await parser.parseURL(portali.Dnevno);
        let feed3 = await parser.parseURL(portali.Telegram[0]);
        let feed4 = await parser.parseURL(portali.Telegram[1]);
        let feed5 = await parser.parseURL(portali.sata24[2]);
        let feed6 = await parser.parseURL(portali.sata24[4]);
        let feed7 = await parser.parseURL(portali.sata24[6]);
        let feed8 = await parser.parseURL(portali.sata24[3]); //show
        let feed9 = await parser.parseURL(portali.sata24[5]); //lifestyle
        let feed10 = await parser.parseURL(portali.DnevnikHr);
        let feed11 = await parser.parseURL(portali.bug);
        let feed12 = await parser.parseURL(portali.Slobodna[0]);
        let feed13 = await parser.parseURL(portali.Slobodna[1]);


        feed.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: item.categories,
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: 'Index'
            });
            counter++;
        });

        feed2.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: item.categories,
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: 'Dnevno'
            });
            counter++;
        });

        feed3.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: item.categories,
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: 'Telegram'
            });
            counter++;
        });

        feed4.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: "Sport",
                content: item.enclosure,
                pubdate: new Date(item.pubDate).getTime(),
                portal: 'Telegram'
            });
            counter++;
        });

        feed5.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: "Vijesti",
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: '24sata'
            });
            counter++;
        });

        feed6.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: "Sport",
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: '24sata'
            });
            counter++;
        });

        feed7.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: "Tech",
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: '24sata'
            });
            counter++;
        });

        feed8.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: "Show",
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: '24sata'
            });
            counter++;
        });

        feed9.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: "Lifestyle",
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: '24sata'
            });
            counter++;
        });

        feed10.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: item.categories,
                content: item.content,
                pubdate: new Date(item.pubDate).getTime(),
                portal: 'Dnevnik'
            });
            counter++;
        });

        feed11.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: item.categories,
                content: item.enclosure,
                pubdate: new Date(item.pubDate).getTime(),
                portal: 'Bug'
            });
            counter++;
        });

        feed12.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: "Vijesti",
                content: item.enclosure,
                pubdate: new Date(item.pubDate).getTime(),
                portal: 'Slobodna'
            });
            counter++;
        });

        feed13.items.forEach(item => {
            admin.database().ref('vijesti/').push({
                naslov: item.title,
                link: item.link,
                kategorija: "Biznis",
                content: item.enclosure,
                pubdate: new Date(item.pubDate).getTime(),
                portal: 'Slobodna'
            });
            counter++;
        });

    }
    check();
});