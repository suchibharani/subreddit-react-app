import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadData } from '../actions/index'
import {bindActionCreators} from 'redux';

//importing styles
import styleSheet from '../static/scss/styles.scss'

// Import actions
import * as mapActions from '../actions';
class Index extends React.Component {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx

    if (!store.getState().placeholderData.length > 0) {
      store.dispatch(loadData())
    }

    return { isServer }
  }

  componentDidMount() {
      // this.props.actions.loadData();
  }

  render() {
    var props = this.props;
    
    return (
      <div className="index__container"> 
          <div className="container">
              
              {
                  props.placeholderData.map((item,index) => {
                    var isImage = item.data.thumbnail && item.data.thumbnail != "self" && item.data.thumbnail != "default";
                    return(
                      <div className="card m-b10 m-t10" key={index}>
                      <div className="row " >
                      {
                              isImage &&
                        <div className="col-3" >
                          
                            {/* {item.data.preview && item.data.preview.images && item.data.preview.images.length> 0 
                            && item.data.preview.images[0].resolutions && item.data.preview.images[0].resolutions.length > 2 
                            && item.data.preview.images[0].resolutions[1].url &&
                            
                            <img width="300" src={item.data.preview.images[0].resolutions[1].url}/>
                            } */}
                            
                              <img width="100%" src={item.data.thumbnail} className="img-rounded"/>
                            
                        </div>
                        }
                        <div className={isImage ? "col-9" : 'col-12'}> 
                            <div className="card-body">
                              <span className="author">Posted by : {item.data.author}</span>
                              <span className="author">Posted by : {item.data.author}</span>
                              <h5 className="card-title">{item.data.title}</h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                            </div>
                          </div>
                      </div>

                      </div>
                    )
                  })
                }
          </div>
          <style jsx>{styleSheet}</style>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    placeholderData : state.placeholderData,
  }
}


function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(
    mapActions, dispatch)}
}

Index.propTypes = {
  placeholderData: PropTypes.any,
};

export default connect(mapStateToProps,mapDispatchToProps)(Index)
