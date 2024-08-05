import { getDSMInstance } from '../tickStreamer/envokeSocket.js';

export class StreamMngService {
	#dsm = null;
	constructor() {
		this.#dsm = getDSMInstance();
	}

	subscribe(instruments = []) {
		this.#dsm.subscribe(instruments);
	}

	unsubscribe(instruments = []) {
		this.#dsm.unsubscribe(instruments);
	}
}
