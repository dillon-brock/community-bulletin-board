import { getUser, signIn, signUp } from '../services/bulletin-service.js';
import createAuthForm from '../components/AuthForm.js';

let user = null;
let errorMessage = '';

async function handlePageLoad() {
    user = await getUser();
    if (user) {
        location.replace('/');
    }
    display();
}

async function handleSignIn(email, password) {
    const response = await signIn(email, password);
    checkAuth(response);
}

async function handleSignUp(email, password) {
    const response = await signUp(email, password);
    checkAuth(response);
}

function checkAuth(response) {
    if (response?.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        errorMessage = response.error.message;
        display();
    }
    else {
        location.assign('/');
    }
}

const SignInForm = createAuthForm(document.querySelector('#sign-in'), { handleAuth: handleSignIn });
const SignUpForm = createAuthForm(document.querySelector('#sign-up'), { handleAuth: handleSignUp });

function display() {
    SignInForm();
    SignUpForm();
}

handlePageLoad();