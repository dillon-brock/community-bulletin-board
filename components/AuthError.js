export default function createError(root) {
    return ({ errorMessage }) => {
        root.textContent = errorMessage;
    };
}