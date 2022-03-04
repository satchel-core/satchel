import { NextRouter } from 'next/router';

export function handleClick(url: string = "/", router: NextRouter) {
  return () => router.push(url);
}

export function makeAddress(hex: string) {
  return "0x" + hex;
}

export function goBack(router: NextRouter) {
  return () => router.back();
}

export function stripAddress(address: string) {
  if (address.substring(0, 2) == "0x") {
    return address.substring(2);
  }
  return address;
}

export function handleCustomUrl(ext: string, address: string, router: NextRouter) {
  return () => router.push(ext + stripAddress(address));
}

export function totalBalances(tokenPrices: any, amounts: any) {

}

export function getKeys(tokens: any) {
  return Object.keys(tokens);
}

export function handleLogin(publicAddress: any, router: NextRouter) {
  // --snip--
  fetch(`${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`)
  .then(response => response.json())
  // If yes, retrieve it. If no, create it.
  .then(
    users => (users.length ? users[0] : this.handleSignup(publicAddress))
  )
  // Popup MetaMask confirmation modal to sign message
  .then(this.handleSignMessage)
  // Send signature to back end on the /auth route
  .then(this.handleAuthenticate)
  .then(user => {
    user.nonce = Math.floor(Math.random() * 1000000);
    return user.save();
  })
  return this.handleClick("/org/"+[publicAddress], router);
  // --snip--
};

export function handleSignup(publicAddress: any) {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
    body: JSON.stringify({ publicAddress }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(response => response.json());
};

export function handleAuthenticate(publicAddress: any, signature: any ) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());
  };