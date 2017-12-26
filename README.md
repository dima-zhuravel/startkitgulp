# startkitgulp

## НАЧАЛО
__________________________________
1. Ставим node.js
2. Ставим глобально gulp >npm i gulp -g
3. Создаем package.json >npm init
4. Инициализируем git >git init
5. Создаем файл .gitingore и прописывем >node_modules/*
6. Ставим gulp локально в проект >npm i gulp --save-dev
7. Создаем файл gulpfile.js и подключаем gulp >var gulp = require('gulp');
8. Установить bower для простой и удобной устновки библиотек >npm i bower -g

## GULP (Создание тасков)
__________________________________

### sass

Eample:
```
  gulp.task('run', function(){
    return gulp.src('source-files') //Берем файл/ы
    .pipe(plugin()) //Делаем с файлами что-то с помощью плагина/ов
    .pipe(gulp.dest('folder')) //Указываем директорию куда будут побадать файлы после преобразования
  })
```
```
Eample (real example with scss files):
  gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
  })
```  

Где:
  * scss/**/* - это значит что будет следть за всеми папками что лежат в папке sass и всеми файлами с расширение .scss в них
  * sass/*.+(scss|sass) - все sass и scss файлы в папке sass
  * sass/**/*.+(scss|sass) - все sass и scss файлы в папке sass и в вложенных папках
  * browserSync.relod({stream: true}) - для инжекции css в html для более шустрой работы и перезагрузки

Если:
  Если перед 'app/scss/main.scss' поставить ! то этот данный файл будет исключен и не будет преобразовываться '!app/scss/main.scss'

  Можно также передавать не строку а массив в котортом межно передатьв все файлы и папки которые мы хотим исключить

Example: `['!app/scss/main.scss', 'app/scss/**/*.scss']` - ислючили только main.scss из всех файлов

### watch

Example:
```
  gulp.task('watch', ['browser-sync', 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
  })
```

Где:
* 'app/scss/**/*.scss' - файл/ы за которымы watcher будет наблюдать
* ['sass'] - это массив всех тасков который будут использоваться для данного случая
* ['browser-sync', 'sass'] - если после названия таска передавать массив с тасками, то те таски будут выполняться перед таском watch, если до того как был запуще watch файлы были как-то изменены, чтобы сначала все скомпилировалось, перезагрузилось и начал уже следить за актуальными версиями файлов на момента запуска сервера.
 
## ФАЙЛЫ

Файлы что начинаются с нижнего подчеркивания (_sidebar.scss, _sidebar.jade...) они не участвуют в компиляйции так какони ипортятся в другие файлы и являются частью их

## PACKAGE.JSON

* gulp-sass - компилирует .css файлы из .scss
* browser-sync - для автоматической перезагруски страницы после изменения содержимого файлы за которыми следит watcher
* gulp-concat - пакет для конкатенации всех файлов в один
* gulp-uglifyjs - минификация .js файлов
* gulp-cssnano - для минификации .css файлов
* gulp-rename - для точго чтобы переименовать .css файл на ..min.css (возможно для переименования не только .css файлов, это дело следует уточнить)
* del - для точго чтобы очищать директорию `dist` от всего ненужного перед тем как пересобрать.
* imagemin, imagemin-pngquant - дя оптимизации изображений.
* gulp-autoprefixer - для изящной деградации.

## BOWER

* создаем файл в корне .bowerrc это будет конфиг для bower

```
{
    "directory": "app/libs/" // директория куда будут падать установленные через bower библиотеки
}
```

## USE TASKS

* gulp watch - jade to HTML, sass to CSS, minify styles, minify scripts, запускатеся watcher следит за изменениями файлов и перезагружает.
* gulp build - то же самое что и watch, но еще переносит файлы в папку `dist` 
* gulp clear - чистит кеш

## !IMPORTANT

Важно, чиобы у `.jade` файлов был head и body иначе browserSync не сможет релоадить страницу.

Eample:
```
  html
    head
    body
      h1 Hello, Jade
```      