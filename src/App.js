import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [project, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      	title: `Novo projeto ${Date.now()}`,
	      url: "www.google.com",
	      techs: "Tecnologias Testando",
	      likes: 0
    });

    const projects = response.data;

    setProjects([...project, projects]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setProjects(project.filter(projects => projects.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {project.map(project => 
        <li key={project.id}>  
          {project.title} 
          
          <button onClick={() => handleRemoveRepository(project.id)}>  
            Remover
          </button>
        
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
