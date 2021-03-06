import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

export default class Title extends Component {
    render() {
        return (
           <Text style={styles.text}>{this.props.titleText}</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        fontFamily: 'Arial',
        fontWeight:"800",
        fontStyle: 'normal',
        fontSize: 15,
        color: '#333333',
        textAlign: 'center',
        alignSelf:'flex-start',

    }
});

