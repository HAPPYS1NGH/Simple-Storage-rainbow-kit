## Simple Storage Dapp
This is a Simple Storage Dapp built with RainbowKit and wagmi. It allows users to store and retrieve a single integer value on the Ethereum blockchain.

### Getting Started
To use the Dapp, you will need an Ethereum wallet provider like Metamask and some test ether. Once you have those, follow the steps below:

1. Clone this repository:
```
  git clonehttps://github.com/HAPPYS1NGH/Simple-Storage-rainbow-kit.git
  cd simple-storage-dapp
```
2. Install the dependencies:
```
  npm install
```
3. Start the development server:
```
npm run dev
```
4. Open your browser and navigate to http://localhost:3000. You should see the Simple Storage Dapp running.

### Usage
1. Connect your Ethereum wallet by clicking the "Connect" button in the top-right corner of the Dapp.

2. To read the current stored number, click the "Reload" button. The current value will be displayed on the screen.

3. To store a new number, enter it in the input field and click the "Store" button. You will be prompted to confirm the transaction in your wallet. Once the transaction is confirmed, the new value will be stored on the blockchain.

### How it Works
The Simple Storage Dapp is built with React and uses RainbowKit and wagmi to interact with the Ethereum blockchain.

The Dapp consists of a single page with three main components:

* A header with the Dapp name and a "Connect" button.
* A display area that shows the current stored number and a "Reload" button.
* An input field and a "Store" button for storing a new number.
* When the Dapp is loaded, it connects to the Ethereum blockchain using the provider provided by the user's wallet. It then reads the current stored number from the smart contract and displays it on the screen.

When the user enters a new number and clicks the "Store" button, the Dapp uses the contract function writeNum to store the new value on the blockchain. The user is prompted to confirm the transaction in their wallet.

After the transaction is confirmed, the Dapp reads the new stored number from the blockchain and displays it on the screen.

### Smart Contract
The smart contract used by the Simple Storage Dapp is a simple example that provides two functions:

* `readNum`: Reads the current stored number.
* `writeNum`: Writes a new number to the storage.

The contract address and ABI are hardcoded into the Dapp, but you can update them to use your own contract if you like.

### Contributing
Contributions to the Simple Storage Dapp are welcome. To contribute:

1. Fork this repository.

2. Create a new branch for your changes:
```
git checkout -b my-new-branch
```
3. Make your changes and commit them:
```
git add .
git commit -m "Add some feature"
```
4. Push your changes to your fork:
```
git push origin my-new-branch
```
5. Open a pull request.

### License
The Simple Storage Dapp is released under the MIT License. See LICENSE for details.
