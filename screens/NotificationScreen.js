import React, { Component } from 'react';
import {  View, FlatList,Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    };

    this.notificationRef = null
  }

  getNotifications=()=>{
    console.log(this.state.userId)
    this.notificationRef = db.collection("all_notifications")
    .where("notification_status", "==", "unread")
    .where("targeted_user_id",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
      return (
        <ListItem
          key={index}
          title={item.item_name}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={item.message}
          bottomDivider
        />
      )
 }


  render(){
    return(
      <View >
        <View style={{flex:0.1}}>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
              <Flatlist allNotifications={this.state.allNotifications}/>
            )
          }
        </View>
      </View>
    )
  }
}
