<?php 
header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 ?>

<!doctype html>
<html lang="pt-br">
	<head>
		<title>Título do projeto</title>
		<meta name="description" content="Page description"><!-- Max 155 characters -->
		
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!--Dependencies-->
		<link rel="stylesheet" href="dist/css/alldep.min.css" /> 

		<!-- Css Project -->
		<link rel="stylesheet" href="dist/css/style.css" />

		<!--Tag Hotjar-->

		<!--Tag Analytics-->

		<!-- twitter card data (https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary-card-with-large-image) -->
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:site" content="@publisher_handle">
		<meta name="twitter:title" content="Page Title"><!-- Max 70 characters -->
		<meta name="twitter:description" content="Page description"><!-- Max 200 characters -->
		<meta name="twitter:image" content="/dist/img/share.png"><!-- share image, min dimensions: 280x150, file size < 8MB -->
		<meta name="twitter:image:alt" content="Share image alt text">

		<!-- open graph data -->
		<meta property="og:title" content="Page Title"><!-- Max 70 characters -->
		<meta property="og:type" content="article">
		<meta property="og:url" content="http://www.example.com/"><!-- current page URL -->
		<meta property="og:image" content="/dist/img/share.png"><!-- share image, min dimensions: 1200x630, file size < 8MB -->
		<meta property="og:description" content="Page description">
		<meta property="og:site_name" content="Site Name, i.e. Engage">
	</head>
	<body>
		
		<section class="canvas" id="app">
			<div class="canvas-content">
				<div class="meetings">
					<h3>
						Hoje
					</h3>
					<div class="meetings-swiper">
						<div class="meetings-swiper-card" v-for="(meeting, id) in meetings" :key="id">
							<div class="meetings-swiper-card__img">
								<img class="local" src="dist/img/coliseum.png" alt="Coliseu">
								<img class="over" src="dist/img/shadow.png" alt="Imagem de sobreposição">
								<img class="wave" src="dist/img/wave.png" alt="Ondas">
								<i class="fas fa-chevron-circle-up"></i>
								<div class="cancel" @click="excluir(meeting.id)">
									Cancelar
								</div>
							</div>
							<div class="meetings-swiper-card__info">
								<div class="hour">
									{{meeting.horaInicio}} - {{meeting.horaFim}}
								</div>
								<div class="room">
									Sala {{meeting.sala}}
								</div>
								<div class="day">
									{{meeting.diaSemana}} | {{meeting.dia}} DE {{meeting.mes}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="meetings">
					<h3>
						Próximas
					</h3>
					<div class="meetings-swiper">
						<div class="meetings-swiper-card" v-for="(meeting, id) in nextmeetings">
							<div class="meetings-swiper-card__img">
								<img class="local" src="dist/img/es.jpg" alt="Espirito Santo">
								<img class="over" src="dist/img/shadow.png" alt="Imagem de sobreposição">
								<div class="cancel" @click="excluir(meeting.id)">
									Cancelar
								</div>
								<div class="description" :class="{opened: meeting.descOpen}">
									{{meeting.descricao}}
								</div>
								<img class="wave" src="dist/img/wave.png" alt="Ondas">
								<i class="fas fa-chevron-circle-up" :class="{opened: meeting.descOpen}" @click="meeting.descOpen = !meeting.descOpen"></i>
							</div>
							<div class="meetings-swiper-card__info">
								<div class="hour">
									{{meeting.horaInicio}} - {{meeting.horaFim}}
								</div>
								<div class="room">
									Sala {{meeting.sala}}
								</div>
								<div class="day">
									{{meeting.diaSemana}} | {{meeting.dia}} DE {{meeting.mes}}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="new">
					<div class="container">
						<h3>
							Nova reunião
						</h3>
						<div class="new-form">
							<div class="new-form__text">
								<input type="text" class="form-control" v-model="meeting.room_id" @focus="clearErrors" required>
								<label>Sala</label>
								<span v-if="meetingErrors.room_id != ''" class="error"> <i class="fas fa-times"></i> {{meetingErrors.room_id}} </span>
							</div>
							<div class="new-form__text">
								<input type="email" class="form-control" v-model="meeting.email" @focus="clearErrors" required>
								<label>Email</label>
								<span v-if="meetingErrors.email != ''" class="error"> <i class="fas fa-times"></i> {{meetingErrors.email}} </span>
							</div>
							<div class='new-form__date'>
			                    <input type='datetime-local' class="form-control" :min="todayDate.replace(' ', 'T')" v-model="meeting.start_at" @focus="clearErrors" required>
			                    <label>Data de Início</label>
			                    <span v-if="meetingErrors.start_at != ''" class="error"> <i class="fas fa-times"></i> {{meetingErrors.start_at}} </span>
			                </div>
			                <div class='new-form__date'>
			                    <input type='datetime-local' class="form-control" :min="todayDate.replace(' ', 'T')" v-model="meeting.finished_at" @focus="clearErrors" required>
			                    <label>Data de Encerramento</label>
			                    <span v-if="meetingErrors.finished_at != ''" class="error"> <i class="fas fa-times"></i> {{meetingErrors.finished_at}} </span>
			                </div>
			                <div class="new-form__text">
								<input type="text" class="form-control" v-model="meeting.description" @focus="clearErrors" required>
								<label>Descrição</label>
								<span v-if="meetingErrors.description != ''" class="error"> <i class="fas fa-times"></i> {{meetingErrors.description}} </span>
							</div>
							<input type="submit" class="btn btn-primary" @click.prevent="salvar" placeholder="Enviar">
						</div>
					</div>
				</div>
			</div>
		</section>

		<div id="menu">
			<div class="menu-content">
				<div class="menu-content-item home active">
					<i class="fas fa-home"></i>
				</div>
				<div class="menu-content-item new">
					<i class="fas fa-calendar-plus"></i>
				</div>
			</div>
		</div>


		<!-- Script Project -->
		<script src="dist/js/alldep.min.js" crossorigin="anonymous"></script>
		<script src="dist/js/scripts.js" crossorigin="anonymous"></script>
		<script src="vue.js" crossorigin="anonymous"></script>
	</body>
</html>