var Memes = /** @class */ (function () {
    function Memes() {
    }
    Memes.prototype.render = function () {
        var htmlCatalog = '';
        // @ts-ignore
        CATALOG.forEach(function (element) {
            htmlCatalog += "\n                <li class=\"memes-element\">\n                    <span class=\"memes-element__name\">" + element.name + "</span>\n                    <img class=\"memes-element__image\" src=\"" + element.image + "\"  alt=\"Some meme\"/>\n                    <button class=\"memes-element__button\" onclick=\"memesPage.transitionToEditor(" + element.id + ")\">\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D</button>\n                </li>\n            ";
        });
        htmlCatalog += "\n            <button class=\"memes-element__button\" onclick=\"memesPage.transitionToEditor()\">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435</button>\n        ";
        // @ts-ignore
        ROOT_MEMES.innerHTML = "\n        <ul class=\"memes-container\">\n            " + htmlCatalog + "\n        </ul>\n        ";
    };
    Memes.prototype.transitionToEditor = function (id) {
        if (id === void 0) { id = null; }
        if (id === null) {
            this.setCookie('isOriginal', true, { sameSite: 'Lax' });
        }
        else {
            this.setCookie('MemId', id, { sameSite: 'Lax' });
            this.setCookie('isOriginal', false, { sameSite: 'Lax' });
        }
        document.location.href = 'file:editor.html';
    };
    Memes.prototype.setCookie = function (name, value, options) {
        if (options === void 0) { options = {}; }
        options = {
            path: '/'
        };
        var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (var optionKey in options) {
            updatedCookie += "; " + optionKey;
            var optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    };
    return Memes;
}());
var memesPage = new Memes();
memesPage.render();
