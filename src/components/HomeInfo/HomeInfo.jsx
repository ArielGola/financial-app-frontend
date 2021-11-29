import React from 'react';

function HomeInfo() {
    return (
        <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h3>What is "financial freedom"?</h3>
          </div>
          <div className="card-body">
            <p className="h5 m-4">
            Financial independence is the status of having enough income to pay one's living expenses for the rest of one's life without having to be employed or dependent on others.
            </p>
          </div>

          <div className="card-header">
            <h3>- What is this app?</h3>
          </div>
          <div className="card-body">
            <p className="h5 m-4">
            This app helps you to keep track of your expenses and of course to calculate how much you have to save for your financial freedom. It should be noted that the calculation of total money is from a single investment amount, that is, the money is calculated having invested everything at once.
            </p>
            <p className="lead m-4">
            With this application you can also calculate your objectives, that is, you will also calculate the cost of your objectives, for example if you plan to buy a car you only have to put the total cost and the dates on which you are going to pay it and the rest is done by the application.
            </p>
          </div>
        </div>
      </div>
    )
}

export default HomeInfo;
