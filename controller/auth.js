//importo il modulo di json web token
const jwt = require("jsonwebtoken");
// importo la configurazione di dotenv
require("dotenv").config();
//importo i middleware
const errorDetector = require("../middlewares/errorsDetector");

//importo users
const users = require("../data/users.json");

//imposto il metodo per creare un token d'accesso
const createLoginToken = user => {
    const payload = user;
    const token = jwt.sign(payload, process.env.AUTH_KEY, { expiresIn: '5m' });
    return token
}

//imposto il metodo di accesso alla creation di un post
const authentication = (req, res, next) => {

    // recupero il token di autenticazione dalla request
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).send('Accesso non consentito, login richiesto')
    };

    //ricevendo il token come "Bearer xxxxyyyxxxzzz" devo separarlo e prendere soltanto la seconda parte
    const token = authToken.split(" ")[1];

    //verifico che il token sia valido hashandolo con la mia private key
    //? Il metodo verify mi restituirà il payload del token, contenente i dati codificati nel token al momento della sua creazione.
    jwt.verify(token, process.env.AUTH_KEY, (err, payload) => {
        if (err) {
            err.message == "jwt expired" ? err.message = "token scaduto" : err.message = "Autenticazione fallita, effettua il login"
            err.status = 401;
            return errorDetector(err, req, res, next)
        }
        //se l'user che ricevo nella decodifica corrisponde lo assegno nella request
        req.user = payload;

        next();
    });
}

const isAdmin = (req, res, next) => {

    const { username, password } = req.user

    // verifico che lo user autenticato corrisponda nel db
    const user = users.find(user => user.username === username && user.password === password);

    //verifico che abbia lo status di admin
    if (!user || !user.admin) {
        err.message = "Non hai i permessi per accedere a questa pagina"
        err.status = 401;
        return errorDetector(err, req, res, next)
    };

    next()
}

module.exports = {
    authentication,
    createLoginToken,
    isAdmin
}