export default function handler(req, res) {
  if (req.method === 'GET') {
    // Simulate fetching data from a database
    const products = [
      { id: 1, name: 'Espresso', price: 3.00, image: 'https://example.com/coffee1.jpg' },
      { id: 2, name: 'Latte', price: 4.00, image: 'https://example.com/coffee2.jpg' },
      { id: 3, name: 'Cappuccino', price: 4.50, image: 'https://example.com/coffee3.jpg' },
    ];
    res.status(200).json(products);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 