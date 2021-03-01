import { openDB } from "idb";

const DB_NAME = "bac_db";
const DB_VERSION = 1;
let DB;

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
  },
  async addDrink(date, sex, oz = -1, pct = -1) {

    let db = await this.getDB();

    await db.add(DRINKS_TABLE, {
      date: date, // now (date object)
      custom: oz == -1 || pct == -1, // boolean
      oz: oz, // int
      pct: pct, // int
      sex: sex, // string
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
}