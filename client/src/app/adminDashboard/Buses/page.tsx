"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bus, Route } from "../../../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import EditBusModal from "../components/EditBusModal";

const BusManagement: React.FC = () => {
    const baseUrl = "http://localhost:5000";
    const [buses, setBuses] = useState<Bus[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showAddBusForm, setShowAddBusForm] = useState<boolean>(false);
    const [newBus, setNewBus] = useState<Bus>({
        Bus_ID: 0,
        Route_ID: 0,
        Route_Name: "",
        Admin_ID: 1,
        Bus_SpaceStatus: "Available",
        Bus_Time: "",
        Bus_Slot: "Morning",
        PickUp_time: "",
        DropOff_time: "",
    });
    const [routes, setRoutes] = useState<Route[]>([]);

    const fetchBuses = async () => {
        try {
            const response = await axios.get(`${baseUrl}/bus/buses`);
            if (response.status !== 200) throw new Error("Failed to fetch bus data");
            setBuses(response.data || []);
        } catch (error) {
            setError("Failed to fetch bus data.");
        } finally {
            setLoading(false);
        }
    };

    const fetchRoutes = async () => {
        try {
            const response = await axios.get(`${baseUrl}/route/routes`);
            if (response.status !== 200) {
                throw new Error("Failed to fetch route data");
            }
            setRoutes(response.data || []);
        } catch (error) {
            setError("Failed to fetch route data.");
        }
    };

    useEffect(() => {
        fetchBuses();
        fetchRoutes();
    }, []);

    const handleRowClick = (bus: Bus) => {
        console.log(bus); // Check the bus object to ensure it's complete
        setSelectedBus(bus);
        setIsModalOpen(true);
    };

    const handleUpdate = async (updatedBus: Bus) => {
        try {
            await axios.put(`${baseUrl}/bus/buses/${updatedBus.Bus_ID}`, updatedBus);
            // await fetchBuses(); // Reload buses after update
        } catch (error) {
            setError("Failed to update bus.");
        }
    };

    const handleDelete = async (busId: number) => {
        try {
            await axios.delete(`${baseUrl}/bus/buses/${busId}`);
            setBuses((prev) => prev.filter((bus) => bus.Bus_ID !== busId));
        } catch (error) {
            setError("Failed to delete bus.");
        }
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/bus/buses`, newBus);
            await fetchBuses(); // Reload buses after creation
            setNewBus({
                Bus_ID: 0,
                Route_ID: 0,
                Route_Name: "",
                Admin_ID: 1,
                Bus_SpaceStatus: "Available",
                Bus_Time: "",
                Bus_Slot: "Morning",
                PickUp_time: "",
                DropOff_time: "",
            });
            setShowAddBusForm(false); // Hide form after successful creation
        } catch (error) {
            setError("Failed to create bus.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6">
            <button
                onClick={() => setShowAddBusForm(!showAddBusForm)}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                {showAddBusForm ? "Cancel" : "Add Bus"}
            </button>
            {showAddBusForm && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Add Bus</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bus Number</label>
                                <input
                                    type="number"
                                    placeholder="Bus Number"
                                    value={newBus.Bus_ID}
                                    onChange={(e) => setNewBus({ ...newBus, Bus_ID: parseInt(e.target.value, 10) })}
                                    required
                                    className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Route</label>
                                <select
                                    value={newBus.Route_Name}
                                    onChange={(e) => {
                                        const selectedRoute = routes.find(route => route.Route_Name === e.target.value);
                                        setNewBus({ 
                                            ...newBus, 
                                            Route_ID: selectedRoute ? selectedRoute.Route_ID : 0, 
                                            Route_Name: e.target.value 
                                        });
                                    }}
                                    className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3"
                                >
                                    <option value="">Select Route</option>
                                    {routes.map(route => (
                                        <option key={route.Route_ID} value={route.Route_Name}>{route.Route_Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pick Up Time</label>
                                <input
                                    type="text"
                                    placeholder="Pick Up Time"
                                    value={newBus.PickUp_time}
                                    onChange={(e) => setNewBus({ ...newBus, PickUp_time: e.target.value })}
                                    required
                                    className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Drop Off Time</label>
                                <input
                                    type="text"
                                    placeholder="Drop Off Time"
                                    value={newBus.DropOff_time}
                                    onChange={(e) => setNewBus({ ...newBus, DropOff_time: e.target.value })}
                                    required
                                    className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={newBus.Bus_SpaceStatus}
                                    onChange={(e) => setNewBus({ ...newBus, Bus_SpaceStatus: e.target.value })}
                                    className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm p-3"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Not Available">Not Available</option>
                                </select>
                            </div>
                            <button type="submit" className="mt-4 col-span-full bg-blue-500 text-white p-2 rounded">
                                Add Bus
                            </button>
                        </form>
                    </CardContent>
                </Card>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buses.map((bus) => (
                    <div key={bus.Bus_ID} className="bg-white p-6 rounded-lg shadow card-hover">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Bus #{bus.Bus_ID}</h3>
                            <span className="text-sm font-medium text-gray-500">seats</span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-500">
                            <p>Route: {routes[bus.Route_ID] ? routes[bus.Route_ID].Route_Name : "Loading..."}</p>
                            <p>Pick-up: {bus.PickUp_time}</p>
                            <p>Drop-off: {bus.DropOff_time}</p>
                            <p className="font-medium">
                                Status:{" "}
                                <span className={bus.Bus_SpaceStatus === "Available" ? "text-green-600" : "text-red-600"}>
                                    {bus.Bus_SpaceStatus}
                                </span>
                            </p>
                        </div>
                        <div className="mt-4">
                            <button onClick={() => handleRowClick(bus)} className="text-blue-500">Edit</button>
                            <button onClick={() => handleDelete(bus.Bus_ID)} className="text-red-500 ml-2">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedBus && (
                <EditBusModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    bus={selectedBus}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default BusManagement;
