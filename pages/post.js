import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment';
// import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import { loadPost } from '../actions/index'
import {bindActionCreators} from 'redux';

//importing styles
import styleSheet from '../static/scss/styles.scss'

// Import actions
import * as mapActions from '../actions';
class Post extends React.Component {
  static async getInitialProps(props) {
    const { store, isServer, query } = props.ctx;
    if (query && query.id != "") {
      store.dispatch(loadPost(query.id))
    }

    return { isServer, query }
  }

  componentDidMount() {
      // this.props.actions.loadData();
  }

  render() {
    var props = this.props;
    var post = props.selectedPost[0].data;
    let html = (post.selftext_html);
    var createdDate = new Date(post.created * 1000);
    html = (post.selftext_html) ? html.replace("&lt;!-- SC_OFF --&gt;", "").replace("&lt;!-- SC_ON --&gt;", "") : "";
    html =  ReactHtmlParser(html);

    const Description = () => <div dangerouslySetInnerHTML={{ __html: html }} />;
    var isImage = post.thumbnail && post.thumbnail != "self" && post.thumbnail != "default";
    var isHighResAvailable = post.preview && post.preview.images && post.preview.images.length > 0 && post.preview.images[0].source.url;
    var comments = (post.num_comments > 1) ? post.num_comments +" comments" :
            post.num_comments + " commment"
    return (
      <div className="index__container"> 
          <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2>{post.title}</h2>
                    <p className="m-b10"> 
                      <span className="author">Posted by  {post.author}</span>
                      <span className="author"> {moment(createdDate).fromNow()}</span>
                    </p>
                    <p>
                    <span><i className="far fa-comments"></i> {comments}  | </span>
                    <span><i className="fas fa-long-arrow-alt-up"></i> up vote count : {post.ups}  | </span>
                    <span><i className="fas fa-long-arrow-alt-down"></i> down vote count : {post.downs}</span>
                    </p>
                    <hr />
                    { isImage && !isHighResAvailable &&
                        <div>

                          <img width={post.thumbnail_width} height={post.thumbnail_height} src={post.thumbnail} />
                        </div>
                    }
                    {
                      isHighResAvailable &&
                      <img width="100%" src={ReactHtmlParser(post.preview.images[0].source.url)} />
                    }
                    {
                      html &&
                      <div className="m-t10">
                          <Description />
                      </div>
                    }

                    <hr />
                    
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
    selectedPost : state.selectedPost,
  }
}


function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(
    mapActions, dispatch)}
}

Post.propTypes = {
  selectedPost: PropTypes.any,
};

export default connect(mapStateToProps,mapDispatchToProps)(Post)
