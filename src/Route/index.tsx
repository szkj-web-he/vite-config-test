/**
 * file: Project Router File
 * date: 2020-07-21
 * author: Frank
 * lastModify: Frank 2020-07-21
 */
import { LoadingV2 } from '@datareachable/dr_front_componentlibrary';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

/* <------------------------------------ **** Lazy Loading all the pages START **** ------------------------------------ */
const HomePage = React.lazy(() => import(/* webpackChunkName: 'Homepage' */ '../Pages/HomePage'));
const DataProcessing = React.lazy(
    () => import(/* webpackChunkName: 'DataProcessingPage' */ '../Pages/DataProcessingPage'),
);
/* <------------------------------------ **** Lazy Loading all the pages END **** ------------------------------------ */

const RootRouter = (): JSX.Element => {
    return (
        <Suspense fallback={<LoadingV2 />}>
            <Router basename={process.env.BASENAME}>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/dataProcessing" element={<DataProcessing />} />
                </Routes>
            </Router>
        </Suspense>
    );
};

export default RootRouter;
