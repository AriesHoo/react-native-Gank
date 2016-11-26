/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView, PixelRatio, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import px2dp from '../utils/px2dp';
import theme from '../constants/theme';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import WebView from './WebView';

export default class SimpleListView extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string
    };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.tabIcon = ['logo-android','logo-apple','logo-chrome', 'ios-film','ios-book'];
        this.tabColor = ['rgb(141,192,89)','#000','rgb(51,154,237)', 'rgb(154,53,172)','rgb(65,87,175)'];
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    //renderSeparator={this._renderSeparator.bind(this)}
                />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        if(Platform.OS === 'android') {
            return(
                <TouchableNativeFeedback
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}>
                    {this._renderRowContent(rowData)}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    {this._renderRowContent(rowData)}
                </TouchableHighlight>
            );
        }
    }

    _renderRowContent(rowData){
        return(
            <View style={styles.rowItem}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="md-happy"/><Text style={{fontSize: px2dp(10)}}> {rowData.who}</Text>
                </View>
                <Text style={styles.rowContent} numberOfLines={2}>{rowData.desc}</Text>
            </View>
        );
    }

    _renderHeader(){
        const headerTitle = this.props.headerTitle;
        return(
            <View style={styles.header}>
                <Avatar icon={this.tabIcon[this._judgeIconAttribute(headerTitle)]} width={px2dp(22)} backgroundColor={this.tabColor[this._judgeIconAttribute(headerTitle)]}/>
                <Text style={styles.headerLabel}>{this.props.headerTitle}</Text>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{backgroundColor: theme.segment.color, height: theme.segment.width}}/>
        );
    }

    _itemOnPress(rowData){
        this.props.navigator.push({
            component: WebView,
            args: {rowData: rowData}
        });
    }

    _judgeIconAttribute(hearderLabel){
        switch(hearderLabel){
            case 'Android':
                return 0;
            case 'iOS':
                return 1;
            case '前端':
                return 2;
            case '休息视频':
                return 3;
            case '扩展阅读':
                return 4;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width
    },
    header: {
        flexDirection: 'row',
        padding: px2dp(12),
        paddingLeft: px2dp(15),
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width
    },
    headerLabel: {
        color: '#000',
        fontSize: px2dp(20),
        marginLeft: px2dp(10),
        textShadowColor: 'rgba(0,0,0,.4)',
        textShadowOffset: {height: 6, width: 2},
        textShadowRadius: 17
    },
    rowItem: {
        backgroundColor: '#fff',
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15),
        justifyContent: 'center'
    },
    rowContent: {
        fontSize: px2dp(15),
        color: '#000'
    }
});