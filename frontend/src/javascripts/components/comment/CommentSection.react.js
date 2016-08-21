import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// notee
import CommentStore from '../../stores/CommentStore';
import CommentTable from './CommentTable.react';

export default class CommentSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
    }

    componentWillMount() {
        CommentStore.loadAllComments(this.ajaxLoaded);
    }

    ajaxLoaded(contents) {
        this.setState({comments: contents});
    }

    render() {
        return (
            <div id="list">
                <CommentTable comments={this.state.comments} />
            </div>
        );
    }
}