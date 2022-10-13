const {ipcRenderer, contextBridge} = require('electron');

function Recorder() {

    function handleStream(stream) {
        const recorder = new MediaRecorder(stream);
        const blobs = [];
        recorder.ondataavailable = (e) => blobs.push(e.data);
        recorder.onstop = () => {
            const completeBlob = new Blob(blobs, {type: blobs[0].type});
            saveFile(URL.createObjectURL(completeBlob));

        };
        recorder.onerror = (e) => {
            handleErrors(e.error);
        };
        recorder.start();
        return () => {
            recorder.stop();
        };
    }

    function handleErrors(error) {
        ipcRenderer.invoke('show-notification', 'Error', error);
    }

    function saveFile(src) {
        const tempLink = document.createElement("a");
        tempLink.style = "display: none";
        tempLink.href = src;
        tempLink.download = `video-${Date.now()}.webm`;

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }

    return (async function startRecord() {
        try {
            const sources = await ipcRenderer.invoke('get-sources');
            const source = sources[0];
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: "desktop",
                        chromeMediaSourceId: source.id,
                        minWidth: 1280,
                        maxWidth: 1280,
                        minHeight: 720,
                        maxHeight: 720
                    },
                },
            });
            return handleStream(stream);
        } catch (e) {
            handleErrors(e.message);
            return null;
        }
    })();
}

contextBridge.exposeInMainWorld('recorder', {
    start: () => Recorder()
})