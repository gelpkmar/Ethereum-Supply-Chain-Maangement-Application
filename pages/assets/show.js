import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Asset from '../../ethereum/asset';
import factory from '../../ethereum/factory';
import { List, Card, Grid, Button, Modal, Form, Input, Message, Header } from 'semantic-ui-react';
var QRCode = require('qrcode.react');
import web3 from '../../ethereum/web3';
import { Link } from  '../../routes';

class AssetShow extends Component {
  state = {
    name: '',
    weightUse: '',
    weight: '',
    description: '',
    errorMessage: '',
    loading: false,
    recipient: ''
  };

  //Before Component is rendered, getInitialProps is called
  static async getInitialProps(props){
    const asset = Asset(props.query.address);
    //console.log(asset);
    const summary = await asset.methods.getAssetAttributes().call();

    const pastEvents = await asset.getPastEvents('allEvents', {
          filter: {},
          fromBlock: 0,
          toBlock: 'latest'
      }, function(error, events){ return events; });

    return{
      asset: asset._address,
      owner: summary[0],
      name: summary[1],
      description: summary[2],
      weight: summary[3],
      parentAsset: summary[4],
      stage: summary[5],
      creationTime: summary[6],
      children: summary[7],
      events: pastEvents,
      assetABI: asset
    };
  }

  renderEvents(){
    const items = this.props.events.map(function(event){
      const seconds=event.returnValues.now||event.returnValues.triggerTime;
      const date = new Date(seconds * 1000);
      return {
        header: date+': '+event.event,
        meta: (
          <List>
            <List.Item>Transaction Hash: {event.transactionHash}</List.Item>
            <List.Item>Event triggered by: {event.returnValues.sourceAddr}</List.Item>
          </List>
        ),
        description: (
          <Link route={`https://rinkeby.etherscan.io/tx/${event.transactionHash}`}>
            <a>View Event on Etherscan</a>
          </Link>
        ),
        fluid: true
      };
    }); //Iterate ove array and trigger function

    return <Card.Group items={items} />;
  }

  renderChildren(){
    const items = this.props.children.map((child) => {
      return (
        <div>
            <List.Item>
                <List.Content>
                  <Link route={`/assets/${child}`}>
                    <a>{child}</a>
                  </Link>
                </List.Content>
            </List.Item>
        </div>
      );
    });
    return (
      <div>
        <h4>List of Children</h4>
        <List items={items} divided verticalAlign='middle'/>
      </div>
    );

  }

  onTransfer = async (event) => {
    event.preventDefault();
    const asset = Asset(this.props.asset);
    this.setState({ loading: true, errorMessage: '' });

    try{
      const accounts = await web3.eth.getAccounts()
      await asset.methods
        .transferAsset(this.state.recipient)
        .send({
          from: accounts[0]
        });
    }catch(err){
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  onProcess = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    try{
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .processAsset(this.state.weightUse, this.state.name, this.state.description, this.state.weight, this.props.asset)
        .send({
          from: accounts[0]
        });
    }catch(err){
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }
  render() {
    return (
      <Layout>
        <h3>{ this.props.asset }</h3>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={2}>
            <QRCode value={ this.props.asset }/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8} className="ui sticky">
            <h4>Asset Details</h4>
            <List>
              <List.Item>Name: { this.props.name }</List.Item>
              <List.Item>Owner: { this.props.owner }</List.Item>
              <List.Item>Description: { this.props.description }</List.Item>
              <List.Item>Weight left: { this.props.weight } kg</List.Item>
              <List.Item>Parent Asset: { this.props.parentAsset }</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={6}>
            {this.renderChildren()}
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8} className="ui sticky">

            <Modal trigger={<Button floated="right" content="Transfer Asset" icon="send" primary loading={this.state.loading}/>}>
              <Header icon='send' content='Please enter Address of recipient.' />
              <Modal.Content>

                <Form>
                  <Form.Field required>
                    <label>Recipient</label>
                    <Input
                       placeholder='0x84hg76jg73...'
                       value={this.state.recipient}
                       onChange={event => this.setState({ recipient: event.target.value })}
                       required
                     />
                  </Form.Field>
                </Form>

              </Modal.Content>

              <Modal.Actions>
                <Button onClick={this.onTransfer} color='green'>Transfer!</Button>
              </Modal.Actions>

            </Modal>

          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>

            <Modal trigger={<Button floated="left" content="Process Asset" icon="setting" primary loading={this.state.loading}/>}>
              <Header icon='send' content='Please enter Address of recipient.' />
              <Modal.Content>

                <Form>
                  <Form.Group widths='equal'>
                    <Form.Field required>
                       <label>Weight Use</label>
                       <Input
                         placeholder='e.g. 100'
                         value={this.state.weightUse}
                         onChange={event => this.setState({ weightUse: event.target.value })}
                         label="kg"
                         labelPosition="right"
                         required
                       />
                    </Form.Field>
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
                </Form>

              </Modal.Content>

              <Modal.Actions>
                <Button onClick={this.onProcess} color='green'>Transfer!</Button>
              </Modal.Actions>

            </Modal>

          </Grid.Column>

          <Grid.Column mobile={16} tablet={16} computer={16}>
            {this.renderEvents()}
          </Grid.Column>

        </Grid>
      </Layout>
    );
  }
}

export default AssetShow;
