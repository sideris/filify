// store-document.js
function storeDocument(
    { userDB, folderDB, userAccess, fileStorage },
    userID, folderLocation, fileStream
) {
    return Promise.all([
        userDB.findOne(userID),
        folderDB.findOne(folderLocation)
    ])
        .then(([user, folder]) =>
            userAccess.canWrite(user, folder)
                .then(allowed => {
                    if (!allowed) {
                        return Promise.reject(new Exception('it went wrong'));
                    }
                    return fileStorage.save(fileStream, {user, folder});
                })
        )
}

export default function createStoreDocument(deps) {
    return storeDocument.bind(null, deps)
}

// view.js
export default function view(storeDocument) {
    // lots of view logic here
    storeDocument(123, '/tmp7sddsas', myFileStream)
}

// main.js
import view from './view.js'
import createStoreDocument from './store-document'
import {userDB, folderDB} from './db';
import {userAccess, fileStorage} from './somewhere';
let storeDocument =
    createStoreDocument({ userDB, folderDB, userAccess, fileStorage })
view(storeDocument)