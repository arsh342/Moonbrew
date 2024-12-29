import { useEffect, useState } from 'react';
import { seedMenuItems } from '../../utils/seedDatabase';

export default function SeedDatabase() {
  const [status, setStatus] = useState('');

  const handleSeed = async () => {
    try {
      setStatus('Seeding database...');
      await seedMenuItems();
      setStatus('Database seeded successfully!');
    } catch (error) {
      setStatus('Error seeding database: ' + error.message);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return <div>Not available in production</div>;
  }

  return (
    <div className="min-h-screen bg-cream-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Seed Database</h1>
        <button
          onClick={handleSeed}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Seed Menu Items
        </button>
        {status && (
          <p className="mt-4 p-4 bg-white rounded shadow">{status}</p>
        )}
      </div>
    </div>
  );
} 