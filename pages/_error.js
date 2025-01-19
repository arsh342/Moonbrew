function Error({ statusCode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-200 to-purple-400 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 12l4.95-4.95a3.5 3.5 0 00-4.95-4.95L12 7.172l-4.95-4.95a3.5 3.5 0 00-4.95 4.95L7.172 12l-4.95 4.95a3.5 3.5 0 004.95 4.95L12 16.828l4.95 4.95a3.5 3.5 0 004.95-4.95L16.828 12z"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {statusCode
            ? `Error ${statusCode}: Something went wrong`
            : 'Oops! Something went wrong'}
        </h1>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Our team has been notified. Please try again later or go back to the homepage.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-blue-600"
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
