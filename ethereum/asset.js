import web3 from './web3';
import Asset from './build/Asset.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Asset.interface),
    address
  );
};
