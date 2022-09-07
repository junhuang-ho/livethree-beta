import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

// import ERC20 from "@superfluid-finance/ethereum-contracts/build/contracts/ERC20.json"
// import ISuperToken from "@superfluid-finance/ethereum-contracts/build/contracts/ISuperToken.json"
// import ISuperfluid from "@superfluid-finance/ethereum-contracts/build/contracts/ISuperfluid.json"
// import IConstantFlowAgreementV1 from "@superfluid-finance/ethereum-contracts/build/contracts/IConstantFlowAgreementV1.json"

// copied from node_modules
import ERC20 from "./contracts/ERC20.json"
import ISuperToken from "./contracts/ISuperToken.json"
import ISuperfluid from "./contracts/ISuperfluid.json"
import IConstantFlowAgreementV1 from "./contracts/IConstantFlowAgreementV1.json"

// rules
// const isMobile = useResponsive('down', 'sm');
// const isPartial = useResponsive('between', '', 'sm', 'lg');
// const isWide = useResponsive('up', 'lg');

// ---------------------------------------- //
// ----- to switch between dev & live ----- //
// ---------------------------------------- //

// // --- dev --- //
// export const ADMIN_ADDRESS = "0x614539062F7205049917e03ec4C86FF808F083cb"  // dev | NOTE: GCP's moonlight fn
// export const WEB3AUTH_CLIENT_ID = 'BMdhaBBKwsMr1jS7Z6rikXs_DDHZaFE1S9zIHrUZRA3J5xi-pTvN_LVm7UpeVbKmwxOk3W0T5YtoPKyrZIuWleQ' as const // web3auth's mainnet (standard - not cyan)
// export const CLOUD_FN_URL_GETNONCE = 'https://us-central1-moonlight-173df.cloudfunctions.net/getNonce'
// export const CLOUD_FN_URL_VERIFYSIGNEDMSG = 'https://us-central1-moonlight-173df.cloudfunctions.net/verifySignedMessage'
// export const FIREBASE_CONFIG = {
//     apiKey: "AIzaSyAJNuAC5aIKrQwtD5nsmYpuo_s71FmnwqI",
//     authDomain: "moonlight-173df.firebaseapp.com",
//     projectId: "moonlight-173df",
//     storageBucket: "moonlight-173df.appspot.com",
//     messagingSenderId: "903972858647",
//     appId: "1:903972858647:web:d99caaa732f9a12d00e552",
//     measurementId: "G-WTWTRSZYTB"
// };

// --- live --- //
export const ADMIN_ADDRESS = "0x968B0165Ccb042278d0AC375985943e49892D0B1" // live | NOTE: GCP's livethree fn
export const WEB3AUTH_CLIENT_ID = 'BCra18FhoqHZBjima6njP0JKotW1lSDCyjdhcyuHpj8WO_0AbQ04_psVRM-5XV9DpUFYGRbct78l5JVN4qvskh0' as const // web3auth's mainnet (not polygon)
export const CLOUD_FN_URL_GETNONCE = 'https://us-central1-livethree-d1d85.cloudfunctions.net/getNonce'
export const CLOUD_FN_URL_VERIFYSIGNEDMSG = 'https://us-central1-livethree-d1d85.cloudfunctions.net/verifySignedMessage'
export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCKar3WJN-zn11wWPTJX3eIJWgpBz46IaY",
    authDomain: "livethree-d1d85.firebaseapp.com",
    projectId: "livethree-d1d85",
    storageBucket: "livethree-d1d85.appspot.com",
    messagingSenderId: "106255450520",
    appId: "1:106255450520:web:ccf7dbfb53533516662bed",
    measurementId: "G-Y9Y57JJRPL"
};

// ---------------------------------------- //


export const PERCENTAGE_TAKE_NUMERATOR = 12
export const PERCENTAGE_TAKE_DENOMINATOR = 100

export const PERCENTAGE_TAKE_NUMERATOR_PROMO1 = 6

export const PROMO1_COUNT = 5 // TODO: change firestore rules if change this value!!

export const RPC_URL_BACKUP = "https://polygon-rpc.com"
export const RPC_URL_POLYGON = import.meta.env.VITE_ALCHEMY_API_URL_POLYGON // process.env.REACT_APP_ALCHEMY_API_URL_POLYGON
export const RPC_URL_MUMBAI = import.meta.env.VITE_ALCHEMY_API_URL_MUMBAI  // process.env.REACT_APP_ALCHEMY_API_URL_MUMBAI

export const CHAIN_NAME_POLYGON = 'polygon'
export const CHAIN_NAME_MUMBAI = 'mumbai'
export const CHAIN_ID_POLYGON = '0x89'
export const CHAIN_ID_MUMBAI = '0x13881'
export const CHAIN_NUMBER_POLYGON = 137
export const CHAIN_NUMBER_MUMBAI = 80001

export const CHAIN_NUMBER_TO_CHAIN_NAME_MAPPING: any = {
    [CHAIN_NUMBER_POLYGON]: "Polygon Mainnet",
    [CHAIN_NUMBER_MUMBAI]: "Polygon Mumbai",
}

export const WEB3AUTH_CHAIN_CONFIG = {
    polygon: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: CHAIN_ID_POLYGON,
        rpcTarget: RPC_URL_POLYGON, // note: free version: "https://polygon-rpc.com",
        displayName: "Polygon Mainnet",
        blockExplorer: "https://polygonscan.com/",
        ticker: "MATIC",
        tickerName: "Matic",
    } as CustomChainConfig,
    mumbai: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: CHAIN_ID_MUMBAI, // 80001
        rpcTarget: RPC_URL_MUMBAI, // note: free version: "https://rpc-mumbai.matic.today",
        displayName: "Mumbai Testnet",
        blockExplorer: "https://mumbai.polygonscan.com/",
        ticker: "MATIC",
        tickerName: "Matic",
    } as CustomChainConfig,
}
export type WEB3AUTH_CHAIN_CONFIG_TYPE = keyof typeof WEB3AUTH_CHAIN_CONFIG;


export const CHAIN_NAME_DEFAULT = CHAIN_NAME_POLYGON

export const BYTES = "bytes"
export const ZERO_BYTES = "0x"
export const PLACEHOLDER_ADDRESS = 'empty'
export const CALL_PENDING_EXPIRE_IN_MS = 60_000
export const CALL_PENDING_EXPIRE_IN_S = CALL_PENDING_EXPIRE_IN_MS / 1000
export const INCOMING_CALL_DURATION_MS = CALL_PENDING_EXPIRE_IN_MS - 5_000
export const END_CALL_BUFFER_SECONDS = "60"
export const END_CALL_BUFFER_SECONDS_EXTRA = "90" // must be more than END_CALL_BUFFER_SECONDS
export const PRICE_MAX_CHARACTER: number = 7
export const MAX_DECIMAL_CHARACTERS = 18
export const GLOBAL_MAX_CHARACTER_NUMBER = MAX_DECIMAL_CHARACTERS + 2

export const GAS_LIMIT_MULTIPLIER_NUMERATOR = 80
export const GAS_LIMIT_MULTIPLIER_DENOMINATOR = 100

export const CALL_HISTORY_LIMIT = 10

export const REFERRAL_MIN_DURATION_S = 55

export const GAS_STATION_URL = 'https://gasstation-mainnet.matic.network/v2' // ref: https://docs.openzeppelin.com/defender/relay#speed

/**
 * ref:
 * https://console.superfluid.finance/protocol
 * https://docs.superfluid.finance/superfluid/developers/networks
 */
export const POLYGON_ADDRESS_SF_HOST = "0x3E14dC1b13c488a8d5D310918780c983bD5982E7"
export const POLYGON_ADDRESS_CFAV1 = "0x6EeE6060f715257b970700bc2656De21dEdF074C"
export const POLYGON_ADDRESS_DAIx = "0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2"
export const POLYGON_ADDRESS_USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
export const POLYGON_ADDRESS_USDCx = "0xCAa7349CEA390F89641fe306D93591f87595dc1F"

export const MUMBAI_ADDRESS_SF_HOST = "0xEB796bdb90fFA0f28255275e16936D25d3418603"
export const MUMBAI_ADDRESS_CFAV1 = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873"
export const MUMBAI_ADDRESS_fUSDCx = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7"
export const MUMBAI_ADDRESS_fUSDC = "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2"
export const MUMBAI_ADDRESS_fDAIx = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"

export const DEFAULT_ADDRESS_SF_HOST = POLYGON_ADDRESS_SF_HOST
export const DEFAULT_ADDRESS_CFAV1 = POLYGON_ADDRESS_CFAV1
export const DEFAULT_ADDRESS_USDC = POLYGON_ADDRESS_USDC
export const DEFAULT_ADDRESS_USDCx = POLYGON_ADDRESS_USDCx
export const DEFAULT_ADDRESS_DAIx = POLYGON_ADDRESS_DAIx

export const ABI_ERC20 = ERC20.abi
export const ABI_SUPERTOKEN = ISuperToken.abi
export const ABI_SF_HOST = ISuperfluid.abi
export const ABI_CFAV1 = IConstantFlowAgreementV1.abi

export const MATIC_SYMBOL = "MATIC"

export const OPERATION_TYPE_SUPERFLUID_CALL_AGREEMENT = 1 + 200

export const DELETE_PERMISSION = 4

export const ROLE_CALLER = 'caller'
export const ROLE_CALLEE = 'callee'
