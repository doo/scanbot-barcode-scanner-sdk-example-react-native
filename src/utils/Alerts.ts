import {Alert} from 'react-native';

/**
 * An alert that displays an error message when an unexpected event occurs
 * @param message - the message being displayed in the alert
 */
export function errorMessageAlert(message: string | undefined) {
  Alert.alert(
    'An unexpected error has occurred',
    message ?? '',
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
    ],
    {
      cancelable: true,
    },
  );
}

/**
 * An alert that displays a result message when a successful action is complete
 * @param message - the message being displayed in the alert
 */
export function resultMessageAlert(message?: string) {
  Alert.alert(
    'Result',
    message,
    [
      {
        text: 'Close',
        style: 'cancel',
        onPress: () => {},
      },
    ],
    {
      cancelable: true,
    },
  );
}

/**
 * An alert that displays an info message
 * @param message - the message being displayed in the alert
 */
export function infoMessageAlert(message: string) {
  Alert.alert(
    'Info message',
    message,
    [
      {
        text: 'Close',
        style: 'cancel',
        onPress: () => {},
      },
    ],
    {
      cancelable: true,
    },
  );
}

export function deleteConfirmationAlert(
  title: string,
  message: string | undefined,
  onDelete: () => void,
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Close',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        style: 'default',
        onPress: onDelete,
      },
    ],
    {
      cancelable: true,
    },
  );
}
