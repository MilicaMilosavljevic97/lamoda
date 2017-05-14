var express = require('express');
var multer = require('multer');
var model = require('../model/mysql');
var path = require('path')
var router = express.Router();
var upload = multer({dest:path.join(__dirname, '../public/uploads')});

/* GET users listing. */
router.post('/login', function (req, res) {
    model.getUserByCredentials(req.body.email, req.body.password, function (err, result) {
        if(err){
            return res.status(500).send("Internal Server Error");
        }

        if(result.length > 0) {
            req.session.user = result[0];
            return res.send("ok");
        }

        res.status(400).send("user not found");
    });
});

router.post('/register', function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    model.addUser(firstname, lastname, email, password, function (err, result) {
        if(err){
            return res.status(500).send("internal server error");
        }
        res.send("Ok");
    });
})

router.use(function(req, res, next){
	if (!req.session.user) {
		return res.status(403).send('Forbidden');
	}

	next();
});

router.post('/article/:articleId/like', function (req, res) {
    var articleId = req.params.articleId;

    model.addLike(articleId, req.session.user.userId, function(err, result){
        if(err){
            return res.status(500).send('Internal Server Error');
        }

        return res.send("Ok");
    });
});

router.post('/article/:articleId/comment', function (req, res) {
    var articleId = req.params.articleId;
    var message = req.body.message;

    model.addComment(articleId, req.session.user.userId, message, function (err, result) {
        if(err){
            return res.status(500).send('Internal Server Error');
        }

        console.log(result);
        return res.send("Ok");
    });
});

router.post('/article/add', upload.single('picture'), function(req, res){
    var name = req.body.name;
    var filename = req.file.filename;

    model.addArticle(name, filename, req.session.user.userId, function (err) {
        if(err){
            return res.status(500).send('Internal Server Error');
        }
        res.send("ok");
    });
});

router.delete('/article/:articleId', function (req, res) {
    var articleId = req.params.articleId;

    model.deleteArticle(articleId, function (err, result) {
        if(err){
            return res.status(500).send("Internal Server Error");
        }
        res.send("Ok");
    });
});

module.exports = router;
