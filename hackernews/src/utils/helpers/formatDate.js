import Moment from "moment";

function FormatDate(dt){
    //format date as MM/DD/YYY
    return Moment(dt).format('L');
}

export default FormatDate;