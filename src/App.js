import api from './services/api';
import React from "react";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get('/repositories').then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    try {
      const result = await api.post('/repositories', {
        url: "https://github.com/luishenrique",
        title: `Desafio ReactJS ${Date.now()}`,
        techs: ["ReactJS", "Node.js"],
      });

      const repository = result.data;
      setRepositories([...repositories, repository]);

    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const repository = await api.delete(`/repositories/${id}`);

      if (repository.status === 204)
        setRepositories(repositories.filter(r => r.id !== id));
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(({ title, id }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
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
