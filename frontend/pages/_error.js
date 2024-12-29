function Error({ statusCode }) {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
        <p className="text-gray-700 mb-6">
          We apologize for the inconvenience. Please try again later.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 