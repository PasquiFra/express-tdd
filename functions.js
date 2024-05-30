const path = require("path");
const fs = require("fs");

// La funzione readJSONfile che hai scritto legge un file JSON dal file system e restituisce i suoi contenuti come un oggetto JavaScript
const readJSONData = (fileName) => {

    //determino il path del file
    const filePath = path.join(__dirname, 'data', fileName + '.json');

    // leggo il contenuto del file
    const fileData = fs.readFileSync(filePath, "utf-8");

    //ed infine ritorno il file "parsato"
    return JSON.parse(fileData);
}

// La funzione writeJSONData che hai scritto salva un oggetto JavaScript come un file JSON
const writeJSONData = (fileName, newData) => {

    //determino il path del file
    const filePath = path.join(__dirname, 'data', fileName + '.json');

    //setto l'oggetto Javascript da strasformare in stringa JSON
    const fileString = JSON.stringify(newData);

    // scrittura della stringa JSON nel file di destinazione
    fs.writeFileSync(filePath, fileString);
}

const updatePosts = (newPosts) => {
    posts = newPosts
    const filePath = path.join(__dirname, './data/posts.json');
    fs.writeFileSync(filePath, JSON.stringify(newPosts));
}

const deleteFile = (fileName) => {
    const filePath = path.join(__dirname, '../express-blog-auth/public/img', fileName);
    fs.unlinkSync(filePath);
}

module.exports = {
    readJSONData,
    writeJSONData,
    updatePosts,
    deleteFile
};