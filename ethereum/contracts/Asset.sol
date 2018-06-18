pragma solidity ^0.4.19;

contract AssetFactory{
    address[] deployedAssets;

    function createAsset(string _name, string _descr, uint _weight, address _parent) public returns(address){
      address newAsset = new Asset(msg.sender, _name, _descr, _weight, _parent);
      deployedAssets.push(newAsset);
      return newAsset;
    }

    function processAsset(uint _weightUse, string _name, string _descr, uint _weight, Asset asset) public returns(address){
        //require(msg.sender = asset.owner && asset.weight > _weightUse && asset.stage!=asset.Stages.FinishedGood);
        address newChild = createAsset(_name, _descr, _weight, asset);
        asset.processAsset(_weightUse, newChild);
        return newChild;
    }

    function getDeployedAssets() public view returns (address[]){
        return deployedAssets;
    }
}

contract Asset{

  address owner;
  string name;
  string description;
  uint weight;
  address parentAsset;
  address[] children;
  uint creationTime;
  Stages public stage = Stages.RawMaterial;

  enum Stages {
    RawMaterial,
    SemiFinishedGood,
    FinishedGood,
    Processed,
    Used,
    Spoiled
  }

  // Constructor. Called when Asset is created.
  function Asset(address _addr, string _name, string _descr, uint _weight, address _parent) public{
    owner = _addr;
    name = _name;
    description = _descr;
    weight = _weight;
    parentAsset = _parent;
    AssetCreate(owner, this, now);
  }

  event AssetCreate(address sourceAddr, address asset, uint now);
  event AssetTransfer(address sourceAddr, address destAddr, uint triggerTime);
  event AssetProcess(address sourceAddr, uint amountOfChildren, uint now);

  modifier restricted(){
      require(msg.sender == owner);
      _;
  }

  function transferAsset(address _dest) public restricted{
    require(stage!=Stages.Used && stage!=Stages.Spoiled);
    owner = _dest;
    AssetTransfer(msg.sender, _dest, now);
  }

  function getAssetAttributes() public view returns(address, string, string, uint, address, Stages, uint, address[]){
      return(owner, name, description, weight, parentAsset, stage, creationTime, children);
  }

  function processAsset(uint _weightUse, address child) public {
      require(weight > _weightUse && stage!=Stages.FinishedGood);
      weight -= _weightUse;
      children.push(child);
      stage = Stages.Processed;
      AssetProcess(msg.sender, children.length, now);
  }

}
