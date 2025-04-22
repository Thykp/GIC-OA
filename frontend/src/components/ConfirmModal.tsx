import { Modal } from 'antd';

export default function ConfirmModal({
  visible,
  onConfirm,
  onCancel,
  title,
}: {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}) {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
    />
  );
}