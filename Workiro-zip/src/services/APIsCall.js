import $ from 'jquery';

export default class API {
    constructor(APIURL) {
        this.APIURL = APIURL;
    }
    Call(data, methosName, callback) {
        //console.log('data:  ', data,methosName);
        
        var FullAPIURl = this.APIURL + methosName;
        //console.log("FullAPIURl", FullAPIURl);
        if (data !== "") {
            $.ajax({
                type: "POST",
                url: FullAPIURl,
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    callback(msg);
                },
                error: function (e) {
                    ////////////////////alert(e.statusText + " failed");
                    console.log("Network Error !\n Please check your data connection ! Try again");
                }

            });
        }
        else {
            ////////////////////alert("else");
            $.ajax({
                type: "POST",
                url: FullAPIURl,
                data: "{}",
                // contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    callback(msg);
                },
                error: function (e) {
                    console.log("Network Error !\n Please check your data connection ! Try again");
                }
            });
        }
    }

	
	 
  
}
