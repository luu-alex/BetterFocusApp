import * as React from 'react';
import { Appbar } from 'react-native-paper';
export const DEFAULT_APPBAR_HEIGHT = 56;

type Props = {
    navigation: any  };


export default class AppBar extends React.Component {
        render () {
            return (
            <Appbar.Header style={{ backgroundColor:  '#3b5998'}} >
                
                <Appbar.Content title={this.props.title}/>
            </Appbar.Header>
              
            )
        }
        
    
}