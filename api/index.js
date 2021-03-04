import { openDB } from "idb";

const DB_NAME = "bac_db";
const DB_VERSION = 1;
let DB = null;

const DRINKS_TABLE = "drinks";

export default {
  async getDB() {
    // Return cached DB if already initialized
    if (DB) { return DB; }

    DB = await openDB(DB_NAME, DB_VERSION, {
      // on init
      upgrade(db) {
        const store = db.createObjectStore("drinks", {
          keyPath: "id",
          autoIncrement: true,
        });

        // index date so we can query by latest time
        store.createIndex("date", "date");
      }
    });

    return DB;
  },
  async addDrink(date, bac, oz = null, pct = null) {

    let db = await this.getDB();

    db.add(DRINKS_TABLE, {
      date: date, // now (date object)
      bac: bac,
      oz: oz, // int
      pct: pct, // int
    });
  },
  async removeLatestDrink() {

    let db = await this.getDB();

    let latest = this.getNDrinks(1);
    let id = latest.id;
    db.delete(DRINKS_TABLE, id);
  },
  async getNDrinks(n) {

    let db = await this.getDB();
    return await db.getAllFromIndex(DRINKS_TABLE, "date", null, n);
  },
  async getDrinksPastNHours(hours) {

    let db = await this.getDB();

    const upper = new Date(); // upper bound is current time
    const lower = new Date(upper.getTime() - (hours * 60 * 60 * 1000)); // lower bound is past 12 hours
    const keyRange = IDBKeyRange.bound(lower, upper); // [lower, upper]

    return db.getAllFromIndex(DRINKS_TABLE, "date", keyRange);
  }
}