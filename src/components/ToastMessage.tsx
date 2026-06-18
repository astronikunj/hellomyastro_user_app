import Toast from 'react-native-simple-toast';

type Props = {
	message: any
}

const ToastMessage = (props: Props) => {
	const finalMessage = typeof props.message === 'string' ? props.message : String(props.message || 'An error occurred');
	return (
		Toast.show(finalMessage, Toast.LONG)
	);
};

export default ToastMessage;
