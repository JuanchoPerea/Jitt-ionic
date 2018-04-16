export class UserModel{
	
	constructor(
		public id:string, 
		public pw:string,
		public key:string=null 
		) {
		// code...
		}
	static fromJson(data:any){		
		if(!data.id||!data.pw||!data.key)
			throw(new Error("Invalid argument: argument structure do not match with model"));
			return new UserModel(data.id,data.pw,data.key);
		
	}
	
}