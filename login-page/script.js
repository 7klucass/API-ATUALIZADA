const loginButton = document.querySelector('#button-id');

if (loginButton) {
  loginButton.addEventListener('click', async () => {

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
       email, senha
      })
    });

    if (response.ok) {
      const result = await response.text();
      alert(result);
    } else {
      alert('Usuário ou senha inválidos!'); 
    }
  });
}