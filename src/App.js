import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Eventos from './components/Eventos';

class App extends Component {

    token = 'JBI72RPQAT5TR6NHABII';
    ordenar = 'date';

    state = {
        eventos: [],
        categorias: []
    }

    componentDidMount() {
        this.obtenerCategorias();
    }

    obtenerCategorias = async () => {
        const url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`;

        await fetch(url)
            .then(respuesta => respuesta.json())
            .then(categorias => {
                this.setState({
                    categorias: categorias.categories
                })
            })
    }

    obtenerEvento = async (busqueda) => {
        const url = `https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.nombre}&sort_by=${this.ordenar}&categories=${busqueda.categoria}&token=${this.token}`;

        await fetch(url)
            .then(respuesta => respuesta.json())
            .then(eventos => {
                this.setState({
                    eventos: eventos.events
                })
            })
    }


    render() {
        return (
            <div className="contenedor-app">
                <Header
                    titulo='Eventos'
                />

                <div className="uk-container">
                    <Formulario
                        categorias={this.state.categorias}
                        obtenerEvento={this.obtenerEvento}
                    />

                    <Eventos
                        eventos={this.state.eventos}
                    />
                </div>
            </div>
        );
    }
}

export default App;
