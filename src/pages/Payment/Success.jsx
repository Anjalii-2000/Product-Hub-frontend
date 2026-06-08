import { useNavigate } from 'react-router-dom';

export default function Success() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Successful
                </h1>
                <p className="text-gray-600">
                    Thank you for your purchase! Your payment was successful.
                </p>
                <button
                    onClick={() => navigate('/dashboard/customer')}
                    className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg
                     hover:bg-green-600 transition">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}
