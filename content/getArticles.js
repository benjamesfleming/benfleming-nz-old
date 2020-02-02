export const articles = []

export default () => {
    const asyncImport = async slug =>
        (await import(`~/content/articles/${slug}.md`)).default

    return Promise.all(articles.map(asyncImport))
}
