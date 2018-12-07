import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LayoutContainer,WallIndexContainer ,draftBox} from './containers'
const NoMatch = ({ location }: any) => {
    // no match go home.
    return <Redirect to='/' />;
}
export const routes =
        <Switch>
            <LayoutContainer>
                <Switch>
                    <Route path='/wall' component={WallIndexContainer}/>
                    <Route path='/' component={draftBox} />
                    <Route component={NoMatch}/>
                </Switch>
            </LayoutContainer>
        </Switch>