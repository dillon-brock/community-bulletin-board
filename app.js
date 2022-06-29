// import services and utilities
import { deleteBulletin, getBulletins, getUser, signOut } from './services/bulletin-service.js';
// import component creators
import createBulletinBoard from './components/BulletinBoard.js';
import createButton from './components/Buttons.js';
import createPaging from './components/Paging.js';
import createFilter from './components/Filter.js';

let bulletins = [];
let allBulletins = [];
let user = null;
let pageSize = 15;
let page = 1;
let totalPages = 1;
let filterTime = 0;

// write handler functions
async function handlePageLoad() {
    user = await getUser();

    const params = new URLSearchParams(window.location.search);
    page = Number(params.get('page')) || 1;
    pageSize = Number(params.get('pageSize')) || 15;
    let now = Math.floor(Date.now() / 1000);
    filterTime = Number(params.get('filterTime')) || now; 

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    allBulletins = await getBulletins();
    allBulletins = allBulletins.filter(bulletin => {
        let createdDate = new Date(bulletin.created_at);
        createdDate = Math.floor(Date.parse(createdDate) / 1000);
        bulletin.created_at = createdDate;
        return bulletin.created_at >= now - filterTime;
    });

    const count = allBulletins.length;
    if (end <= count) {
        for (let i = start; i < end; i++) {
            bulletins.push(allBulletins[i]);
        }
    }
    else {
        for (let i = start; i < count; i++) {
            bulletins.push(allBulletins[i]);
        }
    }
    
    totalPages = Math.ceil(count / pageSize);
    display();
}

function handlePaging(change, size) {
    const params = new URLSearchParams(window.location.search);

    page = Number(size) === pageSize ? Math.max(1, page + change) : 1;
    params.set('page', page);
    params.set('pageSize', size);
    window.location.search = params.toString();
}

function handleFilter(time) {
    const params = new URLSearchParams(window.location.search);

    params.set('filterTime', time);
    params.set('page', 1);
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

async function handleDelete(title, description, contact) {
    const response = await deleteBulletin(title, description, contact);
    // eslint-disable-next-line no-console
    response.error ? console.log(response.error) : location.assign('/');
}

const BulletinBoard = createBulletinBoard(document.getElementById('bulletins'), { handleDelete });
const Paging = createPaging(document.querySelector('#paging'), {
    handlePaging
});
const Filter = createFilter(document.querySelector('#filter'), { handleFilter });
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
    Filter({ filterTime });
}

// Call display on page load
handlePageLoad();