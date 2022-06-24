# industry-art
website SIRKI-company


## Для корректной работы с прикрепленными изображениями нужно:
    1. Установить в VSCode расширение "Path Autocomplete"
    2. F1 > пишем "Open Settings Json"
    3. В открывшемся файле пишем:

        "path-autocomplete.pathMappings": {
            "@img": "${folder}/src/img", //Alias for images
            "@scss": "${folder}/src/scss", //Alias for scss
            "@js": "${folder}/src/js",
        },

    4. При работе с html файлом необходимо будет прописывать в теге img - <img src="@img/photo.jpg">


    5. Для того, чтобы fonts.js работало в винде необходимо поменять пакет "fonter" с gulp-fonter-unx на gulp-fonter

    6. Для того, чтобы создался svg sprite необходимо прописать команду "npm run svgSprive". После добавления или изменения в папке svgicons 
