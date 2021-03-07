import React, {Component, Fragment} from 'react';
import Quiz from './Quiz'
import Result from './Result'
import Loading from './Loading'
import BirthdayCalc from './BirthdayCalc'
import DualMbti from './DualMbti'
import StoryTelling from './StoryTelling'
import TESTS from '../api/TESTS'
import {BrowserRouter as Router, Redirect, Route, withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Helmet} from 'react-helmet';

class Intro extends Component {
    constructor(props){
        super(props)
        let _current_test = [];
        let i = 0;
        while (i<TESTS.length) {
            if(TESTS[i].info.mainUrl === this.props.test){
                _current_test = TESTS[i]
                break
            }
            i = i + 1
        }

        let _answer_type_obj = {};
        for(let k=0; k<_current_test.questions.length; k++) {
            for(let l=0; l<_current_test.questions[k].answers.length; l++){
                _answer_type_obj[_current_test.questions[k].answers[l].type] = 0;
            }
        }

        let _sharable_url = window.location.href
        if(window.location.href.slice(-1) === '/'){
            _sharable_url = window.location.href.slice(0, -1)
        } else {
            _sharable_url = window.location.href
        }

        let today = new Date();
        let month = String(today.getMonth() + 1)
        let date = String(today.getDate()).padStart(2, '0');
        let hour = String(today.getHours()).padStart(2, '0');
        let minute = String(today.getMinutes()).padStart(2, '0');

        this.state = {
            mode:'intro',
            current_test:_current_test,
            qAndA:_current_test.questions,
            scoreType:_current_test.info.scoreType,
            answer_type_obj:_answer_type_obj,
            quizNumber:0,
            counted_score:0,
            result_url:'/result/',
            quiz_url:_sharable_url,
            participants:(Number(month+date+hour+minute)*10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            num_shares_count:0,
        }
        this._onStartButtonClick = this._onStartButtonClick.bind(this);
        this._onMainButtonClick = this._onMainButtonClick.bind(this);
        this._onShareButtonClick = this._onShareButtonClick.bind(this);
    }

    componentDidMount(){
        if(this.state.quiz_url.includes("niair.xyz")){
            if(window) (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }


    _onStartButtonClick(){
        this.setState({
            mode:'quiz'
        })
    }

    _onMainButtonClick(){
        this.setState({
            mode:'main'
        })
    }

    _onShareButtonClick(){
        this.setState({
            num_shares_count:this.state.num_shares_count+1
        })
        alert("복사 완료! 링크를 공유해주세요.");
    }


    introPageRender(){

        let _mainTitle = this.state.current_test.info.mainTitle;
        let _subTitle = this.state.current_test.info.subTitle;
        let _thumbImage = this.state.current_test.info.mainImage;

        return (
            <div className="intro container">
                <Helmet>
                    <title>{this.state.current_test.info.mainTitle}-ALBA</title>
                    <meta name="title" content={this.state.current_test.info.mainTitle+'-by LeeLee'}/>
                    <meta name="description" content={this.state.current_test.info.subTitle} data-react-helmet="true"/>
                    <link rel="main-url" href={this.state.quiz_url}/>

                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content={this.state.quiz_url}/>
                    <meta property="og:title" content={this.state.current_test.info.mainTitle}/>
                    <meta property="og:description" content={this.state.current_test.info.subTitle}/>
                    <meta property="og:image" content={this.state.current_test.info.mainImage}/>
                    <meta property="og:image:alt" content={this.state.current_test.info.mainTitle} />

                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content={this.state.quiz_url}/>
                    <meta property="twitter:title" content={this.state.current_test.info.mainTitle}/>
                    <meta property="twitter:description" content={this.state.current_test.info.subTitle}/>
                    <meta property="twitter:image" content={this.state.current_test.info.mainImage}/>
                    <meta property="twitter:image:alt" content={this.state.current_test.info.mainTitle} />
                </Helmet>
                <img
                    className="intro-main-img"
                    onClick={this._onStartButtonClick}
                    src={_thumbImage}
                    alt={_mainTitle + '|' + _subTitle}/>


                <div className="test-intro-with-friend">
                    <CopyToClipboard text={this.state.quiz_url+'/'}>
                        <Button className="test-intro-with-friend-btn">
                            <h3
                                className="test-intro-with-friend-img"
                                onClick={this._onShareButtonClick}>
                                🔗 링크공유
                            </h3>
                        </Button>
                    </CopyToClipboard>
                </div>

            </div>
        );
    }

    resultCaculator(){
        if (this.state.scoreType === "numberScoring" || this.state.scoreType === "birthdayCalc" || this.state.scoreType === "storyTelling" || this.state.scoreType === "numberScoringImg" ){
            let final_score = this.state.counted_score;
            for (let k = 0; k < this.state.current_test.results.length; k++){
                if(this.state.current_test.results[k].score_range.includes(final_score)){
                    return this.state.current_test.results[k];
                }
            }
        } else if (this.state.scoreType === "typeCounting") {
            let final_result = this.state.answer_type_obj;

            let keys = Object.keys(final_result);
            let max = final_result[keys[0]];
            let max_keys = [];
            for (let z = 0 ; z < keys.length; z++) {
                let value = final_result[keys[z]];
                if (value > max) max = value
            }
            for (let key of keys) {
                if(final_result[key] === max) {

                    max_keys.push(key)
                }
            }
            for (let z=0;z<this.state.current_test.results.length;z++){
                if(max_keys[0] === this.state.current_test.results[z].type){
                    return this.state.current_test.results[z]
                }
            }
        } else if (this.state.scoreType === "typeCountingMBTI") {
            let final_result_obj = this.state.answer_type_obj;

            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
              }
            let _which_type_arr = [];
            for(let k=0; k<this.state.current_test.questions.length; k++) {
                _which_type_arr.push(this.state.current_test.questions[k].which);
            }
            _which_type_arr = _which_type_arr.filter(onlyUnique);

            let final_type = '';
            for(let i=0; i<_which_type_arr.length; i++){
                let first_type = _which_type_arr[i][0]
                let second_type = _which_type_arr[i][1]
                let type_arr = [first_type, second_type]
                let max_val = 0
                if(final_result_obj[first_type] !== final_result_obj[second_type]) {
                    max_val = Math.max(final_result_obj[first_type], final_result_obj[second_type])
                    type_arr.filter(item => final_result_obj[item] === max_val).forEach(item => final_type += item)
                } else {
                    final_type += type_arr[0]
                }

            }

            for (let z=0;z<this.state.current_test.results.length;z++){
                if(final_type === this.state.current_test.results[z].type){
                    return this.state.current_test.results[z]
                }
            }
        } else if (this.state.scoreType === "dualMBTI") {
            let final_type = this.state.counted_score;
            for (let k = 0; k < this.state.current_test.results.length; k++){
                if(this.state.current_test.results[k].type === final_type){
                    return this.state.current_test.results[k];
                }
            }
        }

    }
    quizPageRender(){
        if(this.state.mode === "quiz"){
            if (this.state.scoreType === "numberScoring" || this.state.scoreType === "numberScoringImg") {
                let _page = <Quiz
                qAndA={this.state.qAndA}
                quizNum={this.state.quizNumber}
                scoreType={this.state.scoreType}
                onChangeMode={
                    function(_quizNum, _score, _mode) {
                    let _scores = this.state.counted_score + Number(_score)
                    this.setState({
                        quizNumber:_quizNum,
                        counted_score:_scores,
                        mode:_mode
                    })
                }.bind(this)}></Quiz>
                return(
                    _page
                )
            } else if (this.state.scoreType === "typeCounting") {
                let _page = <Quiz
                qAndA={this.state.qAndA}
                quizNum={this.state.quizNumber}
                scoreType={this.state.scoreType}
                onChangeMode={
                    function(_quizNum, _answer, _mode) {
                    var _answer_obj = Object.assign({}, this.state.answer_type_obj);
                    _answer_obj[_answer] = _answer_obj[_answer] + 1;
                    this.setState({
                        quizNumber:_quizNum,
                        answer_type_obj:_answer_obj,
                        mode:_mode
                    })
                }.bind(this)}></Quiz>
                return _page
            } else if (this.state.scoreType === "birthdayCalc"){
                let _page = <BirthdayCalc
                onChangeMode={
                    function(_final_result, _mode) {
                    this.setState({
                        counted_score:_final_result,
                        mode:_mode
                    })
                }.bind(this)}></BirthdayCalc>
                return _page
            } else if (this.state.scoreType === "dualMBTI") {
                let _page = <DualMbti
                onChangeMode={
                    function(_final_result, _mode) {
                    this.setState({
                        counted_score:_final_result,
                        mode:_mode
                    })
                }.bind(this)}></DualMbti>
                return _page
            } else if (this.state.scoreType === "storyTelling"){
                let _page = <StoryTelling
                qAndA={this.state.qAndA}
                quizNum={this.state.quizNumber}
                scoreType={this.state.scoreType}
                onChangeMode={
                    function(_quizNum, _mode) {
                        this.setState({
                            quizNumber:_quizNum,
                            mode:_mode
                        })
                    }.bind(this)}
                ></StoryTelling>
                return _page
            } else if (this.state.scoreType === "typeCountingMBTI") {
                let _page = <Quiz
                qAndA={this.state.qAndA}
                quizNum={this.state.quizNumber}
                scoreType={this.state.scoreType}
                onChangeMode={
                    function(_quizNum, _answer, _mode) {
                    var _answer_obj = Object.assign({}, this.state.answer_type_obj);
                    _answer_obj[_answer] = _answer_obj[_answer] + 1;
                    this.setState({
                        quizNumber:_quizNum,
                        answer_type_obj:_answer_obj,
                        mode:_mode
                    })
                }.bind(this)}></Quiz>
                return _page
            }
            return this._page
        }
    }

    lodingPageRender(){
        return(
            <div className="loading-upper">
                <Loading />
                {setTimeout(function(){
                    this.setState({mode:"result"})
                }.bind(this), 4700)}
            </div>
        )
    }

    resultPageRender(){
        let result_contents = this.resultCaculator();
        let final_score_query = result_contents.query
        return(
            <Router basename={ this.state.current_test.info.mainUrl}>
                <Route path={this.state.result_url+final_score_query} component={Result}/>
                <Redirect to={this.state.result_url+final_score_query} />
            </Router>
        )
    }

    pageRenderer(){
        let _page = []
        if(this.state.mode === "intro") {
            _page = this.introPageRender()
        } else if (this.state.mode === "quiz") {
            _page =  this.quizPageRender()
        } else if (this.state.mode === "main") {
            _page = this.props.history.push('/')
        } else if (this.state.mode === "loading") {
            _page = this.lodingPageRender()
        } else if (this.state.mode === "result") {
            _page = this.resultPageRender()
        }
        return _page
    }

    render(){
        return (
            <Fragment>
                {this.pageRenderer()}
            </Fragment>
        );
    }
}

export default withRouter(Intro);
