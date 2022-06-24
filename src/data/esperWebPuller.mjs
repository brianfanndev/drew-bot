import axios from 'axios';
import { JSDOM } from 'jsdom';
import {
    playDislyteSelectors as selectors,
    playDislyteConstants as constants,
} from './playDislyteConstants';

export const getEsperUrlList = async () => {
    const response = await axios.get(constants.esperListUrl);
    const doc = new JSDOM(response.data).window.document;
    const nodeArr = Array.from(doc.querySelectorAll(selectors.esperListNode));

    return nodeArr.map((x) => x.getAttribute('href'));
};

export const getEsperDataFromUrl = async (url) => {
    const response = await axios.get(url);
    const site = new JSDOM(response.data);

    const $ = (query) => site.window.document.querySelector(query)?.textContent;

    const $$ = (query) => {
        const nodes = site.window.document.querySelectorAll(query);
        const arr = Array.from(nodes);

        return arr.map((x) => x.textContent);
    };

    const parseSkillups = (skillups) =>
        skillups
            .split(constants.skillupDelimiter)
            .map((x) => x.slice(2))
            .slice(1);

    const getSkill = (level) => {
        const skillSelectors = selectors.skill(level);

        return {
            name: $(skillSelectors.name),
            desc: $(skillSelectors.desc),
            levels: parseSkillups($(skillSelectors.levels)),
        };
    };

    return {
        name: $(selectors.name),
        deity: $(selectors.deity),
        role: $(selectors.role),
        summary: $(selectors.summary),
        una: $$(selectors.una),
        mui: $$(selectors.mui),
        mainStats: $$(selectors.mainStats),
        resonance: $(selectors.resonance),
        skills: JSON.stringify([getSkill(1), getSkill(2), getSkill(3)]),
        captain: $(selectors.captainAbility),
    };
};
