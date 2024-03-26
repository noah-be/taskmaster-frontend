const handle404 = (req, res, next) => {
    res.status(404).render('main', { content: '404' });
};

export default handle404;
