import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native';
import db from '../config';

export default class MyBartersScreen extends React.Component{
    constructor(){
        super()
        this.state = {
          BarterId : firebase.auth().currentUser.email,
          donorName : "",
          allBarters:[]
        }
    }
    allBarters =()=>{
        this.requestRef = db.collection("all_barters").where("barter_id" ,'==', this.state.barterId)
        .onSnapshot((snapshot)=>{
          var allBarters = []
          snapshot.docs.map((doc) =>{
            var barter = doc.data()
            barter["doc_id"] = doc.id
            allbarters.push(barter)
          });
          this.setState({
            allBarters : allBarters
          });
        })
      }
    
    render(){
          return(
              <View>
                  <TouchableOpacity onPress={()=>{this.allBarters()}}>
                      <Text>
                      exchange
                      </Text>
                      </TouchableOpacity>
              </View>
          )
          }
        }


    
