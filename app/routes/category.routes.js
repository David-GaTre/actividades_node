module.exports = app => {
    const category = require('../controllers/category.controller')
    var router = require("express").Router();

    router.get('/', category.findAll);
    router.get('/:id', category.findById);
    router.post('/', category.create);
    router.delete('/:id', category.delete);
    router.put('/:id', category.update)
    app.use('/category', router)
};
