const MIN_VALUE = 1;
const MAX_VALUE = Number.parseInt('zzzzzzzzzz', 36) + 1;

/**
 * custom id controller
 */
class CID {
  /**
   * @constructor
   * init id set
   */
  constructor() {
    this.set = new Set();
    this.id = MIN_VALUE;
  }

  /**
   * @public
   * get a unique cid
   * @return {string}
   */
  get() {
    let cid = this.id.toString(36).padStart(10, '0');
    this.set.add(cid);
    if (this.id < MAX_VALUE) {
      this.id++;
    } else {
      this.id = MIN_VALUE;
    }
    return cid;
  }

  /**
   * @public
   * remove a deprecated cid
   * @param {string} cid
   */
  remove(cid) {
    this.set.delete(cid);
  }
}

export { CID };
