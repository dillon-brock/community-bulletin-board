import state, { undeleteBulletin } from '../state.js';
import { getUser, addBulletin, signOut } from '../services/bulletin-service.js';
import createBulletinBoard from '../components/BulletinBoard.js';
import createButton from '../components/Buttons.js';

let user = null;
let deleted = true;

async function handlePageLoad() {
    user = await getUser();

    display();
}

async function handleAddBulletin(title, description, contact) {
    const response = await addBulletin(title, description, contact);
    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
    }
    else {
        undeleteBulletin({ title, description, contact });
    }
}

function handleAuthRedirect() {
    if (user) {
        signOut();
    }
    state.deletedBulletins = [];
    const redirectURL = '../?create=false&deleted=true';
    window.location.assign('./auth' + redirectURL);

}

function handleCreateRedirect() {
    const redirectURL = user ? '../new' : '../auth/?create=true&deleted=false';
    window.location.assign(redirectURL);
}


const deletedBoard = createBulletinBoard(document.getElementById('deleted-bulletins'), { handleClick: handleAddBulletin, deleted });
const LogOutButton = createButton(document.querySelector('#logout-button'), {
    handleClick: handleAuthRedirect
});
const NewPostButton = createButton(document.querySelector('#new-button'), {
    handleClick: handleCreateRedirect
});

function display() {
    deletedBoard({ bulletins: state.deletedBulletins });
    LogOutButton({ user });
    NewPostButton({ });
}

handlePageLoad();