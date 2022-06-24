export const server = (done) => {
    app.plugins.browsersync.init({
        server: {
            baseDir: `${app.path.build.html}` // Базовая папка, откуда запускается сервер 
        },
        notify: false,
        port: 5000,
    });
}