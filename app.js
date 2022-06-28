// import services and utilities
import { getBulletins, getUser, signOut } from './services/bulletin-service.js';
// import component creators
import createBulletinBoard from './components/BulletinBoard.js';
import createButton from './components/Buttons.js';
// declare state variables
let bulletins = [];
let user = null;
// write handler functions
async function handlePageLoad() {
    user = await getUser();
    bulletins = await getBulletins();
    display();
}

function handleAuthRedirect() {
    user && signOut();
    window.location.assign('./auth');
}

function handleCreateRedirect() {
    const redirectURL = user ? './new' : './auth';
    window.location.assign(redirectURL);
}
// Create each component: 
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object 
const BulletinBoard = createBulletinBoard(document.getElementById('bulletin-board'));
const UserChangeButton = createButton(document.querySelector('#login-button'), {
    handleClick: handleAuthRedirect
});
const NewPostButton = createButton(document.querySelector('#new-button'), {
    handleClick: handleCreateRedirect
});
// Roll-up display function that renders (calls with state) each component
function display() {
    // Call each component passing in props that are the pieces of state this component needs
    BulletinBoard({ bulletins });
    UserChangeButton({ user });
    NewPostButton({ });
}

// Call display on page load
handlePageLoad();