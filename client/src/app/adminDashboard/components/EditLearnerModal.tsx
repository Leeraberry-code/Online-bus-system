import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditLearnerModal = ({ isOpen, onClose, learner, onUpdate }) => {
    const [status, setStatus] = useState('');
    const baseUrl = "http://localhost:5000";

    useEffect(() => {
        if (learner) {
            setStatus(learner.Status);
        }
    }, [learner]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}/learner/learners/${learner.Learner_ID}`, {
                Status: status,
            });
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.error("Error updating learner:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-2/3 lg:w-1/2 xl:w-1/3">
                <h2 className="text-2xl font-semibold mb-6 text-center text-yellow-500">Edit Learner</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Learner Name</label>
                        <input
                            type="text"
                            value={learner.Learner_Name}
                            readOnly
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3 text-lg bg-gray-100"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Current Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3 text-lg"
                        >
                            <option value="Accepted">Accepted</option>
                            <option value="Waitlisted">Waitlisted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 bg-gray-400 text-gray-800 px-5 py-3 rounded-lg font-semibold hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-yellow-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-yellow-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLearnerModal;
