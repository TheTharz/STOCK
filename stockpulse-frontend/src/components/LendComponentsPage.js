import React, { useState } from 'react';
import './LendComponentsPage.css';
import { FaSearch, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Header from './Header';
import LendingRequestModal from './LendingRequest';
import { useNavigate } from 'react-router-dom';
import { useGetLendingsQuery, useAddLendingMutation } from '../services/api';

const LendComponentsPage = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const { data: lendings, refetch } = useGetLendingsQuery();
    const [addLending] = useAddLendingMutation();
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleCancelClick = () => {
        navigate('/dashboard');
    };

    const handleAddLending = async (lending) => {
        try {
            await addLending(lending).unwrap();
            alert('Lending added successfully!');
            refetch(); // Refresh the lending list
            setModalVisible(false);
        } catch (error) {
            console.error('Failed to add lending:', error);
            alert('Failed to add lending');
        }
    };

    return (
        <div className="lend-components-page">
            <Header title="Components" titlePrefix="Lend" />
            <div className="content">
                <div className="search-sort-bar">
                    <input type="text" placeholder="Search here" className="search-input" />
                    <FaSearch className="search-icon" />
                    <button className="sort-button">Sort By</button>
                </div>

                <table className="components-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Stock ID</th>
                            <th>Borrower ID</th>
                            <th>Borrowed Date</th>
                            <th>Due Date</th>
                            <th>Notes</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lendings?.map((lending) => (
                            <tr key={lending._id}>
                                <td><input type="checkbox" /></td>
                                <td>{lending.stockID}</td>
                                <td>{lending.borrowerID}</td>
                                <td>{new Date(lending.borrowedDate).toLocaleDateString()}</td>
                                <td>{new Date(lending.dueDate).toLocaleDateString()}</td>
                                <td>{lending.notes}</td>
                                <td>
                                    {lending.status === 'Completed' && <FaCheckCircle className="status-icon completed" />}
                                    {lending.status === 'Pending' && <FaExclamationTriangle className="status-icon pending" />}
                                    {lending.status === 'Error' && <FaTimesCircle className="status-icon error" />}
                                    {lending.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="action-buttons">
                    <button className="add-btn" onClick={handleAddButtonClick}>Add Lending Component</button>
                    <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>

            <LendingRequestModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onSave={handleAddLending} // Pass the handleAddLending function to the modal
            />
        </div>
    );
};

export default LendComponentsPage;
