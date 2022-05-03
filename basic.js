var app = Vue.createApp({ 
    data() {
        return {
            urlBase: 'http://localhost:5000',
            categories: [],
            xd:'xdxd'
        }
    },
    methods: {
        async CallApi(url, method, data) {
            const header = data == null? { method: method,
                                           headers: {'Content-Type': 'application/json'}} :
                                         { method: method,
                                           body: JSON.stringify(data),
                                           headers: {'Content-Type': 'application/json'}}
            try {
                const response = await fetch(url, header);
                return await response.json();
            }
            catch(error) {
                alert('Hubo un error.')
            }
        }
    },
    mounted() {
        fetch('http://localhost:5000/category')
    }
});
app.mount("#app")