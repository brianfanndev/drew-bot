import 'dotenv/config';
import { startBot } from './bot';
import { getEsperUrlList, getEsperDataFromUrl } from './data/esperWebPuller';
import { getEsper, setEsper } from './data/esperDB';

//startBot();

const testSetEsperData = async () => {
    const urlList = await getEsperUrlList();
    const esperData = await getEsperDataFromUrl(urlList[2]);

    setEsper(esperData);
};

testSetEsperData();
