import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
	width?: number | 0;
	height?: number | 0;
}

const Spacing = (props: Props) => {
	return (
		<View style={{height: props.height, width: props.width}} />
	);
};

export default Spacing;

const styles = StyleSheet.create({});
