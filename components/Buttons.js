export default function createButtons(root, { handleAuthRedirect, handleCreateRedirect }) {
    const [userChangeButton, createButton] = root.querySelectorAll('button');

    userChangeButton.addEventListener('click', () => {
        handleAuthRedirect();
    });

    createButton.addEventListener('click', () => {
        handleCreateRedirect();
    });

    return ({ user }) => {
        userChangeButton.textContent = user ? 'Log Out' : 'Log In';
    };
}