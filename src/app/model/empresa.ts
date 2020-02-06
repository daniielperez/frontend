export class Empresa {
    constructor(
		public id: string,
		public nombre: string,
		public nit: string,
		public logo: string,
		public portada: string,
		public direccion: string,
		public lat: number,
		public lng: number,  
		public accountId: number,  
		public merchantId: number,  
		public apiKey: string,  
	){}
}