export class LimitedQueue {
	#queue = [];
	constructor(capacity) {
		this.capacity = capacity;
	}

	// Insert an element at the 0th position
	enqueue(element) {
		this.#queue.unshift(element);
		if (this.#queue.length > this.capacity) {
			this.#queue.pop(); // Remove the last element if capacity is exceeded
		}
	}

	// Remove and return the last element
	dequeue() {
		if (this.isEmpty()) {
			throw new Error('Queue is empty');
		}
		return this.#queue.pop();
	}

	// Check if the queue is empty
	isEmpty() {
		return this.#queue.length === 0;
	}

	// Get the current size of the queue
	size() {
		return this.#queue.length;
	}

	// Get the elements of the queue
	getElements() {
		return this.#queue;
	}

	getPrevious() {
		return this.#queue[0];
	}

	getLength() {
		return this.#queue.length;
	}
}
