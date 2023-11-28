import React, { useState } from 'react';

const BotonConContador = () => {
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  const handleClick = () => {
    if (!bloqueado) {
      // Incrementa el número de intentos
      setIntentos((prevIntentos) => prevIntentos + 1);

      if (intentos === 3) {
        // Si se han realizado tres intentos, bloquea el botón
        setBloqueado(true);

        // Establece un temporizador para desbloquear el botón después de 5 minutos (300,000 milisegundos)
        setTimeout(() => {
          setBloqueado(false);
          setIntentos(0); // Reinicia el contador de intentos
        }, 800000); // 300,000 milisegundos = 5 minutos
      }

      // Aquí puedes agregar tu lógica para el clic del botón
      // Puedes realizar la lógica de validación aquí

      // Ejemplo simple de mensaje en la consola
      console.log('Haciendo algo en el clic del botón');
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={bloqueado}>
        {bloqueado ? 'Botón Bloqueado' : 'Hacer algo'}
      </button>
    </div>
  );
};

export default BotonConContador;
