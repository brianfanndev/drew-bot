import axios from 'axios';
import { JSDOM } from 'jsdom';

/*const url = 'https://playdislyte.com/alexa/';
const response = await axios.get(url);
const site = new JSDOM(response.data);

console.log(site.window.document.querySelector(".gb-headline-75651ca0").textContent);
console.log(site.window.document.querySelector(".gb-headline-4176eb89").textContent);
console.log(site.window.document.querySelector(".gb-headline-4f597c05").textContent);
*/

const url = 'https://playdislyte.com/espers/';
const response = await axios.get(url);
const site = new JSDOM(response.data);
const doc = site.window.document;

const esperNodes = Array.from(doc.querySelectorAll('.pt-cv-content-item > div > a'));
const esperUrls = esperNodes.map(x =>  x.getAttribute('href'));

const getEsperDataFromUrl = async(url) => {
    const response = await axios.get(url);
    const site = new JSDOM(response.data);

    const getTextFromQuery = function(query) {
        return site.window.document.querySelector(query)?.textContent;
    }

    const getTextFromQueryAll = function(query) {
        const nodes = site.window.document.querySelectorAll(query);
        const arr = Array.from(nodes);

        return arr.map(x => x.textContent);
    }

    const parseSkillups = function(skillups) {
        return skillups.split('Lvl ').map(x => x.slice(2)).slice(1);
    }
    
    return {
        name: getTextFromQuery('.gb-headline-75651ca0'),
        deity: getTextFromQuery('.gb-headline-4176eb89'),
        role: getTextFromQuery('.gb-headline-4f597c05'),
        summary: getTextFromQuery('.gb-headline-7fa96e05 + p'),
        una: getTextFromQueryAll('.gb-container-e3998a1e > div > p > span > strong'),
        mui: getTextFromQueryAll('.gb-container-9148d9d3 > div > p > span > strong'),
        mainStats: getTextFromQueryAll('.gb-grid-wrapper-8b0e8aad > div > div > div > p + p'),
        resonance: getTextFromQuery('.gb-headline-96128286 + p > .gb-headline-text'),
        skills: [
            {
                name: getTextFromQuery('.wp-container-1 > p > strong'),
                desc: getTextFromQuery('.wp-container-1 > p + p'),
                skillups: parseSkillups(getTextFromQuery('.wp-container-1 > p + p + p'))
            },
            {
                name: getTextFromQuery('.wp-container-2 > p > strong'),
                desc: getTextFromQuery('.wp-container-2 > p + p'),
                skillups: parseSkillups(getTextFromQuery('.wp-container-2 > p + p + p'))
            },
            {
                name: getTextFromQuery('.wp-container-3 > p > strong'),
                desc: getTextFromQuery('.wp-container-3 > p + p'),
                skillups: parseSkillups(getTextFromQuery('.wp-container-3 > p + p + p'))
            }
        ],
        captain: getTextFromQuery('.wp-container-4 + p + p')
    }
}

//const esperData = await Promise.all(esperUrls.map(x => getEsperDataFromUrl(x)));

const esperData = await getEsperDataFromUrl(esperUrls[6]);

console.log(esperData);