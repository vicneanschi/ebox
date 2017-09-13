# ebox

EBOX is a Canadian Internet Services Provider available in Quebec and Ontario.

This module allows to programmatically request usage stats from their customer zone https://client.ebox.ca/.

It sends the login request to https://client.ebox.ca/ and parses the response.

Module exposes an object with `getUsage` function that accepts 2 parameters and returns a promise with the usage object.

This is how the result looks like:
```
{ 
    used: '75.76 GB', 
    limit: '200 GB', 
    daysLeft: '17 days left' 
}
```

# Example

This example is using environment variables for username and password:

```
// Don't forget to set environment variables before running this script

const ebox = require('ebox');

let usage = ebox.getUsage(process.env.USERNAME, process.env.PASSWORD)
    .then(console.log)
    .catch(console.error);

// Ouput: { used: '75.76 GB', limit: '200 GB', daysLeft: '17 days left' }

```

# Dependencies

* request - HTML fetching
* cheerio - HTML parsing