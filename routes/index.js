var express = require('express');
var model = require('../model/mysql');
var router = express.Router();

router.get('/login', function (req, res, next) {
	if (req.session.user) {
		return res.redirect('/');
	}

	res.render('login');

});

router.use(function (req, res, next) {
	if (!req.session.user) {
		return res.redirect('/login');
	}
	next();
});

router.get('/', function (req, res) {
	model.getAllArticles(req.session.user.userId, function (err, result) {
		if (err) {
			return res.status(500).send('Internal Server Error');
		}
		res.render('index', {klamotten: result, user:req.session.user});
	});
});

router.get('/article/:articleId/comments', function (req, res) {
	var articleId = req.params.articleId;

	model.getArticle(articleId, function(err, article) {
		if(err){
			return res.status(500).send('Internal Server Error');
		}

		model.getArticleComments(articleId, function (err, comments) {
			if (err) {
				return res.status(500).send('Internal Server Error');
			}
			res.render('detail', {article:article[0], comments:comments});
			console.log("Hallo");
		});
	});
});

router.get('/newArticle', function(req, res){
	res.render('new');
});

router.get('/manageArticles', function(req, res){
	model.getUserArticles(req.session.user.userId, function (err, result) {
		if(err){
			return res.status(500).send("Internal Server Error");
		}
		res.render('manage', {articles:result});
	});
});

router.get('/logout', function(req, res){
	delete req.session.user;
	res.redirect('/login');
});

module.exports = router;
