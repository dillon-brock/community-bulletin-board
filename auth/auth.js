import { getUser, signIn, signUp } from "../services/bulletin-service";
import createAuthForm from "../components/AuthForm";

let user = null;
let errorMessage = '';

async function handlePageLoad() {
    user = await getUser();
    if (user) {
        location.replace('/');
    }
    display();
}

function handleSignIn(email, password) {

}

function handleSignUp(email, password) {

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