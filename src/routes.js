import MainLayout from "./components/mainLayout";
import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';


const configuredRoutes = [
    {
        exact: true,
        path: '/',
        layout: MainLayout,
        component: lazy(() => import('./components/cardContentBlock')),
    },
    {
        exact: true,
        path: '/authors',
        layout: MainLayout,
        component: lazy(() => import('./components/authors')),
    },
    {
        exact: true,
        path: '/publishers',
        layout: MainLayout,
        component: lazy(() => import('./components/publishers')),
    },
    {
        exact: true,
        path: '/books',
        layout: MainLayout,
        component: lazy(() => import('./components/books')),
    },
    {
        exact: true,
        path: '/journals',
        layout: MainLayout,
        component: lazy(() => import('./components/journals')),
    },
    {
        exact: true,
        path: '/theses',
        layout: MainLayout,
        component: lazy(() => import('./components/theses')),
    },
    {
        exact: true,
        path: '/addauthor',
        layout: MainLayout,
        component: lazy(() => import('./components/authorform')),
    },
    {
        exact: true,
        path: '/addpublisher',
        layout: MainLayout,
        component: lazy(() => import('./components/publisherform')),
    },
    {
        exact: true,
        path: '/addbook',
        layout: MainLayout,
        component: lazy(() => import('./components/bookform')),
    },
    {
        exact: true,
        path: '/addjournal',
        layout: MainLayout,
        component: lazy(() => import('./components/journalform')),
    },
    {
        exact: true,
        path: '/addthesis',
        layout: MainLayout,
        component: lazy(() => import('./components/thesisform')),
    },
];

const constructRoutes = (routes) => (
    <Suspense fallback="Loading...">
        <Switch>
            {routes.map((route) => {
                const Layout = route.layout || Fragment;
                const Component = route.component;
                const key = route.path;

                return (
                    <Route
                        key={key}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Layout>
                                {route.routes
                                    ? constructRoutes(route.routes)
                                    : <Component {...props} />}
                            </Layout>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);


function Routes() {
    return constructRoutes(configuredRoutes);
}

export default Routes;