import { X } from "lucide-react";

export default function LoginModal({ open, onClose, onLoginClick, onRegisterClick }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-[90%] max-w-md min-h-[350px] rounded-2xl shadow-2xl p-8 relative text-center animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
                >
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    Welcome 👋
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Login or create an account to continue
                </p>

                <button
                    onClick={onLoginClick}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg mb-3 font-medium hover:opacity-90 transition"
                >
                    Login
                </button>


                <button
                    onClick={onRegisterClick}
                    className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                    Register
                </button>
            </div>
        </div>
    );
}