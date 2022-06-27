export default function createAuthForm(form, { handleAuth }) {

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        handleAuth(formData.get('email'), formData.get('password'));
    });

    return () => { };
}