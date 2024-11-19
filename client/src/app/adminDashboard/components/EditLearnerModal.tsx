import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Student } from '../../../lib/types'; // Import the Student type if it's defined in your types

interface EditLearnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    learner: Student; // Ensure the learner prop is of type Student
    onUpdate: (updatedLearner: Student) => void;
}

const EditLearnerModal: React.FC<EditLearnerModalProps> = ({ isOpen, onClose, learner, onUpdate }) => {
    const [status, setStatus] = useState<string>('');
    const [busId, setBusId] = useState<number | string>(''); 
    const [adminId, setAdminId] = useState<number | string>(''); 
    const [cellNo, setCellNo] = useState<string>('');
    const [grade, setGrade] = useState<number | string>('');
    const baseUrl = "http://localhost:5000";

    useEffect(() => {
        if (learner) {
            setStatus(learner.Status || '');
            setBusId(learner.Bus_ID || '');
            setAdminId(learner.Admin_ID || '');
            setCellNo(learner.Learner_CellNo || '');
            setGrade(learner.Learner_Grade || '');
        }
    }, [learner]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}/learner/learners/${learner.Learner_ID}`, {
                Status: status,
                Bus_ID: busId,
                Admin_ID: adminId,
                Learner_CellNo: cellNo,
                Learner_Grade: grade,
            });
            onUpdate(response.data);
            onClose();
        } catch (error) {
            console.log("Error updating learner:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-full w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-[90vh] overflow-auto">
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
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Bus ID</label>
                        <input
                            type="number"
                            value={busId}
                            onChange={(e) => setBusId(Number(e.target.value))}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3 text-lg"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Admin ID</label>
                        <input
                            type="number"
                            value={adminId}
                            onChange={(e) => setAdminId(Number(e.target.value))}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3 text-lg"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Cell Number</label>
                        <input
                            type="text"
                            value={cellNo}
                            onChange={(e) => setCellNo(e.target.value)}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3 text-lg"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Grade</label>
                        <input
                            type="number"
                            value={grade}
                            onChange={(e) => setGrade(Number(e.target.value))}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3 text-lg"
                        />
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
