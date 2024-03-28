const handle404 = (req, res, next) => {
    res.status(404).render('main-layout', {
        content: '404'
    });
};

export default handle404;