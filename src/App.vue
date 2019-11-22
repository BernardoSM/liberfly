<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-card>
			<b-form-group label="Numero da sala:">
				<b-form-input type="text" size="md" v-model="meeting.room_id" placeholder="Informe o numero da Sala"></b-form-input>
			</b-form-group>
		</b-card>
		<b-card>
			<b-form-group label="E-mail:">
				<b-form-input type="email" size="md" v-model="meeting.email" placeholder="Informe o email"></b-form-input>
			</b-form-group>
		</b-card>
		<b-card>
			<b-form-group label="Início:">
				<b-form-input type="datetime-local" size="md" v-model="meeting.start_at"></b-form-input>
			</b-form-group>
		</b-card>
		<b-card>
			<b-form-group label="Fim:">
				<b-form-input type="datetime-local" size="md" v-model="meeting.finished_at"></b-form-input>
			</b-form-group>
		</b-card>
		<b-card>
			<b-form-group label="Descrição:">
				<b-form-input type="text" size="md" v-model="meeting.description" placeholder="Informe a descrição"></b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="salvar" size="md" variant="primary">Salvar</b-button>
			<b-button @click="getMeetings" size="md" variant="success" class="ml-2">Obter Reuniões</b-button>
		</b-card>
	</div>
</template>

<script>
export default {
	/*created(){
		this.$http.post('meetings', {
		    "room_id": 10,
		    "email": "desafio@liberfly.com.br",
		    "start_at": "2019-10-18 13:00:00",
		    "finished_at": "2019-10-18 14:00:00",
		    "description": "reuniao de teste 10",
		    "situation": "ativo"
		}).then(res => console.log(res))
	}*/
	data() {
		return {
			meeting: {
				room_id: '',
				email: '',
				start_at: '',
				finished_at: '',
				description: '',
				situation: 'ativo'
			}
		}
	},
	methods: {
		salvar() {
			this.$http.post('meetings', this.meeting).then(resp => {
				this.meeting.room_id = ''
				this.meeting.email = ''
				this.meeting.start_at = ''
				this.meeting.finished_at = ''
				this.meeting.description = ''
			})
		},
		getMeetings() {
			this.$http('meetings').then(res => {
				this.usuarios = res.data
				console.log(this.usuarios)
			})
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
