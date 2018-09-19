import idb from 'idb';

export default class DB {
    constructor(store) {
        this.state = {
            name: 'site_db',
            data: [],
        };

        this.dbPromise = idb.open('myDB', 1, updateDB => {
            const db = updateDB.createObjectStore('tabs', {
                keyPath: id,
                autoIncrement: true,
            });
            db.createIndex('tabId', 'tabId', { unique: false });
            db.createIndex('urlSite', 'urlSite', { unique: false });
            db.createIndex('userName', 'userName', { unique: false });
            db.createIndex('email', 'email', { unique: false });
            db.createIndex('password', 'password', { unique: false });


            store.map((item, index) => db.add(item));
            return db;
        });

        this.getData = this.getData.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.setData = this.setData.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    get(key) {
        return this.dbPromise
            .then(db =>
                db
                    .transaction('tabs')
                    .objectStore('tabs')
                    .index('tabId')
                    .getAll(key)
            )
            .then(val => console.log(val));
    }

    getAll() {
        return this.dbPromise.then(db => {
            return db
                .transaction('tabs')
                .objectStore('tabs')
                .getAll();
        });
    }


    delete(key) {
        return this.dbPromise.then(db => {
            const tx = db.transaction('tabs', 'readwrite');
            tx.objectStore('tabs').delete(key);
            tx.objectStore('tabs').getAll();

            return tx.complete;
        });
    }

    set(val) {
        return this.dbPromise.then(db => {
            
        })
    }
}

// const dbName = "site_db";
// const dbVersion = 1.0;
// siteDb = {};

// siteDb.indexedDB = {};
// siteDb.indexedDB.db = null;

// if ('webkitIndexedDB' in window) {
//     window.IDBTransaction = window.webkitIDBTransaction;
//     window.IDBKeyRange = window.webkitIDBKeyRange;
// }


// $(document).bind('pageInit', function () {
//     console.log("-- lets start the party");
//     siteDb.indexedDB.open();
//     $("#addItem").click(function () {
//         addItem();
//     });
// });


// siteDb.indexedDB.onerror = function (e) {
//     console.log(e);
// };


// siteDb.indexedDB.open = () => {
//     var request = indexedDB.open(dbName, dbVersion);

//     request.onsuccess = (e) => {
//         console.log("sucesso ao abrir o DB:" + dbName);
//         siteDb.indexedDB.db = e.target.result;
//         var db = siteDb.indexedDB.db;
//         if (db.setVersion) {
//             console.log("old version" + db.setVersion);
//             if (db.version !== dbVersion) {
//                 let req = db.setVersion(dbVersion);
//                 req.onsuccess = () => {
//                     if (db.objectStoreNames.contains("site_db")) {
//                         db.deleteObjectStore("site_db");
//                     }

//                     let store = db.createObjectStore("site_db", { keyPath: "timeStamp" });
//                     let trans = req.result;

//                     trans.oncomplete = (e) => {
//                         console.log("== complete transaction ==");
//                         siteDb.indexedDB.getAllItems();
//                     }
//                 };
//             }
//             else {
//                 siteDb.indexedDB.getAllItems();
//             }
//         }
//         else {
//             siteDb.indexedDB.getAllItems();
//         }
//     }

//     request.onupgradeneeded = (e) => {
//         console.log("Going to upgrade our DB");
//         siteDb.indexedDB.db = e.target.result;
//         const db = siteDb.db;
//         if (db.objectStoreNames.contains("site_db")) {
//             db.deleteObjectStore("site_db");
//         }

//         let store = db.createObjectStore("site_db", { keyPath: "timeStamp" });

//         siteDb.indexedDB.getAllItems();
//     }

//     request.onfailure = sitedb.indexedDB.onerror;
//     request.onerror = (e) => {
//         console.error("Err:" + e);
//     }
// };

// siteDb.indexedDB.addItem = (siteText) => {
//     const db = siteDb.indexedDB.db;
//     let trans = db.transaction(['site_db'], "readwrite");
//     let store = trans.objectStore("site_db");

//     data = {
//         "text": siteText,
//         "timeStamp": new Date().getTime()
//     };

//     let request = store.put(data);

//     request.onsuccess = function (e) {
//         siteDb.indexedDB.getAllItems();
//     };
//     request.onerror = function (e) {
//         console.error("Error adding an item: ", e);
//     };
// };

// siteDb.indexedDB.deleteSite = function (id) {
//     const db  = siteDb.indexedDB.db;
//     let trans = db.transaction(["site_db"], "readwrite");
//     let store = trans.objectStore("site_db");
//     let request = store.delete(id);

//     request.onsuccess = (e) => {
//         siteDb.indexedDB.getAllItems();
//     };
//     request.onerror = (e) => {
//         console.error("Error deleteing: ", e)
//     };
// };

// siteDb.indexedDB.getAllItems = () => {
//     const todos = document.getElementById("siteItems");
//     todos.innerHTML = "";
//     const db = siteDb.indexedDB.db;
//     let trans = db.transaction(["site_db"], "readwrite");
//     let store = trans.objectStore("site_db");

//     let keyRange = IDBKeyRange.lowerBound(0);
//     let cursorRequest = store.openCursor(keyRange);

//     cursorRequest.onsuccess = function(e) {
//         let result = e.target.result;
//         if (!!result === false) {
//             return;
//         }

//         renderSite(result.value);
//         result.continue();
//     };

//     cursorRequest.onerror = siteDb.indexedDB.onerror;
// }



// setDb = () => {
//     if (self.IndexedDB) {
//         console.log('IndexedDB is supported');
//         var request = self.IndexedDB.open('site_db', 1);
//         var db;
//     }
// }


