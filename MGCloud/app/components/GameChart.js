import React, {Component} from 'react';
import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
} from'react-native';
import {Button } from 'native-base';
import Star from './Star'
const list = [
    require('../static/img/topic1_head.png'),
    require('../static/img/topic1_head.png'),
    require('../static/img/topic1_head.png')
]
export default class GameChart extends Component{
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(list),
        };
    }
    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
            >
                <View style={{backgroundColor:'#fff'}}>
                   <Image style={styles.img} source={require('../static/img/topic1_head.png')}></Image>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ListView
                horizontal={true}
                style={styles.row}
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionID, rowID, highlightRow)=>this._renderRow(rowData, sectionID, rowID, highlightRow)}
            />
        );
    }
}

const styles =StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    img:{
        height:116,
        width:207,
        margin:9,
        marginRight:0
    }
});

