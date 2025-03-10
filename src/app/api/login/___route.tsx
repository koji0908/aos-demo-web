import { NextApiRequest, NextApiResponse } from 'next';

export async function POSfdfT(req: NextApiRequest, res: NextApiResponse) {
  console.log('---------------------------------' + res);
  if (req.method === 'OPTIONS') {
    // プリフライトリクエストに対して200を返す
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const url = 'http://localhost:8080/' + req.url;
    console.log(url);
    console.log(req.body);

    const apiResponse = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.body,
    }); // 例としてGoogleを使用
    const data = await apiResponse.text(); // ここではtextとしてレスポンスを取得
    console.log(data);

    return new Response(JSON.stringify({ message: 'CORS setup complete' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ message: 'InternalServerError!!!!' }), {
      status: 500,
    });
  }
}
