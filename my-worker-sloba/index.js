// const jsc8 = require('jsc8')
// async function handleRequest() {
//   const GDN = new jsc8({
//     url: "https://gdn.paas.macrometa.io",
//     apiKey: 'slobodan.mijatovic_bluegrid.io.test.dneYHyeiRa99S4U2Q95iKeAzb5UDiYhjayKykqQn58s1ApWV7Na6UYLP3Ya01M1y4d1f2a',
//     fabricName: '_system',
//     agent: fetch,
//   })
//   try {
//     //const query = "FOR employee IN addresses RETURN employee";
//     //const queryName = "listEmployees";
//     //var nesto = await GDN.createRestql(queryName, query, {});
//     var query = await GDN.executeRestql('FirstName')
//     console.log("everything is ok");
//     return new Response(JSON.stringify(query))
//   } catch (e) { console.log(e.message) }
// }
// addEventListener("fetch", event => {
//   return event.respondWith(handleRequest())
// })

const macrometaHost = "https://api-gdn.paas.macrometa.io"
const authEndpoint = macrometaHost + "/_open/auth"
const collectionEndpoint = macrometaHost + "/_fabric/_system/_api/collection"
const type = "application/json;charset=UTF-8"
const authInfo = {
  "email": "slobodan.mijatovic@bluegrid.io",
  "password": "TwistedMetal!!1",
  "tenant": "slobodan.mijatovic_bluegrid.io",
  "username": "root"
}

const newCollection = {
  "name": "mySecondCollection"
  }
const getOptions = (requestBody,token) => ({
method:'POST',
body:JSON.stringify(requestBody),
headers: { authorization:token,
       "content-type": type
        },
});

async function handleRequest() { 
  const jwtRequest = await fetch(authEndpoint,getOptions(authInfo,""))
  const jwtResponse = await jwtRequest.json();
  const jwtToken=`bearer ${jwtResponse.jwt}`

  const collectionRequest = await fetch(collectionEndpoint,getOptions(newCollection,jwtToken))
  const collectionResponse = await collectionRequest.json()
  return new Response(JSON.stringify(collectionResponse))
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest())
})