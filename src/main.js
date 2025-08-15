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
        sessionStorage.setItem('authenticated', 'true');
        
        // 1秒後にhome.htmlに遷移
        setTimeout(() => {
          window.location.href = '/home.html';
        }, 1000);
        
      } else {
        messageDiv.innerHTML = `<p style="color: red;">${result.message}</p>`;
      }
    } catch (error) {
      messageDiv.innerHTML = `<p style="color: red;">エラーが発生しました</p>`;
      console.error('認証エラー:', error);
    }
  });
});