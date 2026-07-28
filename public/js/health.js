document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const statusDiv = document.getElementById('status');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    if (statusDiv) statusDiv.textContent = 'Enviando...';

    // Collect form data into an object
    const fd = new FormData(form);
    const payload = {};
    fd.forEach((value, key) => { payload[key] = value; });

    try {
      const response = await fetch('http://localhost:5000/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        if (statusDiv) statusDiv.textContent = data.message || 'Sucesso';
        form.reset();
      } else {
        if (statusDiv) statusDiv.textContent = data.message || 'Erro no servidor';
      }
    } catch (err) {
      console.error(err);
      if (statusDiv) statusDiv.textContent = 'Erro de rede';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      setTimeout(() => { if (statusDiv) statusDiv.textContent = ''; }, 4000);
    }
  });
});
