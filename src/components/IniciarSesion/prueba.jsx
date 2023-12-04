import React, { Component } from 'react';

class BotonConIntentos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bloqueado: false,
      intentosRestantes: 3,
      tiempoRestante: 10, // 3 minutos en segundos
    };
  }
  // ... (código previo)

  bloquearBoton = () => {
    if (!this.state.bloqueado) {
      this.setState({ intentosRestantes: this.state.intentosRestantes - 1 });
      return;
    }

    if (this.state.intentosRestantes === 0) {
      // Después de tres intentos, bloquear el botón
      this.setState({ bloqueado: true });
      clearInterval(this.intervalo);
    } else {
      // Si aún hay intentos, iniciar el temporizador
      this.setState({ bloqueado: false });

      this.intervalo = setInterval(() => {
        if (this.state.tiempoRestante > 0) {
          this.setState((prevState) => ({
            tiempoRestante: prevState.tiempoRestante - 1,
          }));
        } else {
          clearInterval(this.intervalo);
          this.setState({
            bloqueado: false,
            tiempoRestante: 10,// Reiniciar el tiempo restante para futuros bloqueos
          });
        }
      }, 1000);
    }
  };

  // ... (código posterior)

  render() {
    return (
      <div>
        <button
          onClick={this.bloquearBoton}
          disabled={this.state.bloqueado}
        >
          Presionar Botón
        </button>
        <p>
          {this.state.bloqueado
            ? 'Botón bloqueado. Ha habido problemas.'
            : `Intentos restantes: ${this.state.intentosRestantes}. Tiempo restante: ${this.state.tiempoRestante} segundos`}
        </p>
      </div>
    );
  }
}

export default BotonConIntentos;
