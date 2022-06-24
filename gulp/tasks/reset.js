// Очистка папки dist перед запуском gulp
import del from "del";
export const reset = () => {
    return del(app.path.clean);
}