import { Input, Modal, Space } from 'antd';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import Colors from 'utils/colors';

interface Props {
  buttonTitle: string;
  open: boolean;
  openCloseModal: () => void;
  confirmText: string | ReactNode;
  onConfirmModal: (reason?: string) => void;
  icon?: ReactNode;
  modalHeader?: string;
}

const { TextArea } = Input;

const ModalContent = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
`;

const ConfirmIcon = styled.span`
  margin-right: 10px;
  font-size: 20px;
`;

const DeleteWrapper = styled.div`
  margin-top: 10px;
`;

const DeleteTitle = styled.div`
  font-size: 12px;
  color: ${Colors.LIGHT_TEXT_COLOR};
  font-weight: normal;
  margin-bottom: 10px;
`;

const RejectErr = styled.span`
  color: ${Colors.DANGER};
  font-size: 12px;
  font-weight: normal;
  margin-top: 10px;
`;

const ModalConfirmText = styled.div`
  font-weight: normal;
  color: ${Colors.TEXT_COLOR};
  font-size: 14px;
`;

const ModalConfirmHeader = styled.div`
  font-size: 18px;
`;

const ConfirmModal = ({ buttonTitle, openCloseModal, open, confirmText, onConfirmModal, icon, modalHeader }: Props) => {
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState('');
  return (
    <Modal
      open={open}
      onOk={() => {
        if (buttonTitle === 'Decline' && !rejectReason) {
          setRejectError('Reject reason is required');
          return;
        }
        setRejectReason('');
        setRejectError('');
        onConfirmModal(rejectReason);
      }}
      onCancel={openCloseModal}
      okText={buttonTitle}
      cancelText="Cancel"
      closable={false}
      centered
    >
      <ModalContent>
        {modalHeader ? (
          <Space align="start" size={2}>
            <ConfirmIcon style={{ marginRight: 10, fontSize: 20 }}>{icon}</ConfirmIcon>{' '}
            <div>
              <ModalConfirmHeader>{modalHeader}</ModalConfirmHeader>
              <ModalConfirmText>Are you sure you want to {confirmText}?</ModalConfirmText>
            </div>
          </Space>
        ) : (
          <div>
            <ConfirmIcon style={{ marginRight: 10, fontSize: 20 }}>{icon}</ConfirmIcon> Are you sure you want to{' '}
            {confirmText}?
          </div>
        )}
        {buttonTitle === 'Decline' && (
          <DeleteWrapper>
            <DeleteTitle>
              {' '}
              Your Comments <span style={{ color: Colors.DANGER }}>*</span>
            </DeleteTitle>
            <TextArea
              value={rejectReason}
              onChange={e => {
                const val = e.target.value;
                if (val) {
                  setRejectError('');
                }
                setRejectReason(val);
              }}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            {rejectError && <RejectErr>{rejectError}</RejectErr>}
          </DeleteWrapper>
        )}
      </ModalContent>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  icon: null,
  modalHeader: ''
};

export default ConfirmModal;
