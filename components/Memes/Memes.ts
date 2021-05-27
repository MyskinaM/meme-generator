class Memes {
    public render() {
        //тут вся верстка страницы index.html
        let htmlCatalog: string = '';

        // @ts-ignore
        //тут осуществляется проход по объектам, которые были созданы в catalog.ts, для формирования верстки
        CATALOG.forEach(element => {
            htmlCatalog += `
                <li class="memes-element">
                    <span class="memes-element__name">${element.name}</span>
                    <img class="memes-element__image" src="${element.image}"  alt="Some meme"/>
                    <button class="memes-element__button" onclick="memesPage.transitionToEditor(${element.id})">Выбрать шаблон</button>
                </li>
            `
        });

        htmlCatalog += `
            <button class="memes-element__button" onclick="memesPage.transitionToEditor()">Создать новое изображение</button>
        `;

        // @ts-ignore
        //тут к тэгу с id="memes" добавляется вся ранее сформированная вёрстка
        ROOT_MEMES.innerHTML = `
        <ul class="memes-container">
            ${htmlCatalog}
        </ul>
        `;
    }

    public transitionToEditor(id: number = null)
    {
        if (id === null) { //создаем свой мем
            this.setCookie('isOriginal', true, {sameSite: 'Lax'});
        } else {
            //мем по готовому шаблону
            this.setCookie('MemId', id, {sameSite: 'Lax'});
            this.setCookie('isOriginal', false, {sameSite: 'Lax'});
        }

        document.location.href = 'file:editor.html'; //переход к редактору мема
    }

     public setCookie(name, value, options = {}) {
        options = {
            path: '/',
        };

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }
}
//создание страницы 
const memesPage = new Memes();
//вызов метода рендер, который отрисовывает стр
memesPage.render();