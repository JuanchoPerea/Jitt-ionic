export class AsignatureModel{
	
	constructor(
		public id:number, 
		public siteTitle:string, 
		public siteId:string 
		) {
		// code...
		}
	static fromJson(data:any){	
		if(!data.siteTitle||!data.siteId)
			throw(new Error("Invalid argument: argument structure do not match with model"));
			return new AsignatureModel(data.id,data.siteTitle,data.siteId);
		
	}
	
}