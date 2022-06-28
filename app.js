// import services and utilities
import { getBulletins, getUser, signOut } from './services/bulletin-service.js';
// import component creators
import createBulletinBoard from './components/BulletinBoard.js';
import createButton from './components/Buttons.js';
// declare state variables
let bulletins = [];
let user = null;
let pageSize = 15;
let page = 1;
// write handler functions
async function handlePageLoad() {
    user = await getUser();

    const params = new URLSearchParams(window.location.search);
    page = params.get('page') || 1;
    pageSize = params.get('pageSize') || 15;

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    bulletins = await getBulletins(start, end);
    display();
}

function handleCreateRedirect() {
    const redirectURL = user ? './new' : './auth/?create=true';
    window.location.assign(redirectURL);
}

function handleAuthRedirect() {
    user && signOut();
    const redirectURL = '/?create=false';
    window.location.assign('./auth' + redirectURL);

}
// Create each component: 
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object 
const BulletinBoard = createBulletinBoard(document.getElementById('bulletins'));
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