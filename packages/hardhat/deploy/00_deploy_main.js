// deploy/00_deploy_main.js

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const OneSplitView = await deploy("OneSplitView", {
    from: deployer,
    args: [],
    log: true,
  });

  const OneSplitViewWrap = await deploy("OneSplitViewWrap", {
    from: deployer,
    args: [ OneSplitView.address ],
    log: true,
  });

  const OneSplit = await deploy("OneSplit", {
    from: deployer,
    args: [ OneSplitViewWrap.address ],
    log: true,
  });

  const OneSplitWrap = await deploy("OneSplitWrap", {
    from: deployer,
    args: [ OneSplitViewWrap.address, OneSplit.address ],
    log: true,
  });

  /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["OneSplitView", "OneSplitViewWrap", "OneSplit", "OneSplitWrap"];
