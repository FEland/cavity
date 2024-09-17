import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';

const PopupContainer = tw.div`relative`;

const PopupContent = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const CloseButton = styled.button`
  ${tw`absolute text-gray-500 hover:text-gray-700`}
`;

const Card = styled.div`
  ${tw`p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer`}
`;

export default () => {

    const Popup = ({ isOpen, onClose, card}) => {
    useEffect(() => {
        const handleEscape = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
        };

        // if (isOpen) {
        //     window.addEventListener('keydown', handleKeyDown);
        // } else {
        //     window.removeEventListener('keydown', handleKeyDown);
        // }
        // return () => {
        // document.removeEventListener('keydown', handleEscape);
        // };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (

        // <PopupContainer>
        <PopupContent>
        <CloseButton onClick={onClose}>×</CloseButton>

        <h2>{card.name}</h2>
            <p>{card.Address_1}</p> 
        <button onClick={onClose}>Close</button>
        </PopupContent>
    // </PopupContainer>
    );
    };
};
