import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class AssetNew extends Component {
  state = {
    name: '',
    weight: '',
    description: '',
    parentAsset: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try{
      const accounts = await web3.eth.getAccounts();
      console.log(this.state.name, this.state.description, this.state.weight);
      await factory.methods
        .createAsset(this.state.name, this.state.description, this.state.weight, '0x0')
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    }catch(err){
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });


  }

  render() {
    return(
      <Layout>
        <h3>Register a new Asset:</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Group widths='equal'>
            <Form.Field required>
               <label>Asset name</label>
               <Input
                 placeholder='e.g. Cow'
                 value={this.state.name}
                 onChange={event => this.setState({ name: event.target.value })}
                 required
               />
            </Form.Field>
            <Form.Field required>
               <label>Weight</label>
               <Input
                 placeholder='e.g. 100'
                 value={this.state.weight}
                 onChange={event => this.setState({ weight: event.target.value })}
                 label="kg"
                 labelPosition="right"
                 required
               />
            </Form.Field>
          </Form.Group>
          <Form.TextArea
            label='Description'
            placeholder='Tell us more about the asset...'
            value={this.state.description}
            onChange={event => this.setState({ description: event.target.value })}
            required
          />

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Register!</Button>
        </Form>
      </Layout>
    );
  }
}

export default AssetNew;
