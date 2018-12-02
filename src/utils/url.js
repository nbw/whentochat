const KEY = "s";

class URLCoder {
	constructor(obj){
		this.locAName  = obj.locAName;
		this.locAOffset= obj.locAOffset;
		this.locAStart = obj.locAStart;
		this.locAEnd   = obj.locAEnd;
		this.locBName  = obj.locBName;
		this.locBOffset= obj.locBOffset;
		this.locBStart = obj.locBStart;
		this.locBEnd   = obj.locBEnd;
	}

	get locA() {
		return {
			name: this.locAName,
			utc_offset: this.locAOffset
		};
	}

	get locB() {
		return {
			name: this.locBName,
			utc_offset: this.locBOffset
		};
	}

	get url() {
		const encode = this.encodeQueryData(this.urlBody());
		const encode64 = Buffer.from(encode).toString("base64");
		return `${window.origin}/?${KEY}=${encode64}`;
	}

	urlBody() {
		return {
			aN: this.locAName,
			aO: this.locAOffset,
			aS: this.locAStart,
			aE: this.locAEnd,
			bN: this.locBName,
			bO: this.locBOffset,
			bS: this.locBStart,
			bE: this.locBEnd,
		};
	}

	encodeQueryData(data) {
		const ret = [];
		for (let d in data)
			ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
		return ret.join('&');
	}
}

URLCoder.fromState = function(state) {
	return new URLCoder({
		locAName: state.locA.name,
		locAOffset: state.locA.utc_offset,
		locAStart: state.locAStart,
		locAEnd: state.locAEnd,
		locBName: state.locB.name,
		locBOffset: state.locB.utc_offset,
		locBStart: state.locBStart,
		locBEnd: state.locBEnd,
	});
}

URLCoder.fromURL = function(url) {
	const u = new URL(url);

	if (u.search === "") {
		return {};
	}

	const url64Params = new URLSearchParams(u.search);
	const body = url64Params.get(KEY);

	if (body === null)
		return {};

	const decode = Buffer.from(body, 'base64').toString('ascii');
	const urlParams = new URLSearchParams(decode);

	return new URLCoder({
		locAName: 	urlParams.get("aN"),
		locAOffset: parseInt(urlParams.get("aO")),
		locAStart:  parseInt(urlParams.get("aS")),
		locAEnd:    parseInt(urlParams.get("aE")),
		locBName:   urlParams.get("bN"),
		locBOffset: parseInt(urlParams.get("bO")),
		locBStart:  parseInt(urlParams.get("bS")),
		locBEnd:    parseInt(urlParams.get("bE")),
	});
}

export default URLCoder
