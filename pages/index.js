import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from  '../routes';

class AssetIndex extends Component {
  //Before Component is rendered, getInitialProps is called
  static async getInitialProps(){
    const assets = await factory.methods.getDeployedAssets().call();

    return { assets }; // same as { assets: assets }
  }

  renderAssets(){
    const items = this.props.assets.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/assets/${address}`}>
            <a>View Asset</a>
          </Link>
        ),
        fluid: true
      };
    }); //Iterate ove array and trigger function

    return <Card.Group items={items} />;
  }

  render(){
    return (
      <Layout>
        <div>
          <h3>Asset Overview</h3>
          <Link route="/assets/new">
            <a>
              <Button
                floated="right"
                content="Register Asset"
                icon="add"
                primary
              />
            </a>
        </Link>

          {this.renderAssets()}
        </div>
      </Layout>
    );
  }
}

export default AssetIndex;
