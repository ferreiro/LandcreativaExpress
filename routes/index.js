/* GET home page. */
exports.index = function(req, res){
	var title = 'Bienvenido a Landcreativa';
	var description = 'Expertos en páginas web, diseño gráfico, SEO y marketing digital'

	res.render('index', {
		title: title, // Title of the section
		description: description
	})
};
