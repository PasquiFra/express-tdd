//importo le funzioni di read e write in functions.js
const { readJSONData, writeJSONData, updatePosts, deleteFile } = require('../functions');

//importo il file posts.json
let posts = require("../data/posts.json");

//imposto la rotta index
const index = (request, response) => {

    // Setto la risposta da inviare al client a seconda del formato che viene richiesto
    response.format({
        html: () => {
            let html = '<h1 class="text-center">Crypto Blog</h1><div>';
            posts.forEach(({ title, content, image, tags }) => {
                html +=
                    `<section>
                    <img style='width: 300px' src='/img/${image}'></img>
                    <h3>${title}</h3>
                    <p>${content}</p>
                `;
                html += '<div>';
                tags.map((tag) => {
                    html += `<span>#${tag.toLowerCase().replaceAll(' ', '-')} </span>`
                })
                html += `</div></div><hr>`;
            });
            html += '</section>';
            response.send(html);
        },
        json: () => {
            response.json({
                data: posts,
                count: posts.lenght
            })
        }
    })
}

// imposto la rotta show
const show = (request, response) => {

    const requiredSlug = request.params.slug;
    const postToShow = posts.find(post => requiredSlug === post.slug);

    const { title, image, content, tags } = postToShow;

    // Setto la risposta da inviare al client a seconda del formato che viene richiesto
    response.format({
        html: () => {
            if (postToShow) {
                let html = '<h1 class="text-center">Crypto Blog</h1><div>';
                html +=
                    `<section>
                    <img style='width: 300px' src='/img/${image}'></img>
                    <h3>${title}</h3>
                    <p>${content}</p>
                `;
                html += '<div>';
                tags.map((tag) => {
                    html += `<span>#${tag.toLowerCase().replaceAll(' ', '-')} </span>`
                })
                html += `</div></div><hr>`;

                html += '</section>';
                response.send(html);
            } else {
                res.status(404).send(`<h1>404 - Post not Found</h1>`);
            }
        },
        json: () => {
            if (postToShow) {
                response.json({
                    data: post,
                    count: post.lenght
                })
            } else {
                res.status(404).json({
                    status: 404,
                    error: 'Not Found',
                    description: `Post with slug ${requiredSlug} not found`
                })
            }
        }
    })
}

const create = (request, response) => {

    const { title, slug, content, tags } = request.body

    // TODO: validazione completa dei dati in arrivo!
    if (!title || !slug || !content) {
        request.file?.filename && deleteFile(request.file.filename);
        return response.status(400).send('Some data is missing.');
    } else if (!request.file || !request.file.mimetype.includes('image')) {
        request.file?.filename && deleteFile(request.file.filename);
        return response.status(400).send('Image is missing or it is not an image file.');
    }

    // inserimento del nuovo post 
    const newPost = {
        "title": title,
        "slug": slug,
        "content": content,
        "image": request.file.filename,
        "tags": tags
    }

    // aggiornamento dei post 
    newPosts = [...posts, newPost];
    updatePosts(newPosts);

    // feedback
    response.send(`Post inviato correttamente`)
}

const destroy = (request, response) => {

    const { slug } = request.params;

    const postToDelete = posts.find(post => post.slug === slug);
    if (!postToDelete) {
        return response.status(404).send('Il post da cancellare non è stato trovato')
    }
    filteredPosts = posts.filter(post => post.slug != postToDelete.slug);
    updatePosts(filteredPosts);
    deleteFile(postToDelete.image);

    response.send(`Post ${postToDelete.title} eliminato con successo`)
}

module.exports = {
    index,
    show,
    create,
    destroy
}
