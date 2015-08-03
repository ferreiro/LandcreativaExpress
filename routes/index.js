/* GET home page. */
exports.index = function(req, res){

	console.log("---------- Puta");
	console.log("Content data " + global.contentData);
	console.log("---------- Puta");

	res.render('index', {         
        menu : '/index', 
		content: contentData.spanish
	})
};
