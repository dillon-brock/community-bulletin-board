import { getUser, addBulletin, signOut } from '../services/bulletin-service.js';
import createNewBulletin from '../components/NewBulletinForm.js';
import createButton from '../components/Buttons.js';

let user = null;

async function handlePageLoad() {
    user = await getUser();
    if (!user) {
        location.replace('../auth');
    }

    display();
}

function handleAuthRedirect() {
    user && signOut();
    window.location.assign('../auth');
}

async function handleAddBulletin(title, description, contact) {
    const response = await addBulletin(title, description, contact);
    // eslint-disable-next-line no-console
    response.error ? console.log(response.error) : location.assign('/');
}

const NewBulletin = createNewBulletin(document.querySelector('form'), { handleAddBulletin });
const LogOutButton = createButton(document.querySelector('#logout-button'), {
    handleClick: handleAuthRedirect
});

function display() {
    NewBulletin();
    LogOutButton({ user });
}

handlePageLoad();