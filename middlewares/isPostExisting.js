const posts = require('../data/posts.json');

const isPostExisting = (req, res, next) => {
    const { slug } = req.params;

    const postToDelete = posts.find(post => post.slug === slug);

    // se il post non esiste restituisco un errore e non entro nella rotta
    if (!postToDelete) {
        return res.status(404).send('Il post da cancellare non è stato trovato')
    };

    req.postToDelete = postToDelete;
    next();
}


module.exports = isPostExisting;
