#  Descubra jogos gratuitos

Você gosta de procurar jogos gratuitos?

Então está no lugar certo! Descubra novos jogos com este projeto. Ele foi desenvolvido usando React,
com responsividade para dispositivos móveis e computadores, incluindo tratamento de erros 
provenientes das requisições e notificações para o usuário.

# Tecnologias

- React
- Firebase 

## Demonstracão Computador e Mobile
![App Screenshot](https://github.com/LucasDevSystem/react-mui-axios-demo/blob/main/public/site_computador.png?raw=true)  
![App Screenshot](https://github.com/LucasDevSystem/react-mui-axios-demo/blob/main/public/site_dispositivo_movel.png?raw=true)  


## Rodando o Projeto   
Clone o projeto

~~~bash  
  git clone https://github.com/LucasDevSystem/free-games.git
~~~

Va para o diretorio do projeto 

~~~bash  
  cd react-mui-axios-demo
~~~

Instale as dependencias

~~~bash  
npm install
~~~

Va ate o arquivo .env e configure a api de jogos
para saber mais visite: https://rapidapi.com/digiwalls/api/free-to-play-games-database

~~~bash  
REACT_APP_API_URL=link da api
REACT_APP_API_KEY= chave da api
REACT_APP_API_HOST= host da api
~~~

No mesmo arquivo .env configure o firebase
para saber mais visite: https://firebase.google.com/docs/web/setup

~~~bash  
 
REACT_APP_FIREBASE_API_KEY= firebase api key
REACT_APP_FIREBASE_AUTH_DOMAIN= dominio
REACT_APP_FIREBASE_DATABASE_URL= url do realtime database
REACT_APP_FIREBASE_PROJECT_ID= id do projeto
~~~

Inicie o projeto localmente

~~~bash  
npm start
~~~
