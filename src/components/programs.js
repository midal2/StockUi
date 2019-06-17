import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';
import selectProgram from '../actions/index';
import { bindActionCreators } from 'redux';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    height: 450,
    width: 500,
    overflowY: 'auto',
  },
};

class Programs extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          cols={2}
          style={styles.gridList}
        >
          {this.props.programs.map((tile) => (
            <GridTile
              key={tile.img}
              title={tile.title}
              subtitle={<span>by <b>{tile.author}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              actionPosition="left"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"

              onClick={()=>this.props.selectProgram(tile)}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({selectProgram:selectProgram}, dispatch);
}

function mapStateToProps(state){
  return {
    programs : state.programs
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
