const express =  require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const serviceAccount = require('./serviceAccountKey.json');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const upload = multer({
    storage: multer.memoryStorage()
});


/*
RUTAS
*/
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev'));//para debuguear posibles erroes
app.use(express.json());//respuestas en formato json
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');//seguridad

app.set('port',port);

//Llamando a las rutas
users(app, upload);
categories(app, upload);
products(app, upload);
/*
server.listen(3000, '192.168.18.5'||'localhost', function(){
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});
*/
server.listen(port, function(){
    console.log('Escuchando en ' + port)
});
//RUTAS TEST
app.get('/', (req, res) => { 
    res.send('Ruta raiz del backend')
});

app.get('/test', (req, res) => { 
    res.send('Esta es la ruta del TEST')
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
}); //imprimir errores

// para usar esas variables en otros archivos
module.exports = {
    app: app,
    server: server
}

// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR