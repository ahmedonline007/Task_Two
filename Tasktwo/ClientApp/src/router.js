import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Loading from './components/LoadingPage';

//layOut
const LayOut = lazy(() => import("./components/Layout"));

// pages
const DashBoard = lazy(() => import("./components/DashBoard"));

const Login = lazy(() => import("./components/Login"));



const RouterDocument = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Router>
                <Switch>
                    <Route path="/" component={Login} exact />
                    <LayOut>
                        <Switch>
                            <Route path="/DashBoard" component={DashBoard} />
                        </Switch>
                    </LayOut>
                </Switch>
            </Router>
        </Suspense>
    );
};

export default RouterDocument;