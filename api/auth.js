export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { username, password } = req.body;
    
    // 環境変数から取得（完全にセキュア）
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
      return res.json({ success: true, message: '認証成功' });
    } else {
      return res.status(401).json({ success: false, message: '認証失敗' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}