(function() {
    new Vue({
      el: '#app',
      components: {
        'payment-form': {
          data() {
            return {
              formData: {
                  amount: '',
                  currency: '',
                  email: '',
                  first_name: '',
                  last_name: '',
                  callback_url: 'https://johnlivingprooff.github.io/paychangu_tech_interview-/',
                  return_url: 'https://johnlivingprooff.github.io/paychangu_tech_interview-/paid',
                  tx_ref: '',
                  customization: { title: 'Donation', description: 'Supporting a good cause' },
                  logo: ''
              },
              paymentStatus: null
            };
          },
          methods: {
            submitForm() {
              if (this.isValidForm()) {
                // Generates a unique ref-id for paument
                this.formData.tx_ref = this.generateUniqueTransactionReference();
                delete this.formData.callback_url;
   
                const options = {
                  method: 'POST',
                  headers: {
                   accept: 'application/json',
                   'content-type': 'application/json',
                   Authorization: 'Bearer sec-test-fTdNI49lli8aU0yGQkvgxgcmtvVOWFeM'
                  },
                  body: JSON.stringify(this.formData)
                };
   
                fetch('https://api.paychangu.com/payment', options)
                  .then(response => response.json())
                  .then(response => {
                   console.log(response);
                   if (response.status === 'success') {
                     this.paymentStatus = 'Payment successful!';
                     this.clearForm();
                   } else {
                     this.paymentStatus = 'Payment failed. Please try again.';
                   }
                  })
                  .catch(error => {
                   console.error(error);
                   this.paymentStatus = 'Payment failed. Please try again.';
                  });
              }
            },
            isValidForm() {
              if (!this.formData.first_name || !this.formData.last_name || !this.formData.email) {
                alert('Please fill in all fields.');
                return false;
              }
              return true;
            },
            generateUniqueTransactionReference() {
              return Math.floor(Math.random() * Date.now()).toString();
            },
            clearForm() {
              Object.keys(this.formData).forEach(key => this.formData[key] = '');
            },
          },
          template: `
            <div>
              <form @submit.prevent="submitForm">
                <input type="text" id="first_name" placeholder="First Name" v-model="formData.first_name" required>
                <input type="text" id="last_name" placeholder="Last Name" v-model="formData.last_name" required>
                <br/>
                <input type="email" id="email" placeholder="Your Email" v-model="formData.email" required>
                <br/>
                <select id="currency" name="selectCurrency" v-model="formData.currency">
                  <option value="MWK">MWK</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <input type="number" id="money" placeholder="0.00" v-model="formData.amount" required>
                <button type="submit" id="s_button">DONATE NOW</button>
                <button type="submit" id="help_button">?</button>
              </form>
              <p>{{ paymentStatus }}</p>
            </div>
          `
        }
      }
    });
   })();
   