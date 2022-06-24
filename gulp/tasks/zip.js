import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
    del(`./${app.path.rootFolder}.zip`); // Удаляем зип архив, который возможно уже существует
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}) // Получаем все файлы, любого уговня вложенности
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "ZIP",
                message: "Error: <%= error.messsage %>"
            })
        ))
        .pipe(zipPlugin(`${app.path.rootFolder}.zip`)) // Подставляем архиву имя корневой папки
        .pipe(app.gulp.dest('./')); // Выводим результат
}