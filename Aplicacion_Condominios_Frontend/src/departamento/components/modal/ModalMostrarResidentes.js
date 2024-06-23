
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../AñadirResidenteCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React, { useState, useEffect } from 'react';
const endpoint = "http://localhost:8000/api";
const estadoRes = 0;
const ModalUsuarios = ({isOpen,toggle,agregarResidente}) => {
  // Aquí puedes usar useState para manejar el estado local de la ventana modal

  const [residentes, setResidentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Si necesitas hacer una solicitud para obtener la lista de usuarios, puedes usar useEffect
  useEffect(() => {
    
    axios.get(`${endpoint}/residentes-disp/${estadoRes}`)
    .then((response) => {
      setResidentes(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener usuarios:', error);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

const filteredResidentes = residentes.filter(residente =>
    residente.nombre_residente.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (

      <div>
          <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
        <ModalHeader style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <span style={{fontWeight:'bold'}}>
            Añadir Residente
          </span>
          </ModalHeader>
          <ModalBody>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar residente..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </div>
              <ul  className="cardLista">
              {filteredResidentes.map(residente => (
                  <li key={residente.id} className="residente-item">
                  <span style={{ marginLeft: '1rem' }} onClick={() => { agregarResidente(residente); toggle(); }} >{residente.nombre_residente} {residente.apellidos_residente}</span>
                </li>
                ))}
              </ul>
          </ModalBody>
          <ModalFooter>
              <Button onClick={toggle} className='boton-modal'>
                Cerrar
            </Button>
            </ModalFooter>
          </Modal>
      </div>
    
  );
};

export default ModalUsuarios;