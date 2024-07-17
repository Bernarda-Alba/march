import React, {Component, Fragment} from 'react';
import Intro from './Intro'
import TESTS from '../api/TESTS'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import App from '../App'
import {Button, Card} from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Helmet} from 'react-helmet';

class Result extends Component {
    constructor(props){
        super(props)
        let _sharable_url = window.location.href

        if(window.location.href.slice(-1) === '/'){
            _sharable_url = window.location.href.slice(0, -1)
        } else {
            _sharable_url = window.location.href
        }


        const _current_url = _sharable_url.split('/').filter(function(t) {return t !== ""})
        const _current_test = _current_url.reverse()[2]
        const _current_result = _current_url[0]

        this.state = {
            mode:"result",
            sharable_url:_sharable_url,
            current_url:_current_url,
            current_test:_current_test,
            current_result:_current_result,
            num_shares_count:0,
        }
        this._onBackToStartButtonClick = this._onBackToStartButtonClick.bind(this)
        this._onShareButtonClick = this._onShareButtonClick.bind(this);
    }
    

    _onBackToStartButtonClick(){
        this.setState({
            mode:"intro"
        })
    }
    _onShareButtonClick(){
        this.setState({
            num_shares_count:this.state.num_shares_count+1
        })
        alert("복사 완료! 링크를 공유해주세요.");
    }



    introPageRender(){

        const current_tests_path = '/' + this.state.current_test + '/';
        return(
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path={current_tests_path} component={()=><Intro test={this.state.current_test}/>} exact/>
                    <Redirect to={current_tests_path} />
                </Switch>
            </Router>
        )
    }

    resultRender(){


        let final_type = ''
        let final_desc = ''
        let img_src = ''
        let test_current = ''
        let desc_test_current = ''
        let final_real_meta = ''
        let i = 0;
        let _current_test_contents ;
        while(i<TESTS.length){
            if(TESTS[i].info.mainUrl === this.state.current_test){
                _current_test_contents = TESTS[i]
                let j = 0;
                while(j<TESTS[i].results.length){
                    if(TESTS[i].results[j].query === this.state.current_result){
                        final_type = TESTS[i].results[j].type
                        final_desc = TESTS[i].results[j].desc
                        img_src = TESTS[i].results[j].img_src
                        test_current = TESTS[i].info.mainTitle
                        desc_test_current = TESTS[i].info.subTitle
                        final_real_meta = TESTS[i].info.real_meta
                        break
                    }
                    j = j + 1;
                }
            }
            i = i + 1;
        }


        if(_current_test_contents.info.scoreType === "storyTelling" || _current_test_contents.info.scoreType === "typeCountingMBTI" || _current_test_contents.info.scoreType === "dualMBTI" || _current_test_contents.info.scoreType === "typeCounting"){
            return (
                <Fragment>

                    <img src={img_src} className='result-img' alt={final_type} data-meta={final_real_meta}/>
                    <Card className="result-card" bg="light">
                        <Card.Body className="result-p">
                            <Card.Text>{final_desc}</Card.Text>
                        </Card.Body>
                    </Card>
                </Fragment>
            )
        } else {
            if(final_desc === ``){
                return (
                    <Fragment>
                        <img src={img_src} className='result-img' alt={final_type} />
                    </Fragment>

                )
            } else {
                return (
                    <Fragment>
                        <img src={img_src} className='result-img' alt={final_type} />
                        <Card className="result-card" bg="light">
                            <Card.Body className="result-p">
                                <Card.Text>{final_desc}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Fragment>
                )
            }
        }

    }

    mainPageRender(){
        return(
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path='/' component={App} exact/>
                    <Redirect to='/' />
                </Switch>
            </Router>
        )
    }

    goBack(){
        this.props.history.goBack();
    }

    resultPageRender(){
        return(
            <Fragment>
                
                <div className="result">
                    <div className="result-header">
                        <h5 className="result-title">결과는...</h5>
                        <div className="result-value">
                            {this.resultRender()}
                        </div>

                    </div>



                    <div className="share">
                        <div className="share">
                            <CopyToClipboard text={this.props.meta}>
                                <Button className="share-btn">
                                <h3
                                    onClick={this._onShareButtonClick}
                                    className="share-title">
                                    🔗 링크공유
                                </h3>
                            </Button>
                            </CopyToClipboard>
                        </div>

                        <div className="re-test-btn">
                            <Button className="share-btn">
                            <h3
                                className="share-title"
                                onClick={this._onBackToStartButtonClick}>
                                🔄 다시하기
                            </h3>
                            </Button>
                        </div>
                    </div>


                </div>
            </Fragment>
        );
    }
    
    pageRenderer(){
        let _page = []
        if(this.state.mode === "result") {
            _page = this.resultPageRender()
        } else if (this.state.mode === "intro") {
            _page =  this.introPageRender()
        } else if (this.state.mode === "main") {
            _page = this.mainPageRender()
        }
        return _page
    }


    render(){
        return(
            <div>
                {this.pageRenderer()}
            </div>
        );
    }
}

export default Result;
