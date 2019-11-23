Vue.config.productionTip = false;

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: 'https://desafio.liberfly.com.br/api/'
    })

    Vue.prototype.$http.interceptors.request.use(config => {
      console.log(config.method)
	  console.log(config)
      return config
    })
  }
})

new Vue({
    el: '#app',
    data() {
      return {
        meetings: [],
        nextmeetings: [],
        id: null,
        meeting: {
          room_id: '',
          email: '',
          start_at: '',
          finished_at: '',
          description: '',
          situation: 'ativo'
        },
        meetingErrors: {
          room_id: '',
          email: '',
          start_at: '',
          finished_at: '',
          description: ''
        },
        todayDate: moment().format('YYYY-MM-DD HH:mm')
      }
    },
    created() {
      this.$http('meetings').then(res => {

        res.data.forEach((val) => {

          moment.locale('pt');

          const today = moment().format('YYYY-MM-DD HH:mm:ss')

          //Separando a data e a hora
          let d1 = val.start_at.split(" ")
          let d2 = today.split(" ")

          let e1 = val.finished_at.split(" ")

          //Fazendo o tratamento de strings para a nova classe meeting
          let hora = d1[1].split(':')[0]
          let minuto = d1[1].split(':')[1]
          let horaInicio = hora + ':' + minuto

          hora = e1[1].split(':')[0]
          minuto = e1[1].split(':')[1]
          horaFim = hora + ':' + minuto

          let dia = d1[0].split('-')[2]
          let mes = moment(d1[0]).format("MMMM")
          let diaSemana = moment(d1[0]).format("dddd")

          //Comparando se a reunião é hoje ou se foi cancelada
          if(d1[0] == d2[0] && val.situation != 'cancelado'){
            this.meetings.push({"id": val.id,
								"horaInicio": horaInicio,
                                "horaFim": horaFim,
                                "dia": dia,
                                "mes": mes,
                                "diaSemana": diaSemana,
                                "sala": val.room_id})
          }else if(Date.parse(d1[0]) > Date.parse(d2[0])){
            this.nextmeetings.push({"id": val.id,
								"horaInicio" : horaInicio,
                                "horaFim": horaFim,
                                "dia": dia,
                                "mes": mes,
                                "diaSemana": diaSemana,
                                "sala": val.room_id})
          }

        })

      })
    },
    methods: {
      limpar() {
        this.meeting.room_id = ''
        this.meeting.email = ''
        this.meeting.start_at = ''
        this.meeting.finished_at = ''
        this.meeting.description = ''
        this.meeting.situation = ''
      },
      excluir(id){
		console.log(id)
        this.$http.put(`/meetings/${id}`, {}, {params: {situation: "cancelado"}})
      },
      salvar() {
        console.log(this.todayDate)

        const bool = this.checkErrors()

        if(bool){
          this.meeting.start_at = this.meeting.start_at.replace("T", " ") + ':00'
          this.meeting.finished_at = this.meeting.finished_at.replace("T", " ") + ':00'
		  
		  console.log(this.meeting)

          this.$http.post('meetings/', this.meeting, {headers: { "Content-Type": "text/plain;charset-utf-8" } }).then(() => this.limpar())
        }
        
      },
      checkErrors() {
        if(this.meeting.room_id == ''){
          this.meetingErrors.room_id = 'O numero da sala é obrigatório.'
          return false
        }

        if(this.meeting.email == ''){
          this.meetingErrors.email = 'O email é obrigatório.'
          return false
        }else if(!this.validEmail(this.meeting.email)){
          this.meetingErrors.email = 'O email está incorreto.'
          return false
        }

        if(this.meeting.start_at.length <= 15){
          this.meetingErrors.start_at = 'A data de início é obrigatória.'
          return false
        }else if(Date.parse(this.meeting.start_at) < Date.parse(this.todayDate)){
          this.meetingErrors.start_at = 'Insira uma data futura.'
          return false
        }

        if(this.meeting.finished_at.length <= 15){
          this.meetingErrors.finished_at = 'A data de fim é obrigatória.'
          return false
        }else if(Date.parse(this.meeting.finished_at) < Date.parse(this.todayDate)){
          this.meetingErrors.finished_at = 'Insira uma data futura.'
          return false
        }else if(Date.parse(this.meeting.finished_at) < Date.parse(this.meeting.start_at)){
          this.meetingErrors.finished_at = 'A data de fim deve ser posterior a de início.'
          return false
        }

        if(this.meeting.description == ''){
          this.meetingErrors.description = 'A descrição é obrigatória.'
          return false
        }else if(this.meeting.description.length < 8){
          this.meetingErrors.description = 'A descrição está curta.'
          return false
        }

        return true
      },
      clearErrors() {
        this.meetingErrors.room_id = ''
        this.meetingErrors.email = ''
        this.meetingErrors.start_at = ''
        this.meetingErrors.finished_at = ''
        this.meetingErrors.description = ''
        this.meetingErrors.situation = ''
      },
      validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    }
})