import { useState, useEffect } from 'react'

const FollowMouse = () => {

  // Definicion de Estados
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Definicion de Effects

  //   useEffect(callback,...)
  //   [] -> solo se ejecuta una vez cuando se monta el componente
  //   [enabted] -> se ejecuta cuando cambia enabted y cuando se monta et componente
  //   undefined -> se ejecuta cada vez que se renderiza et componente

  // PointerMove
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handlemove', { clientX, clientY })
      // Recordemos que tenemos que pasar una nueva instancia no cambiar el valor
      // original
      setPosition({ x: clientX, y: clientY })
    }
    // le ponemos un evento solo si esta activada la opcion
    if (enabled) {
      // Suscripcion
      window.addEventListener('pointermove', handleMove)
    }

    // useEffect tambien puede devolver una funcion la cual
    // se utiliza para limpiar los effectos que tuvo

    // MALA PRACTICA
    // En este caso debemos quitar el eventListener cuando se
    // desactiva el boton enable por lo que si no lo hacemos cada vez que
    // se presione el boton se agregara un nuevo eventListener a window
    // Podemos verificar esto haciendo getEventListeners(window)

    // Si no se maneja correctamente la suscripcion de eventos puede empeorar
    // el rendimiento de la página

    // Esto se llama CleanUseEffect tenemos que limpiar los efectos
    // Esto se ejecuta siempre que se desmonte el componente / deje de aparecer
    // el componente y se va a ejecutar cada vez que cambie el valor de la dependencia
    return () => {
      // Limpiamos la suscripcion que realizamos
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled]);


  // Cambiar body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    // quitamos clase si desactivamos con boton
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])


  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px,${position.y}px)`
      }}
      />
      <h3> Proyecto Mouse Follower</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}


function App() {

  return (
    <>
      <FollowMouse />
    </>
  )
}

export default App
