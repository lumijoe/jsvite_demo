document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const messageDiv = document.getElementById('message');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      
      const result = await response.json();
      
      if (result.success) {
        messageDiv.innerHTML = `<p style="color: green;">${result.message}</p>`;
        // 認証成功時の処理をここに追加
        sessionStorage.setItem('authenticated', 'true');
        location.reload(); // ページリロードまたは別ページに遷移
      } else {
        messageDiv.innerHTML = `<p style="color: red;">${result.message}</p>`;
      }
    } catch (error) {
      messageDiv.innerHTML = `<p style="color: red;">エラーが発生しました</p>`;
    }
  });
});