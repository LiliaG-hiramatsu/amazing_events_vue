const { createApp } = Vue

const app = createApp({
    data() {
        return {
            urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
            eventos: [],
            backupEventos: [],
            texto: '',
            categorias: [],
            categoriasChecked: []
        }
    },
    created() {
        this.traerDatos()
    },
    mounted() {

    },
    methods: {
        traerDatos() {
            fetch(this.urlApi)
                .then(response => response.json())
                .then(data => {
                    this.eventos = data.events
                    this.backupEventos = this.eventos
                    this.extraerCategorias(this.eventos)
                })
                .catch(error => console.log(error.message))
        },
        extraerCategorias(arr) {
            arr.forEach(elemento => {
                if (!this.categorias.includes(elemento.category)) {
                    this.categorias.push(elemento.category)
                }
            })
        }
    },
    computed: {
        filtrarPorBuscador() {
            this.eventos = this.backupEventos.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
        },
        filtrarPorCategoria() {
            if (this.categoriasChecked.length > 0) {
                this.eventos = this.backupEventos.filter(evento => this.categoriasChecked.includes(evento.category))
            } else {
                this.eventos = this.backupEventos
            }
        },
        filtroDoble() {
            let primerFiltro = this.backupEventos.filter(evento => evento.name.toLowerCase().includes(this.texto.toLowerCase()))
            if (this.categoriasChecked.length > 0) {
                this.eventos = primerFiltro.filter(evento => this.categoriasChecked.includes(evento.category))
            } else {
                this.eventos = primerFiltro
            }
        }
    }
})

app.mount('#app')