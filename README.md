# Toxin_project

### DevStack

---
- Pug
- SCSS
- JS  
- Webpack
- BEM


### Pages (live examples)

---

- [ui_kit](https://unidentifiedraccoon.github.io/Toxin_project/UI.html)
- [index](https://unidentifiedraccoon.github.io/Toxin_project/index.html)
- [catalog](https://unidentifiedraccoon.github.io/Toxin_project/catalog.html)
- [room-page](https://unidentifiedraccoon.github.io/Toxin_project/888.html)
- [sign-in](https://unidentifiedraccoon.github.io/Toxin_project/sign-in.html)
- [sign-up](https://unidentifiedraccoon.github.io/Toxin_project/sign-up.html)

### Building and running on localhost

---

First install dependencies:

```sh
npm i
```

To create a production build:

```sh
npm run prod
```

To create a development build:

```sh
npm run dev
```

To start dev-server:

```sh
npm run serve
```


### Project structure

---

```
├── conf/                            # Конфиги для вебпака
│   ├── webpack.base.config.js       # Базовый конфиг
│   ├── webpack.dev.config.js        # Конфиг разработки (дополнение базового)
│   ├── webpack.prod.config.js       # Конфиг билд сборки (дополнение базового)
├── designs/                         # Макеты страниц
├── src/                             # Исходники
│   ├── assets/                      
│   │   ├── fonts/                   
│   │   ├── img/                     
│   ├── components/                  # Папка с блоками проекта
│   ├── theme/                       # Папка глобальных стилей
│   │   ├── fonts.scss               # Файл подглючения шрифтов
│   │   ├── global.scss              # Файл для подглючения глобальных стилей
│   │   ├── variables.scss           # Файл для подключения SCSS переменных  и миксинов
│   ├── pages/                       # Папка страниц проекта
├── .browserslistrc                  
├── .eslintrc.json                  
├── .gitignore                      
├── .babel.config.json               
├── devMap.txt                       # Файл с описанием текуших задач проекта (развитие, фиксы итд)
├── package.json                     
├── package-lock.json                     
├── postcss.config.js                
├── README.md                       
└── webpack.config.js                # Мердж конфиг для других конфигов webpack'а
```

### Libs

---
- [jQuery](https://jquery.com/)
- [air-datepicker](http://t1m0n.name/air-datepicker/docs/index-ru.html)
- [noUiSlider](https://refreshless.com/nouislider/)


### Issues

---

If you find some bugs write:
- on [issues](https://github.com/UnidentifiedRaccoon/Toxin_project/issues)
- to [email: yura.posledov@yandex.ru](mailto:yura.posledov@yandex.ru)
