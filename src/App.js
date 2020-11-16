import api from './services/api';
import React from "react";
import "./styles.css";

function App() {

  //Uso do Hook State para armazenar e redefinir os repositórios, em formato de Matriz
  const [repositories, setRepositories] = React.useState([]);

  /**
   * Uso do Hook Effect para consumir os serviços do back-end, a fim de obter a lista 
   * de repositórios existente na API, renderizando-a em tela
   */
  React.useEffect(() => {

    //Criação de função Assíncrona dentro do Hook Effect
    async function loadRepositories() {
      try {
        const response = await api.get('/repositories');
        setRepositories(response.data);
      } catch (err) {
        console.log("Erro", err);
      }
    };
    //Chamada da função Assíncrona
    loadRepositories();
  }, []);


  /**
   * Função criada para simular a criação e a adição de um objeto de repositório
   * na API, rendeizando a App Web em seguida, caso a inserção seja bem-sucedida
   */
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

  /**
   * Função criada para simular a deleção de um objeto de repositório
   * na API, rendeizando a App Web em seguida, caso a deleção seja bem-sucedida
   */
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

  // Conteúdo JSX apresentado ao usuário
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(r => (
          <li key={r['id']}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
};


export default App;
