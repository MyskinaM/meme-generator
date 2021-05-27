var Editor = /** @class */ (function () {
    function Editor() {
    }
    Editor.prototype.download = function () {
        var file = this.getImage().files[0], reader = new FileReader();
        console.log(file);
        reader.onload = function () {
            var image = new Image();
            if (typeof reader.result === "string") {
                image.src = reader.result;
            }
            image.onload = function () {
                editor.canvas.width = image.width;
                editor.canvas.height = image.height;
                editor.context.drawImage(image, 0, 0);
                editor.context.font = "60px Arial";
                var text = editor.getText();
                if (text.value !== null) {
                    editor.label = text.value;
                }
                editor.context.fillText(editor.label, image.width / 2 - editor.label.length / 2 * 30, image.height - 20);
            };
        };
        reader.readAsDataURL(file);
        this.cookiesDelete();
    };
    Editor.prototype.get = function () {
        var link = document.createElement("a");
        link.download = "download";
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    };
    Editor.prototype.getRenderImage = function () {
        var link = document.createElement("a");
        link.download = "download";
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    };
    Editor.prototype.getText = function () {
        return document.getElementById("label");
    };
    Editor.prototype.getImage = function () {
        return document.getElementById("file");
    };
    Editor.prototype.render = function () {
        var isOriginal = this.getCookie('isOriginal');
        var html = '';
        if (isOriginal === 'true') {
            html += "\n                <input type=\"file\" id=\"file\" onChange=\"editor.download()\">\n                <label>\n                    <input type=\"text\" id=\"label\">\n                    <input type=\"button\" value=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u0430\u0434\u043F\u0438\u0441\u044C\" onclick=\"editor.download()\">\n                </label>\n                <input type=\"button\" value=\"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\" onClick=\"editor.get()\">\n            ";
        }
        else {
            this.imagePath = this.getImagePath();
            html += "\n                <label>\n                    <input type=\"text\" id=\"label\">\n                    <input type=\"button\" value=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u0430\u0434\u043F\u0438\u0441\u044C\" onclick=\"editor.renderImage()\">\n                </label>\n                <input type=\"button\" value=\"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\" onClick=\"editor.getRenderImage()\">\n            ";
            this.renderImage();
        }
        html += '<canvas id="canvas"></canvas>';
        // @ts-ignore
        ROOT_EDITOR.innerHTML = html;
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    };
    Editor.prototype.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    Editor.prototype.cookiesDelete = function () {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name_1 = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name_1 + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            document.cookie = name_1 + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    };
    Editor.prototype.getImagePath = function () {
        var memId = Number(this.getCookie('MemId'));
        var result;
        // @ts-ignore
        CATALOG.forEach(function (element) {
            if (element.id === memId) {
                result = element.image;
            }
        });
        return result;
    };
    Editor.prototype.renderImage = function () {
        var reader = new FileReader();
        var image = new Image();
        image.src = this.imagePath;
        image.onload = function () {
            editor.canvas.width = image.width;
            editor.canvas.height = image.height;
            editor.context.drawImage(image, 0, 0);
            editor.context.font = "60px Arial";
            var text = editor.getText();
            if (text.value !== null) {
                editor.label = text.value;
            }
            editor.context.fillText(editor.label, image.width / 2 - editor.label.length / 2 * 30, image.height - 20);
        };
    };
    return Editor;
}());
var editor = new Editor();
editor.render();
