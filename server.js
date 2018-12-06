

let express = require('express')//appel du fichier ou est contenu Express
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

//Moteur de template
app.set('view engine', 'ejs')//moteur de template utilisé ejs

// Nos middleware
app.use('/assets', express.static('public')) // tout ce qui se trouve dans ce dossier public pourra etre distribué
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(session({
  secret: 'On écrit nawak ici chiffrement du cookie',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // dans ce cas ci secure est false car on ne traite pas avec de l https
}))
app.use( require ('./middlewares/flash')) //on appel le middleware flash

//Nos routes
app.get('/', (request, response) =>{
  let Message = require('./models/message')
  Message.all(function (messages){
    response.render('pages/index', {messages: messages})
  })

 //on lui indique la "view" que l'on souhaite rendre grâce a .render. On ne précise pas  lextension du fichier "index"(qui serait index.ejs) car il deveine automatiquement grace au moteur de template défini plus haut
})

app.get('/message/:id', (request, response)=>{
  let Message = require('./models/message')
  Message.find(request.params.id, function(message){
    response.render('messages/show', {message : message})
  })
})


app.post('/', (request, response) =>{//lorsque l action post sur la page d accueil est effectué , on lance une fonction qui prendra en paramètre une requete et une réponse qui fera différent traitement.
  if (request.body.message === undefined || request.body.message === ''){
    request.flash('error', "Veuillez poster un message")
    response.redirect('/')
  }else{
    let Message = require('./models/message')
  Message.create(request.body.message, function (){
  request.flash('success', "Votre message a bien été posté")
  response.redirect('/')
  })

  }

})


app.listen(8080)
