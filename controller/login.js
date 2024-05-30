// importo i file necessari all'interno di questo modulo
const auth = require("./auth");
const users = require("../data/users.json");

const login = (req, res) => {

    //dichiaro le variabili ricevute nella richiesta
    const { username, password } = req.body;
    // verifico la corrispondenza dei dati nel mio database
    const userToLog = users.find(user => user.username === username && user.password === password)

    // se per qualsiasi motivo la ricerca non ottiene buon esito restituisco un errore
    if (!userToLog) {
        return res.status(404).send("Le credenziali inserite non sono corrette")
    };

    //richiamo il metodo dell'auth controller per generare il token
    const token = auth.createLoginToken(userToLog);

    //invio il token come risposta
    res.send(token);
};

module.exports = login;