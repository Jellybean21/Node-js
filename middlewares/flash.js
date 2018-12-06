module.exports = function (request, response, next){// trois paramètres dans cette fonction

if (request.session.flash){ // si il y a des infos dans la requete de la session alors on creer la variable locals.flash
  response.locals.flash = request.session.flash
  request.session.flash = undefined // ensuite on suprime la requeste
}
  request.flash = function (type, content){
  if (request.session.flash === undefined){
    request.session.flash = {}
  }
    request.session.flash[type] = content
  }
  next() // on définie la méthode next
}
