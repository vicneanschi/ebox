let request = require('request');
const cheerio = require('cheerio');

request = request.defaults({ jar: true, followRedirect: true, followAllRedirects: true });

const getUsage = (username, password) => {
    return new Promise((resolve, reject) => {
        request.get('https://client.ebox.ca/', (err, httpResponse, body) => {
            if (err) { return reject(err); }
            if (!httpResponse || httpResponse.statusCode !== 200) { return reject('Error requesting home page'); };

            var form = {
                usrname: username,
                pwd: password,
                _csrf_security_token: parseCsrf(body)
            };

            request.post('https://client.ebox.ca/login', { form: form }, (err, httpResponse, body) => {
                if (err) { return reject(err); }
                if (!httpResponse || httpResponse.statusCode !== 200) { return reject('Error requesting login page'); };

                var usage = parseUsage(body);
                return resolve(usage);
            });
        });
    });
}

function parseCsrf(body) {
    const $ = cheerio.load(body);
    const csrf = $('input[name="_csrf_security_token"]').val();
    return csrf;
}

function parseUsage(body) {
    const $ = cheerio.load(body);
    let usageArr = $('.usage_summary .text_summary3').text().trim().split('/');
    let daysLeft = $('.usage_summary .text_summary2').text().trim().replace(/\s+/g, ' ');
    return {
        used: usageArr[0].trim(),
        limit: usageArr[1].trim(),
        daysLeft
    }
}

module.exports = {
    getUsage
}