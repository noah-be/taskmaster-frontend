const renderMainWithContent = (content) => (req, res) => {
    res.render('main-layout', {
        content
    });
};

export {
    renderMainWithContent
};