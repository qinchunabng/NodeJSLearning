import sqlite3 from 'sqlite3';

export function createDatabase(file, debug = false) {
    const db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX);
    const wrapper = { db };
    wrapper.update = async function (strs, ...params) {
        return new Promise((resolve, reject) => {
            let sql = strs.join('?');
            if (debug) {
                console.log(`sql = ${sql}, params = [${params.join(',')}]`);
            };
            db.run(sql, ...params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    wrapper.insert = async function (strs, ...params) {
        return new Promise((resolve, reject) => {
            let sql = strs.join('?');
            if (debug) {
                console.log(`sql = ${sql}, params = [${params.join(', ')}]`);
            }
            db.run(sql, ...params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    wrapper.select = async function (strs, ...params) {
        return new Promise((resolve, reject) => {
            let sql = strs.join('?');
            if (debug) {
                console.log(`sql = ${sql}, params = [${params.join(', ')}]`);
            }
            db.all(sql, ...params, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    wrapper.fetch = async function (strs, ...params) {
        return new Promise((resolve, reject) => {
            let sql = strs.join("?");
            if (debug) {
                console.log(`sql = ${sql}, params = [${params.join(', ')}]`);
            }
            db.all(sql, ...params, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.length === 0 ? null : rows[0]);
                }
            })
        });
    }
    return wrapper;
}