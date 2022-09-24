# Grau B
# Nome: Leonardo Telles de Brum
# 24/09/2022

Você foi chamado(a) para desenvolver um aplicativo de registro de prestação de contas. Neste projeto, você criará uma versão inicial do aplicativo, de acordo com o descrito abaixo:

1.	Crie um projeto no Ionic para o desenvolvimento do aplicativo. O template a ser utilizado é o “blank”, ou seja, apenas uma página em branco de início (tela inicial).

2.	Crie um objeto service/providerdo Ionic para manter os dados da aplicação na memória e de forma global à todas as páginas da aplicação.
-	No service, crie uma lista de usuários e um objeto de registro de prestação de contas, também defina uma variável para manter o usuário logado.
-	No construtor do service crie registros de usuários e coloque na lista de usuários. Pelo menos um usuário de cada perfil.
-	Do usuário é importante saber: id, nome, login e senha.

3.	A tela inicial deve ter dois campos de texto que compõe o login de acesso: username e password. Estes dois campos devem ser validados, ou seja, não podem aceitar strings vazias.
-	A validação (login) deve ser feita apenas memória, ou seja, a partir de uma lista de usuários cadastrados.
-	Após estes campos de texto, deve haver um botão (Entrar) para validar os dados do usuário (a validação deve ser realizada com logins de teste).
-	Após os dados estarem validados é necessário redirecionar o usuário logado para a tela que permite a funcionalidade de cada um.
-	Existem 2 perfis de usuários: Responsável financeiro e Colaborador.

4.	Crie mais duas telas / páginas para outras funcionalidades do sistema, uma para cada perfil:
-	O perfil do Responsável financeiro deve aprovar contas, portanto alterar o status de pendente para 'aprovado' ou 'refazer'.
-	O perfil Colaborador permite cadastrar uma nova prestação de contas ou alterar dados de uma. Um prestação de contas tem a identificação do usuário (id), um data de registro/modificação, um mês contábil (pode ser texto), um campo texto longo para descrição geral das contas e um status. O usuário pode alterar qualquer campo de uma prestação de contas que não está aprovada. Ele nunca pode modificar o status de uma prestação de contas. Todo registro cadastro entra com status 'pendente'. O cadastro e alteração de dados pode ser realizado na mesma tela ou como o programador achar melhor.
-	Considere que apenas uma prestação de contas está ativa no sistema. Portanto, mantenha uma variável para o registro de uma prestação de contas em memória.

5.	Emita mensagens adequadas de validação e resultado das operações.

6.	Deixe uma opção para fazer logout. Permitindo ao usuário retornar à tela de login.
Ao final, escreva na resposta desta prova a frase "Entreguei os arquivos da prova no Canvas", depois postar o seu projeto no Canvas e finalizar a prova.



Para execução do programa é necessário efetuar login como 'leonardo' e senha '123' para a visão de responsável financeiro ou login como 'ze' e senha '123' para visão de colaborador.

