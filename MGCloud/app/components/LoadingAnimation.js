import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';


export default class LoadingAnimation extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {

        return (
            <View style={[styles.container,this.props.style]}>
                <Image
                       style={
                           {width:27,height:29,
                           }}
                       source={require('../static/img/loading.gif')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:27,
        height:27,
        overflow:'hidden',

    }
});

