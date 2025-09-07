# Task Manager - Aplicação Full-Stack

Este é um projeto de portfólio que demonstra a construção de uma aplicação web completa (Full-Stack) para gerenciamento de tarefas. O sistema conta com uma API RESTful desenvolvida em **Java com Spring Boot** e um frontend interativo construído com **Next.js e TypeScript**.
https://github.com/guilhermeHcampos/sistema-de-tarefas-springboot-next.js/blob/main/README.md
## ✨ Funcionalidades

-   **Visualização de Tarefas:** Liste todas as tarefas existentes com seus respectivos status.
-   **Criação de Tarefas:** Adicione novas tarefas através de um formulário intuitivo.
-   **Edição de Tarefas:** Modifique o título e a descrição de uma tarefa já criada.
-   **Alteração de Status:** Mude o status de uma tarefa entre `TO_DO`, `IN_PROGRESS` e `DONE` diretamente na interface.
-   **Exclusão de Tarefas:** Remova tarefas que não são mais necessárias.
-   **Interface Reativa:** As atualizações na lista de tarefas acontecem em tempo real, sem a necessidade de recarregar a página.

## 🛠️ Tecnologias Utilizadas

### **Backend**

-   **Java 17+:** Linguagem de programação principal.
-   **Spring Boot:** Framework para criação da API RESTful.
-   **Spring Data JPA:** Para persistência de dados e comunicação com o banco.
-   **Maven:** Gerenciador de dependências.
-   **MySQL:** Banco de dados relacional para armazenamento das tarefas.

### **Frontend**

-   **Next.js:** Framework React para construção da interface.
-   **React:** Biblioteca para criação de componentes de UI.
-   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
-   **Tailwind CSS:** Framework de estilização para um design rápido e moderno.

## 🚀 Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo.

### **Pré-requisitos**

-   [Java JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) ou superior.
-   [Maven](https://maven.apache.org/download.cgi)
-   [Node.js](https://nodejs.org/en/) (que inclui o `npm`)
-   [MySQL](https://dev.mysql.com/downloads/mysql/) ou uma instância Docker do MySQL rodando.

### **1. Backend (API)**


 Clone o repositório
git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)

 Navegue até a pasta do backend
cd NOME_DO_REPOSITORIO/taskmanager # (Ajuste o caminho se necessário)

 Crie seu banco de dados no MySQL
 Ex: CREATE DATABASE taskmanager_db;

 Configure as variáveis de ambiente (veja a seção abaixo)

 Execute a aplicação
mvn spring-boot:run
O servidor da API estará rodando em http://localhost:8080

### **2. Frontend**


 Em um novo terminal, navegue até a pasta do frontend
cd ./frontendtaskmanager # (Ajuste o caminho se necessário)


 Instale as dependências 
npm install

 Execute o servidor de desenvolvimento
npm run dev

A aplicação estará acessível em http://localhost:3000.

### Configurações de ambiente

Para que o backend consiga se conectar ao banco de dados, é necessário configurar as seguintes variáveis de ambiente. A forma recomendada é através da configuração de execução da sua IDE (IntelliJ/VS Code).

DB_USER: O nome de usuário do seu banco de dados MySQL (ex: root).

DB_PASSWORD: A senha do seu banco de dados MySQL.
