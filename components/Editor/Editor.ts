class Editor
{
    public canvas: HTMLCanvasElement ;
    public context: CanvasRenderingContext2D;
    public label: string;
    public imagePath: string; 

    public download ()
    {
        let file = this.getImage().files[0],
            reader = new FileReader();

        reader.onload = function ()
        {
            let image = new Image();

            if (typeof reader.result === "string") { //получает путь к изобр, которое загружается
                image.src = reader.result;
            }

            image.onload = function ()
            {
                //размеры изобр-я
                editor.canvas.width = image.width; 
                editor.canvas.height = image.height;

                editor.context.drawImage(image, 0, 0); //отрисовывается изобр-е
                editor.context.font = "60px Arial"; //указывается шрифт

                let text = editor.getText(); //получает введенный текст
                if (text.value !== null) { 
                    editor.label = text.value;
                }
                editor.context.fillText(editor.label, image.width / 2 - editor.label.length / 2 * 30,image.height - 20);
            }
        }

        reader.readAsDataURL(file); //вот это даёт сохранить изобр-е
        this.cookiesDelete(); //чистим куки
    }

    public get ()
    {
        let link = document.createElement("a");
        link.download = "download";
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }

    public getRenderImage()
    {
        let link = document.createElement("a");
        link.download = "download";
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }

    public getText(): HTMLInputElement
    {
        return <HTMLInputElement>document.getElementById("label");
    }

    public getImage(): HTMLInputElement
    {
        return <HTMLInputElement>document.getElementById("file");
    }

    public render()
    {
        let isOriginal: string = this.getCookie('isOriginal');
        let html: string = '';

        if (isOriginal === 'true') { //свой мем
            html += `
                <input type="file" id="file" onChange="editor.download()">
                <label>
                    <input type="text" id="label">
                    <input type="button" value="Добавить надпись" onclick="editor.download()">
                </label>
                <input type="button" value="Создать изображение" onClick="editor.get()">
            `;

        } else { //мем по шаблону
            this.imagePath = this.getImagePath(); //получает данные по мему шаблонному
            html += `
                <label>
                    <input type="text" id="label">
                    <input type="button" value="Добавить надпись" onclick="editor.renderImage()">
                </label>
                <input type="button" value="Создать изображение" onClick="editor.getRenderImage()">
            `;
            this.renderImage();
        }

        html += '<canvas id="canvas"></canvas>';

        // @ts-ignore
        //тут к тэгу с id="editor" добавляется вся ранее сформированная вёрстка
        ROOT_EDITOR.innerHTML = html;

        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
    }

    public getCookie(name: string) : string
    {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    public cookiesDelete()
    {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    public getImagePath(): string
    {
        let memId: number = Number(this.getCookie('MemId'));
        let result: string;

        // @ts-ignore
        CATALOG.forEach(element => {
            if (element.id === memId) {
                result = element.image;
            }
        })

        return result;
    }

    public renderImage()
    {
        let reader = new FileReader();
        let image = new Image();
        image.src = this.imagePath;

        image.onload = function ()
        {
            editor.canvas.width = image.width;
            editor.canvas.height = image.height;

            editor.context.drawImage(image, 0, 0);
            editor.context.font = "60px Arial";

            let text = editor.getText();
            if (text.value !== null) {
                editor.label = text.value;
            }
            editor.context.fillText(editor.label, image.width / 2 - editor.label.length / 2 * 30,image.height - 20);
        }
    }
}

const editor = new Editor();
editor.render();