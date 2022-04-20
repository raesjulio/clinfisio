# Clinifisio
* **Front-end e Back-end**: NextJs 
* **Database**: Supabase

# Descrição

Aplicação tem como objetivo registra todas entradas e saidas dos valores, tendo um filtro de dias, mês e semana e controle de acesso por autenticação de email e senha.

# Instalação

## Instalação das dependências
```
yarn install
```

## Configução das variveis ambientes

Crie um arquivo `.env` na raiz do projeto e adicione:
```
NEXT_PUBLIC_SUPABASE_URL=LINK DA SUA DATABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=CHAVE ANON
NEXT_PUBLIC_AXIOS_API_URL=ENDEREÇO DA APLICAÇÃO/api Ex:(http://localhost:3000/api)
```

## Configurações do supabase

### TABELA
>tabela pra inserção dos valores
```
CREATE TABLE transation (
    id int primary key,
    title text,
    price int,
    description varchar,
    type boolean,
    created_at timestamp
);
```
### FUNÇÕES
>Filtro por mês
```
create or replace function getlistmonth( mes integer) 
returns setof transation
as $$
 
  select * from transation where  extract(month from created_at) = mes
$$
language sql
```
>Filtro por dia
```
create or replace function getlistday( dia integer) 
returns setof transation
as $$

  select * from transation where  extract(month from created_at) = dia
$$
language sql
```
>Filtro por semana
```
create or replace function getlistperiodo( inicio text, fim text) 
returns setof transation
as $$
 select * from transation where (Date(created_at) >=Date($1)) and (Date(created_at) <=Date($2))
$$
language sql
```

### USUARIO PARA LOGIN
>Dentro do arquivo `index.tsx` adicione o cogigo abixo para criar seu usuario para fazer login na aplicação
```
 const { user, session, error } = await supabase.auth.signUp({
    email: 'example@email.com',
    password: 'example-password',
})
``` 
>Depois de executar uma unica vez, remova 
>e confirme seu email



Iniciar a aplicação em `http://localhost:3000/`
```
yarn dev
```

# Tecnologias utilizadas
* [TypeScript](https://www.typescriptlang.org/);
* [ReactJs](https://pt-br.reactjs.org/);
* [NextJs](https://nextjs.org/);
* [Axios](https://axios-http.com/);
* [React-Query](https://react-query.tanstack.com/);
* [Sass](https://sass-lang.com/);
* [Supabase](https://supabase.com/);

# Demostração  

