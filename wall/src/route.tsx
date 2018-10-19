import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LayoutContainer } from './containers'
import { WallIndexContainer } from './containers'
const NoMatch = ({ location }: any) => {
    // no match go home.
    return <Redirect to='/' />;
}
export const routes =
        <Switch>
            <LayoutContainer>
                <Switch>
                    <Route path='/' component={WallIndexContainer}/>
                    <Route component={NoMatch}/>
                </Switch>
            </LayoutContainer>
        </Switch>