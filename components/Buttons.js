export default function createButton(button, { handleClick }) {
    button.addEventListener('click', () => {
        handleClick();
    });
    return ({ user }) => {
        if (typeof user !== 'undefined') {
            button.textContent = user ? 'LOG OUT' : 'LOG IN';
        }
    };
}