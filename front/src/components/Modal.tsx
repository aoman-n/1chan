import React from 'react'
import { Modal } from 'semantic-ui-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  Content: React.ReactNode
}

const ModalModalExample: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  Content
}) => (
  <Modal size="small" open={open} onClose={onClose}>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>{Content}</Modal.Content>
  </Modal>
)

export default ModalModalExample
