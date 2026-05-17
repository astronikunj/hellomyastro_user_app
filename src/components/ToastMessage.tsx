import Toast from 'react-native-simple-toast';

type Props = {
	message: string
}

const ToastMessage = (props: Props) => {
	return (
		Toast.show(props.message,Toast.LONG)
	)
}

export default ToastMessage