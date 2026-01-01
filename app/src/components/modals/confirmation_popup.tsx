import * as React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

const DeletionConfirmationDialog: React.FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
  title = 'Warning',
  message = 'Are you sure you want to delete this item?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>
            <Text>{cancelLabel}</Text>
          </Button>
          <Button onPress={onConfirm}>
            <Text>{confirmLabel}</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeletionConfirmationDialog;
