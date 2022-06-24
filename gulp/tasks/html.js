// Устанавливаем плагин, который собирает html из разных частей
// import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // обработка картинок, отличных от svg
import versionNumber from "gulp-version-number"; // не позволит кешировать изменения в браузере
import pug from "gulp-pug";

// Копирует файлы в папку dest
export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        // .pipe(fileInclude()) // После подключения PUG эта строка больше не нужна
        .pipe(pug({
            // Сжатие HTML файла
            pretty: true,
            // Показывать в терминале какой файл обработан
            verbose: true
        }))
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild, // Если режим продакшена
                webpHtmlNosvg() // Тогда выполняем оптимизацию
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}