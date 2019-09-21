import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';

//material-ui 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import hotel from './hotel.jpg'

const styles={
card:{
    display:'flex',
    marginBotoom:20
},
image:{
    minWidth:200,
}


}


class Cover extends Component {
    render() {

        //const {classes}=this.props;
        return (
            <div>
            
           <Card>
               <CardMedia  image={hotel} 
                    title="Hotel Kamaro"/>
                    <CardContent>
                    <img alt="pic" src={hotel}/>
                        <Typography variant="h5" color="primary">
                         Hotel Kamaro
                        </Typography>
                        <Typography variant="h5">
                         No12A,Samaranayaka road ,Bandaragama
                        </Typography>
                       
                    </CardContent>
           </Card>
           </div>
        )
    }
}

export default withStyles(styles)(Cover);