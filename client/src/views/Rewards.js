

import { useState } from 'react';

function Rewards() {
    const [showModal, setShowModal] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);
    const rewards = [
        { id: 1, name: 'Free Juice Bottle', points: 100 },
        { id: 2, name: '1/2 Off Item <$25', points: 200 },
        { id: 3, name: 'Picture on Wall', points: 300 },
        { id: 4, name: 'Free Item <$25', points: 400}
    ];

    const handleEditReward = (reward) => {
        setSelectedReward(reward);
        setShowModal(true);
    };

    return (
        <>
            <div className={`relative sm:pl-8 md:pl-20`}>
            <div className="flex flex-col md:pt-4 pb-32 pt-12">
                <div className="md:pt-4 pb-16 sm:w-full">
                <h2 className="text-md text-left flex flex-auto text-stone-100  font-stock uppercase font-extrabold sm:text-md ">Create Reward</h2>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        {/* <h2 className="text-lg font-medium">Add Reward</h2> */}
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="points">
                                    Points
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="points"
                                    type="number"
                                    placeholder="Enter points"
                                />
                            </div>
                        </form>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowModal(false)}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <h2 className="text-md text-left flex flex-auto text-stone-100  font-stock uppercase font-extrabold sm:text-md ">Rewards</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-evenly">
                    {rewards.map((reward) => (
                        <div key={reward.id} className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-lg font-medium" style={{ backgroundColor: 'var(--bubble-bg-color)', color: 'var(--bubble-text-color)' }}>{reward.name}</h2>
                            <p className="text-gray-500">{reward.points} points</p>
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleEditReward(reward)}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h2 className="text-lg font-medium mb-4">Edit Reward</h2>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="Enter name"
                                            value={selectedReward.name}
                                            onChange={(e) =>
                                                setSelectedReward({ ...selectedReward, name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="points">
                                            Points
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="points"
                                            type="number"
                                            placeholder="Enter points"
                                            value={selectedReward.points}
                                            onChange={(e) =>
                                                setSelectedReward({ ...selectedReward, points: e.target.value })
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowModal(false)}
                                >
                                    Save
                                </button>
                                <button
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Rewards;


