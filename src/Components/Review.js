import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//material-ui 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const styles={
        card:{
            display:'flex',
            marginBottom:20
        },
        image:{
            minWidth:200
        },
        content:{

            padding:25,
            objectFit:'cover'
        }


}


class Review extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {classes,scream:{body,userHandle,createdAt}}=this.props;
        return (
            <div>
           
           <Card className={classes.Card}> 
               <CardMedia  image='https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg' 
                    title="profile image"/>
                    <CardContent className={classes.content}>
                    
                        <Typography variant="h5" color="primary">
                        {userHandle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                         {body}
                        </Typography>
                       
                    </CardContent>
           </Card>
           </div>
        )
    }
}

export default withStyles(styles)(Review);