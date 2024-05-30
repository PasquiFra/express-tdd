module.exports = (title, posts) => {

    const baseSlug = title.toLowerCase().trim()

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