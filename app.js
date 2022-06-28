// import services and utilities
import { getBulletins, getUser, signOut } from './services/bulletin-service.js';
// import component creators
import createBulletinBoard from './components/BulletinBoard.js';
import createButton from './components/Buttons.js';
import createPaging from './components/Paging.js';
// declare state variables
let bulletins = [];
let user = null;
let pageSize = 10;
let page = 1;
let totalPages = 1;
// write handler functions
async function handlePageLoad() {
    user = await getUser();

    const params = new URLSearchParams(window.location.search);
    page = Number(params.get('page')) || 1;
    pageSize = Number(params.get('pageSize')) || 10;

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, count } = await getBulletins(start, end);
    bulletins = data;
    totalPages = Math.ceil(count / pageSize);
    display();
}

function handlePaging(change, size) {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    page = Number(size) === pageSize ? Math.max(1, page + change) : 1;
    params.set('page', page);
    params.set('pageSize', size);
    window.location.search = params.toString();
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
const Paging = createPaging(document.querySelector('#paging'), {
    handlePaging
});
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
    Paging({ page, pageSize, totalPages });
    UserChangeButton({ user });
    NewPostButton({ });
}

// Call display on page load
handlePageLoad();