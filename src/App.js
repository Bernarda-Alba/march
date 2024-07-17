import React, {Component, Fragment} from 'react';
import MainPage from './components/MainPage';
import Intro from './components/Intro'
import ResultToIntro from './components/ResultToIntro'
import ScrollToTop from './components/ScrollToTop'
import TESTS from './api/TESTS'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Result from './components/Result';
import {Helmet} from 'react-helmet';


class App extends Component {
  constructor(props){
    super(props)
    const _sharable_url = window.location.href;
    let i = 0;
    let _all_tests_url = [];
    while (i<TESTS.length) {
      _all_tests_url.push('/'+TESTS[i].info.mainUrl+'/')
      i = i + 1;
    }
    let j = 0;
    let _all_tests_result_url = [];
    while (j<_all_tests_url.length){
      _all_tests_result_url.push(_all_tests_url[j]+'result/')
      j = j + 1;
    }
    let _final_render_routes = [];
    var k = 0;

    while(k<TESTS.length){
      var l=  0;
      while(l<TESTS[k].results.length){
        _final_render_routes.push([TESTS[k].results[l].query, TESTS[k].info.mainUrl])
        l = l + 1;
      }
      k = k + 1;
    }
    this.state = {
      result_route:'result/',
      all_tests_url:_all_tests_url,
      all_tests_result_url:_all_tests_result_url,
      final_render_routes:_final_render_routes,
      sharable_url:_sharable_url,
    }
  }

  reloadPage() {
    var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
    var now = Date.now();
    var tenSec = 10 * 1000;
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) { window.location.reload(); } else {}
  }




  privateRoute(){
      if (window.location.href.includes("index.html")){

      }
    }

  render() {
    return(
    <Router>
    <Fragment>

      {this.reloadPage()}



      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
          <Switch>
            <Route path='/' exact>
                <Helmet>
                  <title>베르나르다 알바 캐릭터 성격 분석</title>
                  <meta name="title" content="베르나르다 알바 캐릭터 성격 분석 by LeeLee"/>
                  <meta name="description" content="내가 베르나르다 알바 속 캐릭터라면?" data-react-helmet="true"/>
                  <link rel="main-url" href={window.location.href}/>
k
                  <meta property="twitter:card" content="summary_large_image"/>
                  <meta property="twitter:url" content="https://ktestone.com/"/>
                  <meta property="twitter:title" content="베르나르다 알바 성격 테스트 by LeeLee"/>
                  <meta property="twitter:description" content="내가 베르나르다 알바 속 캐릭터라면?"/>
                  <meta property="twitter:image" content="https://user-images.githubusercontent.com/35620531/109660083-cb938980-7bab-11eb-8a64-0acadaad8233.png"/>
                  <meta property="twitter:image:alt" content="내가 베르나르다 알바 속 캐릭터라면?" />
                </Helmet>
                <MainPage/>
            </Route>

            {this.state.all_tests_url.map((item)=>(
              <Route
                path={item}
                component={() => <Intro test={item.replaceAll('/','')}/>}
                key={item.replaceAll('/','')}
                exact
              />
            ))}

            <Route path={this.state.all_tests_result_url} component={ResultToIntro} exact/>

            {this.state.final_render_routes.map((item)=>(
              <Route
                path={'/'+item[1]+'/'+this.state.result_route+item[0]}
                component={Result}
                key={item[1]+'_'+item[0]} exact/>
            ))}
          </Switch>
        </ScrollToTop>
      </Router>




      <div className="intro-footer">
          <h5>Powered Date<br></br>2021-03-05</h5>
          <h5>Recent Modify<br></br>KST 2021-03-14 22:30</h5>
          <p>version: 1.0.3</p>
      </div>
    </Fragment>
    </Router>
    )
  }

}


export default App;
