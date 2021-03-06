import React, {Component, PropTypes} from 'react';

// actions
import PostActions from '../../actions/PostActions';

// stores
import PostStore from '../../stores/PostStore';
import CategoryStore from '../../stores/CategoryStore';
import UserStore from '../../stores/UserStore';

// components
import PostForm  from './PostForm.react.js';
import PostPreview  from './PostPreview.react.js';

// constants
import Constants from '../../constants/NoteeConstants';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';
import EventUtil from '../../utils/EventUtil';

export default class PostSectionEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: {
                title: "",
                content: "",
                slug: "",
                status: 0,
                category_id: "",
                thumbnail_id: "",
                user_id: "",
                seo_keyword: "",
                seo_description: "",
                secret_published_password: ""
            },
            categories: [],
            status: {},
            is_save: true,
            now_user: ""
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);
        this.ajaxStatusesLoaded = this.ajaxStatusesLoaded.bind(this);
        this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);

        // eventemit_callback for notee
        this.saveSuccessed = this.saveSuccessed.bind(this);
        this.updateSuccessed = this.updateSuccessed.bind(this);

        // eventemit_callback for category
        this.saveCategorySuccessed = this.saveCategorySuccessed.bind(this);

        // handles
        this.handleChange = this.handleChange.bind(this);
        this.saveContent = this.saveContent.bind(this);
    }

    componentWillMount() {
        if(this.props.params.id){
            PostStore.loadPost(this.props.params.id, this.ajaxLoaded);
            UserStore.loadUserByToken(this.ajaxNowUserLoaded);
        }
        PostStore.loadStatuses(this.ajaxStatusesLoaded);
        CategoryStore.loadCategories(this.ajaxCategoryLoaded);
    }

    componentDidMount() {
        EventUtil.addChangeListener(Constants.POST_CREATE, this.saveSuccessed);
        EventUtil.addChangeListener(Constants.POST_UPDATE, this.updateSuccessed);
        EventUtil.addChangeListener(Constants.CATEGORY_CREATE, this.saveCategorySuccessed);
    }

    componentWillUnmount(){
        EventUtil.removeChangeListener(Constants.POST_CREATE, this.saveSuccessed);
        EventUtil.removeChangeListener(Constants.POST_UPDATE, this.updateSuccessed);
        EventUtil.removeChangeListener(Constants.CATEGORY_CREATE, this.saveCategorySuccessed);
    }

    render() {
        if(this.props.params.id) {
            AuthorityUtil.checkAuthority("PostSectionEdit", this.state.now_user, this.state.content);
        }

        var style = {
            layout: {
                half: {
                    width: "50%",
                    maxWidth: "50%",
                    float: "left"
                }
            }
        }

        return (
            <div class="main">
                <PostForm
                    handleChange={this.handleChange}
                    content={this.state.content}
                    statuses={this.state.statuses}
                    categories={this.state.categories}
                    saveContent={this.saveContent}
                />
                <PostPreview
                    style={style.layout.half}
                    content={this.state.content}/>
            </div>
        );
    }

    handleChange(e, target){
        switch(target){
            case "title":
                this.state.content.title = e.target.value;
                break;
            case "content":
                this.state.content.content = e.target.value;
                break;
            case "slug":
                this.state.content.slug = e.target.value;
                break;
            case "status":
                this.state.content.status = e.target.value;
                break;
            case "secret_published_password":
                this.state.content.secret_published_password = e.target.value;
                break;
            case "category_id":
                this.state.content.category_id = e.target.value;
                break;
            case "thumbnail_id":
                this.state.content.thumbnail_id = e.target.value;
                break;
            case "seo_keyword":
                this.state.content.seo_keyword = e.target.value;
                break;
            case "seo_description":
                this.state.content.seo_description = e.target.value;
                break;
        }
        this.setState({ content: this.state.content });
    }

    saveContent(e){
        if(this.props.params.id){
            var item = {params_id: this.props.params.id, content: this.state.content}
            PostActions.update(item);
        }else{
            PostActions.create(this.state.content);
        }
    }

    saveSuccessed(){
        this.setState({is_save: true});
        history.replaceState('','','/notee/posts');
        location.reload();
    }

    updateSuccessed(){
        this.setState({is_save: true});
    }

    saveCategorySuccessed(){
        CategoryStore.loadCategories(this.ajaxCategoryLoaded);
    }

    // ajax
    ajaxLoaded(content){
        if(!content){return;}
        this.setState({
            content: {
                title: content.title,
                content: content.content,
                slug: content.slug,
                status: content.status,
                category_id: content.category_id,
                thumbnail_id: content.thumbnail_id,
                user_id: content.user_id,
                seo_keyword: content.seo_keyword,
                seo_description: content.seo_description,
                secret_published_password: content.secret_published_password
            }
        });
    }

    ajaxCategoryLoaded(content){
        if(!content){return;}
        this.setState({categories: content});
    }

    ajaxStatusesLoaded(content){
        if(!content){return;}
        this.setState({statuses: content});
    }

    ajaxNowUserLoaded(content) {
        this.setState({now_user: content});
    }

};
