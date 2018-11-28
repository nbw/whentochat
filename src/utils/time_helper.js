
var timeHelper = {
	newUTCTime: function() {
    const t = new Date();
    return new Date(Date.UTC(t.getFullYear(), t.getMonth()+1, t.getDate()));
	}
}

export default timeHelper
