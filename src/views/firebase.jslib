mergeInto(LibraryManager.library, {
    UploadFiles: function(String json, var path_list, string callback, string fallback) {
        var parsedPath = Pointer_stringify(path);
        var parsedObjectname = Pointer_stringify(objectName);
        var parsedCallback = Pointer_stringify(callback);
        var parsedFallback = Pointer_stringify(fallback);

        try {
            firebase.storage.ref(parsedPath).once('value').then(function(snapshot){
                unityInstance.Module.SendMessage(parsedObjectname, parsedCallback, JSON.stringify(snapshot.val()));
            });

        } catch (error) {
            unityInstance.Module.SendMessage(parsedObjectname, parsedFallback, error.message);
        }

    }
})