export default function Cancel() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                <div className="text-red-500 text-6xl mb-4">✖</div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600">
                    Your payment was cancelled. Please try again.
                </p>

                <button className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    Try Again
                </button>
            </div>
        </div>
    );
}