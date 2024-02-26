import AllServiceParamerter from "./ParamService";

export default class AllService extends AllServiceParamerter {
    constructor(APIUrl,agrno, Email, password) {
        super(APIUrl,agrno, Email, password);
    }
    
    CallNewService(MethodName, callBack) {
        //console.log("returnValue", MethodName, callBack);
       var ParamName = "Param_" + MethodName;
        var data = JSON.stringify(this[ParamName]);
       console.log("returnValue", data);

        super.Call(data, MethodName, function (returnValue) {           
            var str = JSON.parse(JSON.stringify(returnValue));			
			// console.log("this1",MethodName, returnValue);			
            if (str != "" && str.d != "0") {
                return callBack(true, str.d);
            } else {
                return callBack(false, []);
            }

        });
    }

}