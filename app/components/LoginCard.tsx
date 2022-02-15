import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import CButton from './CButton'

interface LoginCardProps {
	message: string;
	func: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ message, func }) => {
	return (
		<View style={styles.outerContainer}>
			<View style={styles.innerContainer}>
				<Text style={styles.message}>{message}</Text>
				<CButton
					customContainerStyle={styles.OKbutton}
					customTextStyle={styles.btnText}
					onPress={() => func()}
				>OK</CButton>
			</View>
		</View>
	);
}
export default LoginCard;

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
	},
	innerContainer: {
		width: '80%',
		height: '20%',
		backgroundColor: 'steelblue',
		borderWidth: 3,
		borderRadius: 30,
		borderColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	message: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
		textAlign: "center",
		marginHorizontal: '5%',
	},
	OKbutton: {
		marginTop: '5%',
		alignItems: 'center',
		width: '30%',
		height: '30%',
		backgroundColor: 'powderblue',
		borderRadius: 30,
	},
	btnText: {
		fontWeight: 'bold',
		color: 'steelblue'
	},
})