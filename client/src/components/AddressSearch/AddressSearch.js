import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddressSearch = ({ onClose, onAddressSelect }) => {
  const [isAddressModalOpen, setAddressModalOpen] = useState(true);

  const handleAddressSelect = (data) => {
    const { zonecode, address, bname, buildingName } = data;
  
    const formattedBuildingName = `(${bname}, ${buildingName})`;
  
    // 주소 데이터를 부모 컴포넌트로 전달
    onAddressSelect({ zipcode: zonecode, basicAddress: address, extraAddress: formattedBuildingName });
  
    // 모달 닫기
    setAddressModalOpen(false);
    onClose();
  };
  
  return (
    <Modal show={isAddressModalOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>주소 검색</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '0', overflow: 'hidden' }}>
        <DaumPostcode onComplete={handleAddressSelect} autoClose animation style={{ width: '100%', height: '600px' }} />
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button variant="outline-light" onClick={onClose} className="border-0" style={{ fontSize: '18px', color: '#c6a8b4' }}> 닫기 </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressSearch;
