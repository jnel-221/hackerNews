import Moment from "moment";


//use MM/DD/YYYY format for dates
function FormatDate(dt) {
  return Moment(dt).format("L");
}

export default FormatDate;
