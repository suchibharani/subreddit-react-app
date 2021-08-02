import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Link from 'next/link'
import moment from 'moment';

import SortCmp from '../components/sort'

import { loadData } from '../actions/index'
import {bindActionCreators} from 'redux';

//importing styles
import styleSheet from '../static/scss/styles.scss'

// Import actions
import * as mapActions from '../actions';
class Index extends React.Component {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx

    if (!store.getState().posts.length > 0) {
      store.dispatch(loadData())
    }

    return { isServer }
  }
  constructor(props) {
    super(props);
    this.sortFunc = this.sortFunc.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sort !== prevProps.sort) {
      this.props.actions.loadData();
    }
  }
  upVote(id){
    this.props.actions.upVote(id);
  }
  downVote(id){
    this.props.actions.downVote(id);
  }
  sortFunc(sort){
    this.props.actions.sortAction(sort);
  }
  loadMore(){
    this.props.actions.loadMore();
    
  }

  render() {
    var props = this.props;
    return (
      <div className="index__container" id="index__container" > 
          <div className="container">
              
              <SortCmp 
                  sortFunc={this.sortFunc}
                  sort={props.sort}
              />
              
              {
                  props.posts.map((item,index) => {
                    var createdDate = new Date(item.data.created * 1000);
                    var comments = (item.data.num_comments > 1) ? item.data.num_comments +" comments" :
                    item.data.num_comments + " commment"
                    
                    var isImage = item.data.thumbnail && item.data.thumbnail != "self" && item.data.thumbnail != "default";
                    return(
                      <div className="card m-b10 m-t10" key={index}>
                      <div className="row " >
                      {
                              isImage &&
                        <div className="col-3" >
                              <img width="100%" height="100%" src={item.data.thumbnail} className="img-thumbnail"/>
                            
                        </div>
                        }
                        <div className={isImage ? "col-7" : 'col'}> 
                            <div className="card-body">
                              <span className="author">Posted by  {item.data.author}</span>
                              <span className="author"> {moment(createdDate).fromNow()}</span>
                              <h5 className="card-title">
                              <Link as={'/post/'+item.data.id +'/'} href={'/post/'+item.data.id}>
                              <a>{item.data.title}</a>
                            </Link>
                            </h5>
                      
                             
                              <span><i className="far fa-comments"></i> {comments}</span>
                            </div>
                          </div>
                          <div className="col-2 text-center">
                          
                          <button disabled={item.upvoted}  className="btn btn-light btn-up" onClick={() => this.upVote(item.data.id)}><i className="fas fa-long-arrow-alt-up"></i> </button>
                          <p>{item.currentScore}</p>
                          <button disabled={item.downvoted}  className="btn btn-light btn-down"  onClick={() => this.downVote(item.data.id)}><i className="fas fa-long-arrow-alt-down"></i> </button>
                          </div>
                      </div>

                      </div>
                    )
                  })
                }
                <div className="row">
                  <div className="col-12 text-center">
                    {
                      props.isLoading &&
                      <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                    }
                    {
                      !props.isLoading &&
                      <button onClick={() => this.loadMore()} className="btn btn-dark">Load More</button>
                    }
                  
                  
                  </div>

                </div>
          </div>
          <style jsx>{styleSheet}</style>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    posts : state.posts,
    sort : state.sort,
    isLoading: state.isLoading
  }
}


function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(
    mapActions, dispatch)}
}

Index.propTypes = {
  posts: PropTypes.any,
  actions: PropTypes.any,
  sort: PropTypes.any,
  isLoading: PropTypes.any
};

export default connect(mapStateToProps,mapDispatchToProps)(Index)
