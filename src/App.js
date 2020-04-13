import React, { useState, useEffect} from "react";
import { uuid } from "uuidv4";
import api from './services/api';

import "./styles.css";

function App() {
  const [repo, setRepo] = useState([]);
  console.log(repo);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data);
    })  
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Projeto com NodeJS ${Date.now()}`,
      id: uuid(),
    });

    const repositories = response.data;

    setRepo([...repo, repositories])
  
  }

  async function handleRemoveRepository(id) {

    try {
      await api.delete(`repositories/${id}`, {
    });  

    setRepo(repo.filter(r => r.id !== id));
  } catch(err) {
    alert('Erro ao deletar')}
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repo.map(repo =>
        <li key={repo.id}>
          <p>{repo.title}</p>
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
         )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
