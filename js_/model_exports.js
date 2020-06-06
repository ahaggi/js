const noeFunk = (param) =>
new Promise.resolve(`Dette funksjon vil returnere en param = ${param}`)


module.exports =  noeFunk // returnere en funksjon



// på den andre filen
//...
const store = require('./store')  // obs stor er en funksjon
//...
app.post('/createUser', (req, res) => {
    store('noeParam')
      .then((x) => {
        console.log(x)
        res.sendStatus(200)})
  })
  
  app.listen(8081, () => {
    console.log('Server running on http://localhost:8081')
  })


  //*************************************************************************

  const noeFunk = (param) =>
new Promise.resolve(`Dette funksjon vil returnere en param = ${param}`)

const enAnnenFunk = (param) =>
new Promise.resolve(`Dette er en annen funksjon som vil returnere en param = ${param}`)


module.exports =  {noeFunk , enAnnenFunk} // returnere en objekt



// på den andre filen
//...
const store = require('./store')  // obs stor er en objekt
// const store1 = require('./store').noeFunk      // obs stor1 er en funksjon
// const store2 = require('./store').enAnnenFunk  // obs stor2 er en funksjon
//...
app.post('/createUser', (req, res) => {
    store
    .noeFunk('noeParam') //obs her
      .then((x) => {
        console.log(x)
        res.sendStatus(200)})

   store
  .enAnnenFunk('noeParam') //obs her
    .then((x) => {
      console.log(x)
      res.sendStatus(200)})
})

  app.listen(8081, () => {
    console.log('Server running on http://localhost:8081')
  })

