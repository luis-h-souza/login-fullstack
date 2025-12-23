(function () {
  const form = document.getElementById('loginForm');
  const btn = document.getElementById('submitBtn');

  function updateButton() {
    btn.disabled = !form.checkValidity();
  }

  // estado inicial
  updateButton();

  form.addEventListener('input', updateButton);
  form.addEventListener('change', updateButton);

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtnText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const data = {
      email: form.email.value.trim(),
      password: form.password.value
    };

    function showFormMessage(text, type = 'info') {
      const actions = form.querySelector('.my-form__actions');
      actions.textContent = '';
      const div = document.createElement('div');
      div.className = 'form-message ' + type;
      div.textContent = text;
      actions.appendChild(div);
      setTimeout(() => {
        if (actions.contains(div)) actions.removeChild(div);
      }, 5000);
    }

    try {
      const res = await fetch('/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        // cadastro realizado com sucesso -> volta para index
        window.location.href = 'index.html';
        return;
      }

      let errMsg = 'Erro ao cadastrar. Tente novamente.';
      try {
        const err = await res.json();
        if (err && err.message) errMsg = err.message;
      } catch (err) {
        // sem corpo JSON
      }

      showFormMessage(errMsg, 'error');
    } catch (err) {
      // Falha de rede / backend não disponível: faz fallback local
      console.warn('Falha ao contatar backend:', err);
      localStorage.setItem('pendingCadastro', JSON.stringify(data));
      showFormMessage('Backend indisponível — dados salvos localmente.', 'warning');
      setTimeout(() => window.location.href = 'index.html', 1200);
    } finally {
      btn.disabled = false;
      btn.textContent = submitBtnText;
    }
  });
})();
