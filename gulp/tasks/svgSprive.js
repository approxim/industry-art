import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: 'SVG',
            message: "Error: <%= erroe.message %>"
        })
    ))

    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: `../icons/icons.svg`,
                // Создавать страницу с перечнем иконок
                example: true
            }
        },
    }))


    // Выгрузка в папку с картинками
    .pipe(app.gulp.dest(`${app.path.build.images}`));
}