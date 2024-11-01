// import { Keypair } from "@solana/web3.js";

// async function main(){
//     const keypair = Keypair.generate();
//     console.log(keypair.publicKey.toBase58());
//     console.log(keypair.secretKey);
// }


// main();

// wallet.ts

// import { Keypair } from "@solana/web3.js";

// async function main(){
//     const keypair = Keypair.generate();
//     console.log(keypair.publicKey.toBase58());
//     console.log(keypair.secretKey);
// }


// main();

// wallet.ts
import {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';

const wallet: Keypair = new Keypair();
const publicKey: PublicKey = wallet.publicKey;  // Access publicKey directly
const privateKey: Uint8Array = wallet.secretKey;  // Access secretKey directly

const getWalletBalance = async (): Promise<void> => {
    try {
        const connection: Connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance: number = await connection.getBalance(publicKey);
        console.log(`Wallet balance is ${(walletBalance / LAMPORTS_PER_SOL).toFixed(2)} SOL`); // Display in SOL with 2 decimal places

    } catch (err) {
        console.error("Error fetching wallet balance:", err);
    }
};

const airdropSol = async (): Promise<void> => {
    try {
        const connection: Connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const airdropAmount: number = 2 * LAMPORTS_PER_SOL;
        const airdropSig: string = await connection.requestAirdrop(publicKey, airdropAmount);
        await connection.confirmTransaction(airdropSig);
        console.log("Airdrop successful");

    } catch (err) {
        console.error("Error during airdrop:", err);
    }
};

const main = async (): Promise<void> => {
    await getWalletBalance();
    await airdropSol();
    await getWalletBalance();
};

main().catch(err => console.error("Error in main function:", err));