var memberService = require("../../../api/services/ubiq_cms_members_service");
console.log( memberService );

memberService.memberLookup("J001").then((res)=>console.log(res));