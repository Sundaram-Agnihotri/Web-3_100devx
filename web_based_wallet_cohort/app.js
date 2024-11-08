let mnemonic = '';
let wallets = [];

document.getElementById('create-wallet').style.display = 'none';

document.getElementById('generate-mnemonic').addEventListener('click', () => {

  document.getElementById('mnemonic').style.display = 'block';

    mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    document.getElementById('mnemonic').innerText = `Mnemonic: ${mnemonic}`;

    document.getElementById('create-wallet').style.display = 'block';
});
 

document.getElementById('create-wallet').addEventListener('click', () => {
    if (!mnemonic) {
        alert('Please generate a mnemonic first!');
        return;
    }

    let wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${wallets.length}`);
    
    wallets.push(wallet);

    displayWallets();
});

function displayWallets() {
    const walletsDiv = document.getElementById('wallets');
    walletsDiv.innerHTML = '';

    wallets.forEach((wallet, index) => {
        const walletDiv = document.createElement('div');
        walletDiv.className = 'wallet';
        walletDiv.innerHTML = `
            <strong>Wallet ${index + 1}</strong><br>
            Public Key: ${wallet.publicKey}<br>
            Address: ${wallet.address}
        `;
        walletsDiv.appendChild(walletDiv);
    });
}