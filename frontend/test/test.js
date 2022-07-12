const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MyNFT', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const PyDO = await ethers.getContractFactory('pydo');
    const pydo = await PyDO.deploy();
    await pydo.deployed();

    const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const metadataURI = 'images/google.png';

    let balance = await pydo.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await pydo.payToMint(recipient, metadataURI);

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await pydo.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await pydo.isContentOwned(metadataURI)).to.equal(true);

    const transfer_to = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

    await pydo.transferNFT(
      recipient,
      transfer_to,
      newlyMintedToken.transactionIndex
    );

    balance = await pydo.balanceOf(recipient);
    expect(balance).to.equal(0);

    balance = await pydo.balanceOf(transfer_to);
    expect(balance).to.equal(1);
  });
});
