import React, {useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Table from './table';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';
import * as stock from '../../actions/stock';
import { bindActionCreators } from 'redux';
import {Client} from '@stomp/stompjs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 700,
    },
    media: {
      height: 100,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    section2: {
      margin: theme.spacing(2),
    },
  }),
);

const nowTime = () => {
  var time = new Date();
  return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}

function StockDetail(prop) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  let {match, selectedStocks, stockDetail, actionStockDetailData, actionSelectStockData} = prop;

  function handleExpandClick(){
    setExpanded(!expanded);
  }

  //마운트시 실행
  useEffect(() => {
    const client = new Client();

    let subscription;
    client.configure({
      brokerURL: 'ws://localhost:9000/stockDetail/websocket',
      onConnect: () => {
        console.log('onConnect');

        subscription = client.subscribe('/topic/stockDetail', message => {
          console.log('/topic/stockDetail:' + message);
          var bodyMsg = JSON.parse(message.body);
          console.dir(bodyMsg);
          if (bodyMsg.payload != undefined){
            console.log('receive stockDetail###:' + bodyMsg.payload);
            return;
          }
          var stockData = new Array();
          bodyMsg.forEach((element, idx) => {
            const {title, nowPrice, time, differAmt} = element;
            var stockObj = { // ES6 의 object-shorthand 기법
              title,
              nowPrice,
              time,
              differAmt
            }

            stockData.push(stockObj);
          })


          selectedStocks.time = nowTime();
          actionSelectStockData(selectedStocks);
          actionStockDetailData(stockData);
        })

        console.dir(selectedStocks);

        client.publish({destination: "/app/setStockDetail", body:selectedStocks.stockCd});
      },
      // Helps during debugging, remove in production
      debug: (str) => {
        console.log(new Date(), str);
      }
    });

    client.activate();

    return ()=>{
      if (subscription != undefined){
        subscription.unsubscribe();
      }
    }; //언마운트 될때 정리할 함수
  },[]);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            상세
          </Avatar>
        }
        action={
          <IconButton aria-label="Settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={"상세내역"}
        subheader={selectedStocks.time}
      >
      </CardHeader>

      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {selectedStocks.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {selectedStocks.nowPrice}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="flex-start">
          <Grid item xs={4}>
            <Typography gutterBottom variant="h4">
              "여긴 그래프를 할까?"
            </Typography>
          </Grid>
          <Grid item xs={8}> {/* 12까지의 비율로 구성되며, xs는 가로폭에 의한 디바이스 기준임*/}
            <Table stockDetail={stockDetail}/>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
      selectedStocks : state.selectedStocks,
      stockDetail : state.stockDetail,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
                            actionSelectStockData: stock.actionSelectStockData,
                            actionStockDetailData : stock.actionStockDetailData,
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail);
