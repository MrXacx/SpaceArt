import sharp from "sharp";

export class Image {

    private image: sharp.Sharp;

    constructor(private path: string) {
        this.image =  sharp(this.path)
    }

    resize(width: number, height: number) {
        return this.image.resize(width, height)
    }

    compress(){
        let base64 = '';

        this.image.webp({quality: 100})
        .toBuffer((err, buffer) => {
            if (err) console.error(err);
            base64 = buffer.toString('base64');
        });

        return base64;
    }


}

