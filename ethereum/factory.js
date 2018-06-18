import web3 from './web3';
import AssetFactory from './build/AssetFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(AssetFactory.interface),
  '0x1EE2245CDE88F423623F2D5295CEDb0dF18dd662'
);

export default instance;
