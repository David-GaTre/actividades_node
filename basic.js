var app = Vue.createApp({ 
    data() {
        return {
            mostrar: 0,
            imgs: [
                ['./assets/cerro_silla.jpg', "Cerro de la silla"],
                ['./assets/marco.jpg', "Musero MARCO"],
                ['./assets/chipinque.jpg', "Chipinque"],
            ],
            isHidden: false,
            image: '',
            nombre_lugar: ''
        }
    },
    methods: {
        subirPasatiempo(e) {
            var files = e.target.files || e.dataTransfer.files;
            this.colocarImagen(files[0]);
        },
        colocarImagen(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
  
            reader.onload = (e) => {
                vm.image = e.target.result;
                if (vm.nombre_lugar == '') {
                    vm.nombre_lugar = "Se te olvido escribir el nombre del lugar.";
                }
            };
            reader.readAsDataURL(file);
        },
        borrarPasatiempo: function (e) {
            this.image = '';
            this.nombre_lugar = '';
        }
    }
});
app.mount("#app")