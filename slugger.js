module.exports = (title, posts) => {

    if (posts === null || posts === undefined) {
        throw new Error('Non ho trovato i posts');
    }

    if (typeof title !== 'string') {
        throw new Error('Il titolo non può essere un numero');
    }

    const baseSlug = title.trim().replaceAll(' ', '-').replaceAll('/', '-').toLowerCase()

    if (!baseSlug) {
        throw new Error('Il titolo non è del formato corretto');
    }

    const slugs = posts.map(post => post.slug);

    let counter = 1;
    let slug = baseSlug;

    while (slugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++
    }

    return slug
}