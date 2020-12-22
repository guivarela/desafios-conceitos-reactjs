import React, { useState, useEffect } from "react";
import api from './services/api.js';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log(response);
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const now = Date.now();
    const response = await api.post('/repositories', {
      "url": `https://github.com/user/repo-${now}`,
      "title": `Novo repositório - ${now}`,
      "techs": ["Node", "Express", "TypeScript"]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204) {
      const repos = repositories.filter(repo => repo.id !== id);
      setRepositories(repos);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
