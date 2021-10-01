import axios from "axios";

export default {
    getStories: function(){
        return axios.get("http://hn.algolia.com/api/v1/search?query=foo&tags=story");
    }
};