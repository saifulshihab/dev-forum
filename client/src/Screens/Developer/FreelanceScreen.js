import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import FreelanceProjectContainer from '../../Container/FreelanceProjectContainer';
import SingleFreelanceProjectContainer from '../../Container/SingleFreelanceProjectContainer';

const FreelanceScreen = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <div className='grid grid-cols-4 h-full'>
        <div className='col-span-3'>
          <div className='mb-2 text-lg text-gray-600 bg-gray-100 flex items-center h-10 shadow font-semibold p-2'>
            Bid on projects & earn money
          </div>

          <div className='job_feed px-2'>
            <Switch>
              <Route exact path={path} component={FreelanceProjectContainer} />
              <Route
                path={`${path}/:projectId`}
                component={SingleFreelanceProjectContainer}
              />
            </Switch>
          </div>
        </div>
        <div>Similer Projects</div>
      </div>
    </div>
  );
};

export default FreelanceScreen;
