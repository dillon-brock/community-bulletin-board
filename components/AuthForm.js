export default function createAuthForm(form, { handleAuth }) {

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(signInForm);
        handleAuth(formData.get('email'), formData.get('password'));
    });
}