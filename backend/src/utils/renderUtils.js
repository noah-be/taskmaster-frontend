const renderMainWithContent = (content) => (req, res) => {
    const data = {
        content: content,
        tasks: req.tasks
    };

    res.render('main-layout', data);
};

export {
    renderMainWithContent
};