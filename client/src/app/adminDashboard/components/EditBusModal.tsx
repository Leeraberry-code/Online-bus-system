import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bus } from '../../../lib/types';

interface EditBusModalProps {
    isOpen: boolean;
    onClose: () => void;
    bus: Bus;
    onUpdate: (updatedBus: Bus) => void;
}

const EditBusModal: React.FC<EditBusModalProps> = ({ isOpen, onClose, bus, onUpdate }) => {
    const [busId, setBusId] = useState<number>(0);
    const [routeId, setRouteId] = useState<number>(0);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        if (bus) {
            setBusId(bus.Bus_ID);
            setRouteId(bus.Route_ID);
            setStatus(bus.Bus_SpaceStatus);
        }
    }, [bus]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!busId) {
            console.error("Bus ID is missing or undefined.");
            return;  // Early return if busId is missing
        }

        // Prepare the update object
        const updateData: any = {};
        if (routeId !== bus.Route_ID) {
            updateData.Route_ID = routeId;
        }
        if (status !== bus.Bus_SpaceStatus) {
            updateData.Bus_SpaceStatus = status;
        }

        // Only send the update request if there are changes
        if (Object.keys(updateData).length > 0) {
            try {
                const response = await axios.put(`http://localhost:5000/bus/buses/${busId}`, updateData);
                onUpdate(response.data); // Call the onUpdate function with the updated bus data
                onClose(); // Close the modal after updating
            } catch (error) {
                console.error("Error updating bus:", error);
            }
        } else {
            console.log("No changes detected, not sending update.");
            onClose(); // Close the modal if no changes
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center">Edit Bus</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Bus ID</label>
                        <input
                            type="number"
                            value={busId}
                            onChange={(e) => setBusId(Number(e.target.value))}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Route ID</label>
                        <input
                            type="number"
                            value={routeId}
                            onChange={(e) => setRouteId(Number(e.target.value))}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3"
                        >
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="button" onClick={onClose} className="mr-4 bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBusModal;
