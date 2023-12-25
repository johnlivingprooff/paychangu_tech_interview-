const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ${AUTH_KEY}'
    },
    body: JSON.stringify({
      amount: '100',
      currency: 'MWK',
      email: 'yourmail@example.com',
      first_name: 'Kelvin',
      last_name: 'Banda',
      callback_url: 'https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc',
      return_url: 'https://webhook.site',
      customization: {title: 'Title of payment', description: 'Description of payment'},
      logo: 'https://assets.piedpiper.com/logo.png'
    })
  };
  