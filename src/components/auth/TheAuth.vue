<template>
  <base-page v-if="mode === `login`">
    <base-card class="form-wrapper">
    <h2>Log In</h2>
    <form class="form">

      <div :class="[`form-control`, {invalid: !enteredEmailInputValid}]">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="enteredEmail" @blur="emailBlur" required>
        <p v-if="!enteredEmailInputValid" class="text-invalid">Please enter a valid email address</p>
      </div>

      <div :class="[`form-control`, {invalid: !enteredPasswordInputValid}]">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="enteredPassword" @blur="passwordBlur" required>
        <p v-if="!enteredPasswordInputValid" class="text-invalid">Password should be at least 7 characters long</p>
      </div>

      <div class="controls">
        <router-link to="/auth?mode=signup">Don't have an account? Sign up</router-link>
        <base-button :disabled="!formIsValid" type="button" look="primary" @click="handleFormSubmit">Log in</base-button>
      </div>

    </form>
  </base-card>
  </base-page>

  <base-page v-else-if="mode === `signup`">
    <base-card class="form-wrapper">
    <h2>Sign Up</h2>
    <form class="form">

      <div :class="[`form-control`, {invalid: !enteredNameInputValid}]">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="enteredName" @blur="nameBlur" required>
        <p v-if="!enteredNameInputValid" class="text-invalid">Name should be at least 3 characters long</p>
      </div>

      <div :class="[`form-control`, {invalid: !enteredLastNameInputValid}]">
        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" v-model="enteredLastName" @blur="lastNameBlur" required>
        <p v-if="!enteredLastNameInputValid" class="text-invalid">Last name should be at least 5 characters long</p>
      </div>
      
      <div :class="[`form-control`, {invalid: !enteredAddressInputValid}]">
        <label for="address">Address</label>
        <input type="text" id="address" v-model="enteredAddress" @blur="addressBlur" required>
        <p v-if="!enteredAddressInputValid" class="text-invalid">Address should be at least 7 characters long</p>
      </div>
      
      <div :class="[`form-control`, {invalid: !enteredEmailInputValid}]">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="enteredEmail" @blur="emailBlur" required>
        <p v-if="!enteredEmailInputValid" class="text-invalid">Please enter a valid email address</p>
      </div>

      <div :class="[`form-control`, {invalid: !enteredPasswordInputValid}]">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="enteredPassword" @blur="passwordBlur" required>
        <p v-if="!enteredPasswordInputValid" class="text-invalid">Password should be at least 7 characters long</p>
      </div>

      <div class="controls">
        <router-link to="/auth?mode=login">Already have an account? Log in</router-link>
        <base-button :disabled="!formIsValid" type="button" look="primary" @click="handleFormSubmit">Sign up</base-button>
      </div>


    </form>
    </base-card>
  </base-page>
</template>

<script>
export default {
  data(){
    return {
      enteredName: "",
      enteredNameTouched: false,
      enteredLastName: "",
      enteredLastNameTouched: false,
      enteredEmail: "",
      enteredEmailTouched: false,
      enteredPassword: "",
      enteredPasswordTouched: false,
      enteredAddress: "",
      enteredAddressTouched: false,
    }
  },
  computed: {
    mode(){
      return this.$route.query.mode; 
    }, 
    enteredNameValid(){
      return this.enteredName.length > 2;
    },
    enteredNameInputValid(){
      return this.enteredNameValid || !this.enteredNameTouched;
    },
    enteredLastNameValid(){
      return this.enteredLastName.length > 4;
    },
    enteredLastNameInputValid(){
      return this.enteredLastNameValid || !this.enteredLastNameTouched;
    },
    enteredEmailValid(){
      return this.enteredEmail.includes(`@`);
    },
    enteredEmailInputValid(){
      return this.enteredEmailValid || !this.enteredEmailTouched;
    },
    enteredPasswordValid(){
      return this.enteredPassword.length > 6;
    },
    enteredPasswordInputValid(){
      return this.enteredPasswordValid || !this.enteredPasswordTouched;
    },
    enteredAddressValid(){
      return this.enteredAddress.length > 6;
    },
    enteredAddressInputValid(){
      return this.enteredAddressValid || !this.enteredAddressTouched;
    },

    formIsValid(){
      if(this.mode === `login`){
        return this.enteredEmailValid && this.enteredPasswordValid;
      } else if (this.mode === `signup`){
        return this.enteredNameValid && this.enteredLastNameValid && this.enteredEmailValid && this.enteredPasswordValid && this.enteredAddressValid;
      }else{
        return false;
      }
    }
  }, 
  methods: {
    handleFormSubmit(event){
      event.preventDefault();
      if(this.mode === `login`){
        this.$store.dispatch(`login`, {
          email: this.enteredEmail,
          password: this.enteredPassword
        });
      } else if (this.mode === `signup`){
        // wcześniej w local storage zapis imienia
        // localStorage.name = this.enteredName;
        console.log("saving name: ", localStorage.name);
        this.$store.dispatch(`signup`, {
          name: this.enteredName,
          lastName: this.enteredLastName,
          email: this.enteredEmail,
          password: this.enteredPassword,
          address: this.enteredAddress
        });
      }
      this.$router.push("/");
    },
    nameBlur(){
      this.enteredNameTouched = true;
    },
    lastNameBlur(){
      this.enteredLastNameTouched = true;
    },
    emailBlur(){
      this.enteredEmailTouched = true;
    },
    passwordBlur(){
      this.enteredPasswordTouched = true;
    },
    addressBlur(){
      this.enteredAddressTouched = true;
    },
  }
}
</script>


<style scoped>
.form-wrapper{
  width: 95%;
  max-width: 1200px;
  margin: 60px auto 0px;
  padding: 5px;
}

.form{
  width: 95%;
  max-width: 600px;
  margin: auto;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}

.form-wrapper h2{
  text-align: center;
}

.form-control{
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.1em;
}

.form-control label{
  margin: 5px 0px; 
}

.form-control input{
  flex-basis: 25px;
  border: 1px solid black; 
  border-radius: 5px;
}

.form-control input:focus{
  outline: 1px solid var(--primary-accent1);
}

.text-invalid{
  margin: 5px 0px;
  font-size: 0.8em;
  color: var(--primary-text-error1);
}

.controls{
  width: 100%;
  max-width: 600px;
  height: 40px;
  margin: 10px auto; 

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls a, .controls a:link, .controls a:visited{
  color: var(--primary-text1);
}

.controls button {
  min-width: 100px;
  font-size: 0.95em;
}


</style>





