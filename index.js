const cheerio = require('cheerio');
const axios = require('axios');
const getUrls = require('get-urls');
const fs = require('fs');

function crawlWebPage(str) {
axios.get('https://www.npmjs.com/package/cheerio').then((res) => {
    // console.log(res);
    let urls = getUrls(res.data);
    // fs.writeFile('a.txt',JSON.stringify(res.data),function(err){
    //     if(err) {
    //         return console.log(err);
    //     }
    //
    //     console.log("The file was saved!");
    // });

    console.log('Response');
    // console.log(urls);
    for(let url of urls){
        console.log(url)
    }
}).catch((e) => {
    console.log('Error');
    console.log(e);
});
}


crawlWebPage();
