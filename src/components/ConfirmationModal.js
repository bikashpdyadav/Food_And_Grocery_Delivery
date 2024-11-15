const ConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl shadow-black max-w-sm w-full z-50">
                <h1 className="text-lg font-bold mb-4">Are you sure you want to clear the cart?</h1>
                <div className="flex justify-between">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white text-lg rounded hover:bg-red-700"
                    >
                        Yes, Clear Cart
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-black text-lg rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;