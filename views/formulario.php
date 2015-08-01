<!Doctype html>
<html lang="en">
<head>

	<meta charset="UTF-8" />

	<meta name="HandheldFriendly" content="True">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="viewport" content="width=device-width">
	<meta name="viewport" content="user-scalable=no">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">

	<meta name="description" content="We creates and develope webpages, logos, user experiences and mobiles apps." />

	<meta property="og:title" content="Landcreativa - Materializing your ideas">
	<meta property="og:site_name" content="Landcreativa">
	<meta property="og:url" content="http://www.landcreativa.com/">
	<meta property="og:image" content="">

	<title>Landcreativa - Materializing your ideas</title>

	<link href='http://fonts.googleapis.com/css?family=Lato:300,400' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="assets/css/normalize.css" />
 	<link rel="stylesheet" type="text/css" href="assets/style.css" />
 	<link rel="stylesheet" type="text/css" href="assets/css/style.css" />
 
</head>
<body>


	<div class="mobileMenu">
		<div class="mobileMenu-int">
			
			<div class="mobileMenu-logo">
				<a href="index.html">
					<div class="iso"></div>
					<div class="text"><h1>Landcreativa</h1></div>
				</a>
			</div>

			<button class="mobileMenu-button">
				<span class="icon-options"></span>
			</button>

			<nav class="mobileMenu-navigation">
				<ul>
					<li>
						<a href="nosotros.html">
							Nosotros
						</a>
					</li>
					<li>
						<a href="servicios.html">
							Servicios
						</a>
					</li>
					<li>
						<a href="casos_exito.html">
							Casos de éxito
						</a>
					</li>
					<li>
						<a href="contacta.html">
							Contacta
						</a>
					</li> 
					<li class="mobileMenu-navigation-socialNetwork">
						<a href="http://www.facebook.com/landcreativa">
							Facebook
						</a>
					</li> 
					<li class="mobileMenu-navigation-socialNetwork">
						<a href="http://www.twitter.com/landcreativa">
							Twitter
						</a>
					</li>  
				</ul>
			</nav>

		</div>
	</div>

	<header>  
		<nav class="menu_desktop">
			<div class="int">
				<div class="logo">
					<a href="index.html">
						<div class="iso"></div>
						<div class="text"><h1>Landcreativa</h1></div>
					</a>
				</div>
				<div class="links">
				<ul>
					<li>
						<a href="nosotros.html">
							Nosotros
						</a>
					</li>
					<li>
						<a href="servicios.html">
							Servicios
						</a>
					</li>
					<li>
						<a href="casos_exito.html">
							Casos de éxito
						</a>
					</li> 
					<li class="selected">
						<a href="contacta.html">
							Contacta
						</a>
					</li> 
				</ul>
				</div><!-- Fin menu links -->

	
				<div class="socialNetworksTop">
				<ul>
				<li>
					<a href="http://www.facebook.com/landcreativa" target="_blank">
						<span class="icon-facebook"></span>
					</a>
				</li>
				<li>
					<a href="http://www.spotify.com/landcreativa" target="_blank">
						<span class="icon-twitter"></span>
					</a>
				</li>
				<li>
					<a href="http://www.twitter.com/landcreativa" target="_blank">
						<span class="icon-blog"></span>
					</a>
				</li>
				<li>
					<a href="#" class="open_contact">
						<span class="icon-paperplane"></span>
					</a>
				</li>
				</ul> 
	 			</div>
		</nav>
	</header>

 
	<section class="section aboutSection">
		<div class="content"> 

			<h1 class="commun-title">
				¿Cómo te podemos ayudar?
			</h1> 

 			<div class="contact">
 				<div class="contact-form"> 

 				<? 
 					if ( (isset($_POST['name'])) &&
 					     (isset($_POST['subject'])) &&
 					     (isset($_POST['email'])) &&
 					     (isset($_POST['phone'])) &&
 					     (isset($_POST['message'])) 
 					)  {

						// Form variables
	 					$name = ucwords( htmlentities($_POST['name']) );	// ucwords() onvierte mayuscula la primera letra de una palabra
	 				    $subject = htmlentities($_POST['subject']);
	 				    $email = htmlspecialchars($_POST['email']);
	 				    $phone = htmlentities($_POST['phone']);  
	 				    $userMessage = htmlentities($_POST['message']);  
 
						// Setting up the message
						$to = 'landcreativa@gmail.com';
						$to .= ', jgferreiro.me@gmail.com';
						$subject = 'Mensaje de ' . $name . ' - #' . $subject;
						$headers = "From: Landcreativa <info@landcreativa.com>; \r\n";
						$headers .= "Reply-To: ". $_POST['email'] . "; \r\n";
						$headers .= "MIME-Version: 1.0\r\n";
						$headers .= "Content-Type: text/html; charset=UTF-8; \r\n";

						// Prepare the body of the message
						$message = '<html><body>';
						$message .= '<h3>Mensaje</h3>';
						$message .= '<p>' .$userMessage .'</p>';
						$message .= '<h3>Información extra de contacto</h3>';
						$message .= '<p style="font-size:16px;">';
						$message .= 	'Nombre: ' .$name .'<br /> ';
						$message .= 	'Email: ' .$email .'<br />';
						$message .= 	'Teléfono: ' .$phone;
						$message .= '</p>'; 
 						$message .= '</body></html>';

			            if (mail($to, $subject, $message, $headers)) {

			            	echo "<div class='contact-form-roundresponse contact-form-roundresponse-green'><span class='icon-envelope'></span></div>";
			            	echo "<div class='contact-form-separator'></div>";
			            	echo "<p class='contact-form-messagetitle'>¡Mensaje enviado!</p>";
			            	echo "<p class='contact-form-message'>". $name. ", gracias por escribirnos. Hemos recibido satisfactoriamente tu mensaje. Te responderemos en la siguiente dirección: <u> ".$email."</u> </p>";
			              	echo "<p class='contact-form-message'><i>Si ha introducido incorrectamente su mail, por favor, escribenos un mensaje cuanto antes a landcreativa@gmail.com notificandonos el hecho</i><p/> ";


			              	// Copia para la persona que nos manda el formulario
      							// Setting up the message
      							$to = $email;
      							$subject = $name .', hemos recibido tu mensaje.';
      							$headers = "From: Jorge de Landcreativa <info@landcreativa.com>; \r\n";
      							$headers .= "Reply-To: landcreativa@gmail.com; \r\n";
      							$headers .= "MIME-Version: 1.0\r\n";
      							$headers .= "Content-Type: text/html; charset=UTF-8; \r\n";

      							// Prepare the body of the message
      							$message = '<html><body>';
      							$message .= '<h2>¡Hola '. $name .'!,</h2>';
      							$message .= '<p style="font-size:16px;">Muchas gracias por ponerte en contacto con nosotros. Hemos recibido satisfactoriamente tu mensaje y vamos a responderte en la mayor brevedad posible.</p>';
      							$message .= '<p style="font-size:16px;">Atentamente.<br /> El equipo de <a href="http://landcreativa.com/">Landcreativa.com</a></p>';
      	 						$message .= '</body></html>';


				              	if (mail($to, $subject, $message, $headers)) {
				              		echo "<p class='contact-form-message'>También te hemos enviado un mail de confirmación a tu correo. Revisa la bandeja de <strong>spam</strong>.</p>";
				              	}

			            } else {
	              	
		              		echo "<div class='contact-form-roundresponse contact-form-roundresponse-red'><span class='icon-envelope'></span></div>";
		              		echo "<div class='contact-form-separator'></div>";
		              		echo "<p class='contact-form-messagetitle'>Mensaje no enviado</p>";
		              		echo "<p class='contact-form-message'>". $name. ", no hemos podido recibir tu correo electrónico. ¿Podrías intentarlo de nuevo?. Si el error persiste, por favor, escribenos a <a href='mailto:info@landcreativa.com' style='color:#ed3636;'>info@landcreativa.com</a> y te atenderemos lo antes posible.</p>";
		              		echo "<p class='contact-form-message' style='margin-bottom:0;'>El equipo de Landcreativa</p>";
 

			            }
 
 					}
 					else { ?>

 						<?php include('contactForm.php'); ?>

 				<? } ?>
 
 
		 		</div>
		 	</div>
 

		</div>
	</section>
  
 
 	<footer class="footer">
 		<div class="footer-top">
 			<div class="footer-content">
 				<div class="footer-box">
 					<h2 class="footer-title">
 						Mapa web
 					</h2>

 					<ul class="footer-hotlinks">
 						<li><a href="">Portada / Home</a></li>
 						<li><a href="">Sobre nosotros</a></li>
 						<li><a href="">Servicios</a></li>
 					</ul>
 					<ul class="footer-hotlinks">
 						<li><a href="">Casos de éxito</a></li>
 						<li><a href="">Blog Corporativo</a></li>
 						<li><a href="contacta.html">Contáctanos </a></li>
 					</ul> 

 				</div>
 				<div class="footer-box">
 					<h2 class="footer-title">
 						¡Apúntante al newsletter!
 					</h2>
 					<p class="footer-text">
 						¿Quieres enterarte de las últimas novedades y recibir descuentos y promociones exclusivas? ¡Únete a nuestro newsletter y empieza a beneficiarte!.
 					</p>
 				</div>
 				<div class="footer-box footer-nomargin">
 					
 					<h2 class="footer-emptytitle"> 
 					</h2>
 					<div class="footer-form">
 					  <div class="correo_input">
 					    <input type="text" name="nombre" id="nombre"  onFocus="if(this.value == 'Introduce tu email'){this.value='';}" onBlur="if(this.value == ''){this.value='Introduce tu email';}" value="Introduce tu email"/>
 					  </div>
 					  <div class="envio_buton">
 					    <input type="submit" value="Subscribirme" />
 					  </div>
 					</div>
 				</div>
 			</div>
 		</div>
 		<div class="footer-bottom">
 			<div class="footer-content">
 				
 				<div class="footer-bottom-left">
 					<p class="footer-text">
 						Landcreativa - Expertos en páginas web, diseño gráfico, SEO y marketing digital
 					</p>
 				</div>
 				<div class="footer-bottom-right">
 					<p class="footer-text">
 						<a href="http://www.twitter.com/landcreativa" target="_blank" style="margin-left:0;">Twitter</a> 
 						<a href="http://www.facebook.com/landcreativa" target="_blank">Facebook</a> 
 						<a href="blog.html">Blog corporativo</a> 
 						<a href="contacta.html">Contacta</a>
 					</p>
 				</div>

 			</div>
 		</div>
 	</footer>
	
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script type="text/javascript" src="assets/js/animations.js"></script>

</body>
</html> 

