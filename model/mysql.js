var mysql = require("mysql");
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	pass: '',
	database: 'lamodaa'
});

connection.connect(function (err) {
	if (err) {
		throw new Error(err);
	}
	console.log("Mit Datenbank verbunden");
});

function addArticle(name, filename, user, callback){
	connection.query('INSERT INTO articles VALUES(null, ?, ?, ?)', [user, name, filename], function (err, result) {
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function addLike(articleId, userId, callback) {
	connection.query('INSERT INTO likes VALUES(?, ?, CURRENT_TIMESTAMP)', [articleId, userId], function (err, result) {
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function dislike(articleId, userId, callback) {
	connection.query('DELETE FROM likes WHERE articleId = ? AND userId = ?', [articleId, userId], function (err, result) {
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function addComment(articleId, userId, message, callback) {
	connection.query('INSERT INTO comments VALUES(null, ?, ?, ?, CURRENT_TIMESTAMP)', [articleId, userId, message], function (err, result) {
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function delcomment(commentId, callback) {
	connection.query('DELETE FROM comments WHERE commentId = ?', commentId, function (err, result) {
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function deleteArticle(articleId, callback){
	connection.query('DELETE FROM articles WHERE articleId = ?', articleId, function(err, result){
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function addUser(firstname, lastname, email, password, callback) {
	connection.query('INSERT INTO user VALUES(null, ?, MD5(?), ?, ?)', [email, password, firstname, lastname], function (err, result) {
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function getUserByCredentials(email, password, callback) {
	connection.query('SELECT * FROM user WHERE email = ? AND password = MD5(?)', [email, password], function (err, result) {
		if (err) {
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function getAllArticles(userId, callback) {
	connection.query(`
			SELECT
				articles.articleId as articleId, 
				articles.userId as userId,
				articles.bild as bild,
				user.firstname as firstname,
				user.lastname as lastname,
				articles.name as name,
				(SELECT count(*) FROM likes WHERE likes.articleId = articles.articleId AND likes.userId = ?) AS hasBeenLiked,
                (SELECT count(*) FROM likes WHERE likes.articleId = articles.articleId) AS likes
			FROM articles 
			JOIN user USING(userId) 
	`, userId, function (err, result) {
		if (err) {
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function getArticle(articleId, callback){
	connection.query('SELECT * FROM articles WHERE articleID = ?', articleId, function(err, result){
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function getArticleComments(articleId, callback){
	connection.query('SELECT * FROM comments JOIN user USING(userId) WHERE articleId = ? ORDER BY timestamp DESC', articleId, function(err, result){
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

function getUserArticles(userId, callback){
	connection.query('SELECT * FROM articles WHERE userId = ?', userId, function (err, result) {
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null, result);
	});
}

module.exports = {
	addArticle,
	addLike,
	dislike,
	addComment,
	delcomment,
	addUser,
	deleteArticle,
	getArticle,
	getArticleComments,
	getUserByCredentials,
	getAllArticles,
	getUserArticles
};

