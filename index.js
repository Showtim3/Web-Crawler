const axios = require('axios');
const getUrls = require('get-urls');
const fs = require('fs');

const queue = [];
const crawler = [];

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

function extractBaseUrl(url){
    const pathArray = url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    return protocol + '//' + host;
}

async function doBfs(url){
    queue.push(url);
    const visited = {};
    while(queue.length >=1 && crawler.length < 100){ // the second condition can be changed to vary the depth of the search
        const current = queue.shift(); //Remove from the beginning / equivalent to pop_front()
        console.log(current);
        crawler.push(current);
        visited[current] = true;

            const childUrls =  await getUrlsFromWebsite(current);
            if(isIterable(childUrls)){
                for(let key of childUrls){ // Iterating the set
                    const baseUrl = extractBaseUrl(key);
                    if(!visited[baseUrl]){
                        visited[baseUrl] = true;
                        queue.push(baseUrl);
                    }
                }
            }

        }

    console.log('Done');
    saveCrawlerToFile();
}

function saveCrawlerToFile() {
    fs.writeFile('a.txt',JSON.stringify(crawler),function(err){
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

async function getUrlsFromWebsite(website){
    try {
    const res = await axios.get(website);
    return getUrls(res.data); // Return a JavaScript set
    } catch (e) {
        console.log(`Can't get ${website}`);
    }
}

async function crawlWebPage(str) {
    // queue.push(str);
    doBfs(str);
    // await getUrlsFromWebsite(str);
}

let http = 'https://www.npmjs.com/package/cheerio';
// let http = 'http://www.bbc.com';
crawlWebPage(http);

