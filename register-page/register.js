const loginButton = document.querySelector('#button-id');

if (loginButton) {
  loginButton.addEventListener('click', async (event) => {
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senhaConfirm = document.getElementById('senhaConfirm').value;
    event.preventDefault();
    // Validações básicas
    if (!nome || !email || !senha || !senhaConfirm) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== senhaConfirm) {
      alert('As senhas não coincidem.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha, senhaConfirm }),
    });

    if (response.ok) {
      const result = await response.json(); // Assumindo que o backend retorna JSON
      alert(result.message || 'Registro bem-sucedido!');
    } else {
      const error = await response.json(); // Obter mensagem de erro
      alert(error.message || 'Erro no registro.');
    }
  });
}
