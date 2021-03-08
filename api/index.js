import { openDB } from "idb";

const DB_NAME = "bac_db";
const DB_VERSION = 1;
let DB = null;

const BAC_TABLE = "bac";

export default {
  async getDB() {
    // Return cached DB if already initialized
    if (DB) { return DB; }

    DB = await openDB(DB_NAME, DB_VERSION, {
      // on init
      upgrade(db) {
        const store = db.createObjectStore(BAC_TABLE, {
          keyPath: "date",
          autoIncrement: false,
        });

        // index date so we can query by latest time
        store.createIndex("date", "date");
      }
    });

    return DB;
  },
  async addBAC(date, bac, isDrink) {

    let db = await this.getDB();

    db.add(BAC_TABLE, {
      date: date, // date
      bac: bac, // float
      drink: isDrink, // boolean
    });
  },
  async removeLatestBAC() {

    let db = await this.getDB();

    let latest = this.getNDrinks(1);
    let id = latest.id;
    db.delete(BAC_TABLE, id);
  },
  // removes all bac entries before "before"
  async removeOlderBAC(before) {

    let db = await this.getDB();

    db.delete(BAC_TABLE, IDBKeyRange.upperBound(before));
  },
  async getNDrinks(n) {

    let db = await this.getDB();
    return await db.getAllFromIndex(BAC_TABLE, "date", null, n);
  },
  async getDrinksPastNHours(hours) {

    let db = await this.getDB();

    const upper = new Date(); // upper bound is current time
    const lower = new Date(upper.getTime() - (hours * 60 * 60 * 1000)); // lower bound is past 12 hours
    const keyRange = IDBKeyRange.bound(lower, upper); // [lower, upper]

    return db.getAllFromIndex(BAC_TABLE, "date", keyRange);
  }
}