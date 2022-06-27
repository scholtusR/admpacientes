import React from 'react'
import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {

    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }

  }, [paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay al menos un campo vacio')

      setError(true)

      setTimeout(() => {
        setError(false)
      }, 3000);

      return;
    }
    setError(false);

    // OBjeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }

    if (paciente.id) {
      // Editando el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({});

    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }



    // reiniciar el formulario

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }



  return (
    <div className='md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>Añade pacientes y {''} <span className='text-indigo-600 font-bold'>Adminitralos</span></p>

      <form className='bg-white shadow-md rounded-lg py-10 px-5' onSubmit={handleSubmit}>
        {error && <Error />}
        <div>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>Nombre mascota</label>
          <input
            id="mascota"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type="text"
            placeholder='Nombre de la mascota'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {/* Tener en cuenta que el html for en el label, y luego el id con el mismo nombre, es para que cuando hagamos click en el label, nos lleve directamente al input */}

        </div>

        <div className='mt-5'>
          <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>
          <input
            id="propietario"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type="text"
            placeholder='Nombre del propietario'
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)} />
        </div>

        <div className='mt-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>Email</label>
          <input
            id="email"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type="email"
            placeholder='Email de contacto'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='mt-5'>
          <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>Email</label>
          <input
            id="alta"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div className='mt-5 mb-5'>
          <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>Sintomas</label>
          <textarea
            id="sintomas"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describe los sintomas'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}>
          </textarea>
        </div>

        <input
          type="submit"
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md'
          value={paciente.id ? 'Editar paciente' : 'Agregar paciente'} />

      </form>
    </div>
  )
}

export default Formulario


