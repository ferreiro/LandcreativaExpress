/* GET home page. */
exports.index = function(req, res){
	var title = 'Bienvenido a Landcreativa';
	var description = 'Expertos en páginas web, diseño gráfico, SEO y marketing digital'

	res.render('index', {
		title: title, // Title of the section
		description: description
	})
};

exports.contact = function(req, res){
    var title = 'Contacta';
    var description = 'Expertos en páginas web, diseño gráfico, SEO y marketing digital'
    var contact = true; // The view use this to show contact or presupuesto

    res.render('contact', {
        title: title, // Title of the section
        description: description,
        contact: contact
    });
};