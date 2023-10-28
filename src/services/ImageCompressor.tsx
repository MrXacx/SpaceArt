import { srcToWebP, blobToWebP } from 'webp-converter-browser'

export class ImageCompressor {
	static fromURL = (url: string) => srcToWebP(url, { quality: 0.8 });

	static fromFile = (file: File) => blobToWebP(
		new Blob([file], { type: file.type }), { quality: 0.8 });

	static toBase64 = (image: Blob, callback = (result: string) => console.log('Conversão finalizada')) => {
		const reader = new FileReader();

		reader.onload = () => { callback(reader.result as string) }
		reader.onerror = (err) => { throw err; }

		reader.readAsDataURL(image);
	}
}